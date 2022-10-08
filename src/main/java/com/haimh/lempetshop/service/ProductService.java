package com.haimh.lempetshop.service;

import com.haimh.lempetshop.domain.Product;
import com.haimh.lempetshop.repository.ProductRepository;
import com.haimh.lempetshop.security.SecurityUtils;
import com.haimh.lempetshop.service.dto.ProductDTO;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProductService {

    private final Logger log = LoggerFactory.getLogger(ProductService.class);

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ModelMapper modelMapper;

    /**
     * Get all Product with pageable
     *
     * @param pageable
     * @return Page<ProductDTO>
     */
    @Transactional(readOnly = true)
    public Page<ProductDTO> getAllProduct(Pageable pageable) {
        return productRepository.findAll(pageable).map(e -> modelMapper.map(e, ProductDTO.class));
    }

    /**
     * Get all Product without pageable
     *
     * @return Page<ProductDTO>
     */
    @Transactional(readOnly = true)
    public List<ProductDTO> getAllProductWithoutPaging() {
        List<ProductDTO> products = productRepository
            .findAll()
            .stream()
            .map(e -> modelMapper.map(e, ProductDTO.class))
            .collect(Collectors.toList());
        ProductDTO defaultProduct = new ProductDTO();
        defaultProduct.setId(0);
        defaultProduct.setName("Name");
        products.add(0, defaultProduct);
        return products;
    }

    /**
     * Find product by id
     *
     * @return Page<ProductDTO>
     */
    @Transactional(readOnly = true)
    public Optional<ProductDTO> findOneById(Long id) {
        return productRepository.findById(id).map(e -> modelMapper.map(e, ProductDTO.class));
    }

    /**
     * Create Product
     *
     * @return ProductDTO
     */
    @Transactional
    public ProductDTO createProduct(ProductDTO productDTO) {
        Product savedProduct = modelMapper.map(productDTO, Product.class);
        String username = SecurityUtils.getCurrentUserLogin().get();
        savedProduct.setCreatedBy(username);
        savedProduct.setLastModifiedBy(username);
        savedProduct.setCreatedDate(new Date());
        savedProduct.setLastModifiedDate(new Date());
        savedProduct = productRepository.save(savedProduct);
        return modelMapper.map(savedProduct, ProductDTO.class);
    }

    /**
     * Update Product
     *
     * @return ProductDTO
     */
    @Transactional
    public ProductDTO updateProduct(ProductDTO productDTO) {
        Product savedProduct = modelMapper.map(productDTO, Product.class);
        String username = SecurityUtils.getCurrentUserLogin().get();
        savedProduct.setLastModifiedBy(username);
        savedProduct.setLastModifiedDate(new Date());
        savedProduct = productRepository.save(savedProduct);
        return modelMapper.map(savedProduct, ProductDTO.class);
    }

    /**
     * Delete Product
     *
     */
    @Transactional
    public void deleteProduct(Long id) {
        productRepository
            .findById(id)
            .ifPresent(product -> {
                productRepository.delete(product);
                log.debug("Deleted Product: {}", product);
            });
    }
}
