package com.haimh.lempetshop.web.rest;

import com.haimh.lempetshop.security.AuthoritiesConstants;
import com.haimh.lempetshop.service.CustomerService;
import com.haimh.lempetshop.service.dto.CustomerDTO;
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
@RequestMapping("/api/customer")
public class CustomerController {

    private final Logger log = LoggerFactory.getLogger(CustomerController.class);

    @Autowired
    private CustomerService customerService;

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    @GetMapping(value = "/get-all-customer")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<List<CustomerDTO>> getAllCustomer(Pageable pageable) {
        Page<CustomerDTO> orders = customerService.getAllProduct(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), orders);
        return new ResponseEntity<>(orders.getContent(), headers, HttpStatus.OK);
    }

    @PostMapping("/create")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<CustomerDTO> createCustomer(@Valid @RequestBody CustomerDTO customerDTO) {
        CustomerDTO order = customerService.createProduct(customerDTO);
        return ResponseEntity.ok(order);
    }

    @PutMapping("/update")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<CustomerDTO> updateCustomer(@Valid @RequestBody CustomerDTO customerDTO) {
        log.debug("REST request to update Product : {}", customerDTO);
        CustomerDTO updatedUser = customerService.updateProduct(customerDTO);

        return ResponseUtil.wrapOrNotFound(
            Optional.of(updatedUser),
            HeaderUtil.createAlert(
                applicationName,
                "A user is updated with identifier " + customerDTO.getId(),
                String.valueOf(customerDTO.getId())
            )
        );
    }

    @GetMapping("/find-customer/{id}")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<CustomerDTO> getCustomer(@PathVariable Long id) {
        log.debug("REST request to get CustomerDTO : {}", id);
        return ResponseUtil.wrapOrNotFound(customerService.findOneById(id));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<Void> deleteCustomer(@PathVariable Long id) {
        log.debug("REST request to delete CustomerDTO: {}", id);
        customerService.deleteProduct(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createAlert(applicationName, "A customer is deleted with identifier " + id, String.valueOf(id)))
            .build();
    }
}
