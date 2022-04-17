package com.haimh.lempetshop.service;

import com.haimh.lempetshop.domain.Customer;
import com.haimh.lempetshop.repository.CustomerRepository;
import com.haimh.lempetshop.security.SecurityUtils;
import com.haimh.lempetshop.service.dto.CustomerDTO;
import java.util.Date;
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
public class CustomerService {

    private final Logger log = LoggerFactory.getLogger(CustomerService.class);

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Transactional(readOnly = true)
    public Page<CustomerDTO> getAllProduct(Pageable pageable) {
        return customerRepository.findAll(pageable).map(e -> modelMapper.map(e, CustomerDTO.class));
    }

    @Transactional(readOnly = true)
    public Optional<CustomerDTO> findOneById(Long id) {
        return customerRepository.findById(id).map(e -> modelMapper.map(e, CustomerDTO.class));
    }

    @Transactional
    public CustomerDTO createProduct(CustomerDTO customerDTO) {
        Customer saveCustomer = modelMapper.map(customerDTO, Customer.class);
        String username = SecurityUtils.getCurrentUserLogin().get();
        saveCustomer.setCreatedBy(username);
        saveCustomer.setLastModifiedBy(username);
        saveCustomer.setCreatedDate(new Date());
        saveCustomer.setLastModifiedDate(new Date());
        saveCustomer = customerRepository.save(saveCustomer);
        return modelMapper.map(saveCustomer, CustomerDTO.class);
    }

    @Transactional
    public CustomerDTO updateProduct(CustomerDTO customerDTO) {
        Customer saveCustomer = modelMapper.map(customerDTO, Customer.class);
        String username = SecurityUtils.getCurrentUserLogin().get();
        saveCustomer.setLastModifiedBy(username);
        saveCustomer.setLastModifiedDate(new Date());
        saveCustomer = customerRepository.save(saveCustomer);
        return modelMapper.map(saveCustomer, CustomerDTO.class);
    }

    @Transactional
    public void deleteProduct(Long id) {
        customerRepository
            .findById(id)
            .ifPresent(product -> {
                customerRepository.delete(product);
                log.debug("Deleted Customer: {}", product);
            });
    }
}
