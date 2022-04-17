package com.haimh.lempetshop.repository;

import com.haimh.lempetshop.domain.Authority;
import com.haimh.lempetshop.domain.Order;
import com.haimh.lempetshop.domain.Product;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the {@link Authority} entity.
 */
public interface ProductRepository extends JpaRepository<Product, Long> {}
