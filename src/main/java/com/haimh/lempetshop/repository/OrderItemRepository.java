package com.haimh.lempetshop.repository;

import com.haimh.lempetshop.domain.Authority;
import com.haimh.lempetshop.domain.OrderItem;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 * Spring Data JPA repository for the {@link Authority} entity.
 */
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    @Query(value = "SELECT SUM(totalPrice) FROM OrderItem")
    Double sumTotalByCustomerId(long customerId);

    List<OrderItem> findByOrderDetailId(long orderDetailId);
}
