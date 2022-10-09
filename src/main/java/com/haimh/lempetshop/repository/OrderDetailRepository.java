package com.haimh.lempetshop.repository;

import com.haimh.lempetshop.domain.Authority;
import com.haimh.lempetshop.domain.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the {@link Authority} entity.
 */
public interface OrderDetailRepository extends JpaRepository<OrderDetail, Long> {}
