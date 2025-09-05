package com.klef.cicd.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.klef.cicd.entity.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    // You can add custom queries if needed later
}
