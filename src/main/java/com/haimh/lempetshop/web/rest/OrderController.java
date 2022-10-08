package com.haimh.lempetshop.web.rest;

import com.haimh.lempetshop.domain.Order;
import com.haimh.lempetshop.security.AuthoritiesConstants;
import com.haimh.lempetshop.service.OrderService;
import com.haimh.lempetshop.service.dto.CreateOrderDTO;
import com.haimh.lempetshop.service.dto.OrderDTO;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import javax.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * Controller to authenticate users.
 */
@RestController
@RequestMapping("/api/order")
public class OrderController {

    private final Logger log = LoggerFactory.getLogger(OrderController.class);

    @Autowired
    private OrderService orderService;

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    @GetMapping(value = "/get-all-order")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<List<OrderDTO>> getAllOrder(Pageable pageable) {
        Page<OrderDTO> orders = orderService.getAllOrder(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), orders);
        return new ResponseEntity<>(orders.getContent(), headers, HttpStatus.OK);
    }

    @PostMapping("/create")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<Order> createOrder(@RequestBody CreateOrderDTO orderDTO) throws Exception {
        Order order = orderService.createOrder(orderDTO);
        return ResponseEntity.ok(order);
    }

    @PutMapping("/update")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<Order> updateOrder(@Valid @RequestBody OrderDTO orderDTO) {
        log.debug("REST request to update Order : {}", orderDTO);
        Order updatedOrder = orderService.updateOrder(orderDTO);

        return ResponseUtil.wrapOrNotFound(
            Optional.of(updatedOrder),
            HeaderUtil.createAlert(
                applicationName,
                "A Order is updated with identifier " + orderDTO.getId(),
                String.valueOf(orderDTO.getId())
            )
        );
    }

    @GetMapping("/find-order/{id}")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<OrderDTO> getOrder(@PathVariable Long id) throws Exception {
        log.debug("REST request to get Order : {}", id);
        return ResponseUtil.wrapOrNotFound(orderService.findOneById(id));
    }

    @DeleteMapping("/order/{id}")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        log.debug("REST request to delete Order: {}", id);
        orderService.deleteOrder(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createAlert(applicationName, "A order is deleted with identifier " + id, String.valueOf(id)))
            .build();
    }
}
