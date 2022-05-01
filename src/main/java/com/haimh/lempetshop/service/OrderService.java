package com.haimh.lempetshop.service;

import com.haimh.lempetshop.domain.Order;
import com.haimh.lempetshop.domain.OrderDetail;
import com.haimh.lempetshop.repository.OrderDetailRepository;
import com.haimh.lempetshop.repository.OrderRepository;
import com.haimh.lempetshop.repository.ProductRepository;
import com.haimh.lempetshop.service.dto.CustomerDTO;
import com.haimh.lempetshop.service.dto.OrderDTO;
import com.haimh.lempetshop.service.dto.OrderDetailDTO;
import java.util.Optional;
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
    private ProductRepository productRepository;

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Transactional(readOnly = true)
    public Page<OrderDTO> getAllOrder(Pageable pageable) {
        return orderRepository.findAll(pageable).map(e -> modelMapper.map(e, OrderDTO.class));
    }

    @Transactional(readOnly = true)
    public Optional<OrderDTO> findOneById(Long id) {
        OrderDTO orderDTO = orderRepository.findById(id).map(e -> modelMapper.map(e, OrderDTO.class)).get();
        if (orderDTO.getOrderDetail() != null) {
            if (!ObjectUtils.isEmpty(orderDTO.getOrderDetail().getOrderItems())) {
                orderDTO
                    .getOrderDetail()
                    .getOrderItems()
                    .stream()
                    .forEach(e -> e.setProductName(productRepository.findById(e.getProductId()).get().getName()));
            }
        }
        return Optional.of(orderDTO);
    }

    @Transactional
    public Order createOrder(OrderDTO orderDTO) {
        Order savedOrder = modelMapper.map(orderDTO, Order.class);
        return orderRepository.save(savedOrder);
    }

    @Transactional
    public Order updateOrder(OrderDTO orderDTO) {
        Order savedOrder = modelMapper.map(orderDTO, Order.class);
        return orderRepository.save(savedOrder);
    }

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
