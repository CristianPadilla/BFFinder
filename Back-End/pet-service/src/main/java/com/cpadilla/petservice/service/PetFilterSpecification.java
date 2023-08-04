package com.cpadilla.petservice.service;

import com.cpadilla.petservice.entity.PetEntity;
import com.cpadilla.petservice.exception.CustomException;
import com.cpadilla.petservice.model.FilterRequest;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@Log4j2
public class PetFilterSpecification<T> {

    public Specification<T> getSearchSpecification(Map<String, String> filters) {
        return new Specification<T>() {
            @Override
            public Predicate toPredicate(Root<T> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                return criteriaBuilder.equal(root.get(""), "");
            }
        };
    }

    public Specification<PetEntity> getSearchSpecification(FilterRequest filterRequest) {
        return (root, query, criteriaBuilder) -> {

            List<Predicate> predicates = new ArrayList<>();
            Object formatedValue = "";

            predicates.add(criteriaBuilder.equal(root.get("status"), true)); // filter active ones

            var size = filterRequest.getSize().toLowerCase();
            if (size.equals("l") || size.equals("s") || size.equals("m")) {
                log.info("applying filter of size in pet query");
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("size"), size.charAt(0)));
            } else
                throw new CustomException("Filter 'size' not valid: ", "FILTER_NOT_VALID", HttpStatus.NOT_FOUND.value());

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));


        };
    }
}
