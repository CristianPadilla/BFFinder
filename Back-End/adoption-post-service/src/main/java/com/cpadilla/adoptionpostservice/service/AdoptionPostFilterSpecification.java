package com.cpadilla.adoptionpostservice.service;

import com.cpadilla.adoptionpostservice.entity.AdoptionPostEntity;
import com.cpadilla.adoptionpostservice.model.FilterRequest;
import jakarta.persistence.criteria.Predicate;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;

@Service
@Log4j2
public class AdoptionPostFilterSpecification<T> {

//    public Specification<T> getSearchSpecification(FilterRequest filterRequest) {
//        return new Specification<T>() {
//            @Override
//            public Predicate toPredicate(Root<T> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
//                return criteriaBuilder.equal(root.get("date"), filterRequest.getFromDate());
//            }
//        };
//    }

    public Specification<AdoptionPostEntity> getSearchSpecification(FilterRequest filterRequest) {
        return (root, query, criteriaBuilder) -> {

            List<Predicate> predicates = new ArrayList<>();
            Object formatedValue = "";

            predicates.add(criteriaBuilder.equal(root.get("status"), true)); // filter active ones

            if (filterRequest.getFromDate()!= null && !filterRequest.getFromDate().isEmpty()) {// date filter
                log.info("applying filter of date for posts with date before {}", filterRequest.getFromDate());
                var dateFilter = LocalDate.parse(filterRequest.getFromDate());
                var filter = dateFilter.atStartOfDay(ZoneId.systemDefault()).minusHours(5).toInstant(); // from that day start
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("date"), Instant.parse(filter.toString())));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
