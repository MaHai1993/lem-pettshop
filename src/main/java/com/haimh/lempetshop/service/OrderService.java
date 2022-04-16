package com.haimh.lempetshop.service;

import com.haimh.lempetshop.domain.Order;
import com.haimh.lempetshop.domain.User;
import com.haimh.lempetshop.repository.OrderRepository;
import com.haimh.lempetshop.service.dto.OrderDTO;
import com.haimh.lempetshop.web.rest.UserResource;
import java.util.Optional;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class OrderService {

    private final Logger log = LoggerFactory.getLogger(OrderService.class);

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Transactional(readOnly = true)
    public Page<Order> getAllOrder(Pageable pageable) {
        return orderRepository.findAll(pageable);
    }

    @Transactional(readOnly = true)
    public Optional<Order> findOneById(Long id) {
        return orderRepository.findById(id);
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
