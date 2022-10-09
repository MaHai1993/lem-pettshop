package com.haimh.lempetshop.repository;

import com.haimh.lempetshop.domain.Authority;
import com.haimh.lempetshop.domain.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the {@link Authority} entity.
 */
public interface CustomerRepository extends JpaRepository<Customer, Long> {}
