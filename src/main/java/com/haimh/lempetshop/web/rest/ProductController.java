package com.haimh.lempetshop.web.rest;

import com.haimh.lempetshop.security.AuthoritiesConstants;
import com.haimh.lempetshop.service.ProductService;
import com.haimh.lempetshop.service.dto.ProductDTO;
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
@RequestMapping("/api/product")
public class ProductController {

    private final Logger log = LoggerFactory.getLogger(ProductController.class);

    @Autowired
    private ProductService productService;

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    @GetMapping(value = "/get-all-product")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<List<ProductDTO>> getAllProduct(Pageable pageable) {
        Page<ProductDTO> orders = productService.getAllProduct(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), orders);
        return new ResponseEntity<>(orders.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping(value = "/get-all-product-without-paging")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<List<ProductDTO>> getAllProduct() {
        return new ResponseEntity<>(productService.getAllProductWithoutPaging(), HttpStatus.OK);
    }

    @PostMapping("/create")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<ProductDTO> createProduct(@Valid @RequestBody ProductDTO productDTO) {
        ProductDTO order = productService.createProduct(productDTO);
        return ResponseEntity.ok(order);
    }

    @PutMapping("/update")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<ProductDTO> updateProduct(@Valid @RequestBody ProductDTO productDTO) {
        log.debug("REST request to update Product : {}", productDTO);
        ProductDTO updatedUser = productService.updateProduct(productDTO);

        return ResponseUtil.wrapOrNotFound(
            Optional.of(updatedUser),
            HeaderUtil.createAlert(
                applicationName,
                "A user is updated with identifier " + productDTO.getId(),
                String.valueOf(productDTO.getId())
            )
        );
    }

    @GetMapping("/find-product/{id}")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<ProductDTO> getProduct(@PathVariable Long id) {
        log.debug("REST request to get ProductDTO : {}", id);
        return ResponseUtil.wrapOrNotFound(productService.findOneById(id));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        log.debug("REST request to delete ProductDTO: {}", id);
        productService.deleteProduct(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createAlert(applicationName, "A product is deleted with identifier " + id, String.valueOf(id)))
            .build();
    }
}
