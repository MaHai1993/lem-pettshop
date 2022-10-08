package com.haimh.lempetshop.service;

import com.haimh.lempetshop.domain.Customer;
import com.haimh.lempetshop.domain.Order;
import com.haimh.lempetshop.domain.OrderDetail;
import com.haimh.lempetshop.domain.OrderItem;
import com.haimh.lempetshop.domain.Product;
import com.haimh.lempetshop.repository.CustomerRepository;
import com.haimh.lempetshop.repository.OrderDetailRepository;
import com.haimh.lempetshop.repository.OrderItemRepository;
import com.haimh.lempetshop.repository.OrderRepository;
import com.haimh.lempetshop.repository.ProductRepository;
import com.haimh.lempetshop.service.dto.CreateOrderDTO;
import com.haimh.lempetshop.service.dto.CreateOrderItemDTO;
import com.haimh.lempetshop.service.dto.OrderDTO;
import com.haimh.lempetshop.service.dto.OrderItemDTO;
import com.haimh.lempetshop.utils.Utils;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ObjectUtils;

@Service
public class OrderService {

    private final Logger log = LoggerFactory.getLogger(OrderService.class);

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Autowired
    private ModelMapper modelMapper;

    /**
     * Get all Order with pageable
     *
     * @param pageable
     * @return Page<CustomerDTO>
     */
    @Transactional(readOnly = true)
    public Page<OrderDTO> getAllOrder(Pageable pageable) {
        return orderRepository.findAll(pageable).map(e -> modelMapper.map(e, OrderDTO.class));
    }

    /**
     * Find Order by id
     *
     * @param id
     * @return CustomerDTO
     */
    @Transactional(readOnly = true)
    public Optional<OrderDTO> findOneById(Long id) {
        //        OrderDTO orderDTO = orderRepository.findById(id).map(e -> modelMapper.map(e, OrderDTO.class)).get();
        Order order = orderRepository.findById(id).get();
        OrderDTO orderDTO = modelMapper.map(order, OrderDTO.class);
        List<OrderItem> items = orderItemRepository.findByOrderDetailId(order.getOrderDetail().getId());
        Double totalPrice = items
            .stream()
            .filter(item -> item != null && item.getTotalPrice() != null)
            .mapToDouble(OrderItem::getTotalPrice)
            .sum();
        orderDTO.setOrderTotalPrice(Utils.formatCurrency(totalPrice));
        if (orderDTO.getOrderDetail() != null && !ObjectUtils.isEmpty(items)) {
            List<OrderItemDTO> orderItemDTOs = items.stream().map(e -> modelMapper.map(e, OrderItemDTO.class)).collect(Collectors.toList());
            orderItemDTOs.forEach(e -> e.setProductName(productRepository.findById(e.getProductId()).get().getName()));
            orderDTO.getOrderDetail().setOrderItems(orderItemDTOs);
        }
        return Optional.of(orderDTO);
    }

    /**
     * Create an Order
     *
     * @param orderDTO
     * @return CustomerDTO
     */
    @Transactional
    public Order createOrder(CreateOrderDTO orderDTO) throws Exception {
        Order savedOrder = modelMapper.map(orderDTO, Order.class);
        savedOrder.setId(null);
        savedOrder = (Order) Utils.setBaseEntityValue(savedOrder);
        OrderDetail orderDetail = new OrderDetail();
        orderDetail = (OrderDetail) Utils.setBaseEntityValue(orderDetail);
        Customer customer = customerRepository.findById(orderDTO.getCustomerId()).get();
        if (ObjectUtils.isEmpty(customer.getBuyTime())) {
            customer.setBuyTime(1);
        } else {
            customer.setBuyTime(customer.getBuyTime() + 1);
        }
        orderDetail.setCustomer(customer);

        List<CreateOrderItemDTO> orderItemDTOs = orderDTO.getOrderItem();
        if (ObjectUtils.isEmpty(orderItemDTOs)) {
            throw new Exception("Order must have items");
        }
        orderDetailRepository.save(orderDetail);
        final long orderDetailId = orderDetail.getId();

        List<OrderItem> orderItemList = new ArrayList<>();
        orderItemDTOs.forEach(e -> {
            OrderItem orderItem = new OrderItem();
            orderItem = (OrderItem) Utils.setBaseEntityValue(orderItem);
            Product product = productRepository.findById(e.getId()).get();
            double totalPrice = e.getQuantity() * e.getPrice();
            orderItem
                .setOrderDetailId(orderDetailId)
                .setProductId(product.getId())
                .setQuantity(e.getQuantity())
                .setProductPriceAtSellTime(product.getPrice())
                .setProductPrice(e.getPrice())
                .setTotalPrice(totalPrice);
            orderItemList.add(orderItem);
        });
        orderItemRepository.saveAll(orderItemList);
        orderDetail.setOrderItems(orderItemList);
        savedOrder.setCustomer(customer);
        savedOrder.setOrderDetail(orderDetail);
        return orderRepository.save(savedOrder);
    }

    /**
     * Update an Order
     *
     * @param orderDTO
     * @return Order
     */
    @Transactional
    public Order updateOrder(OrderDTO orderDTO) {
        Order savedOrder = modelMapper.map(orderDTO, Order.class);
        return orderRepository.save(savedOrder);
    }

    /**
     * Delete an Order
     *
     * @param id
     * @return Order
     */
    @Transactional
    public void deleteOrder(Long id) {
        orderRepository
            .findById(id)
            .ifPresent(order -> {
                orderRepository.delete(order);
                log.debug("Deleted Order: {}", order);
            });
    }
}
