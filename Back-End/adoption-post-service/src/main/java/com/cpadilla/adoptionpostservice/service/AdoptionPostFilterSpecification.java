package com.cpadilla.adoptionpostservice.service;

import com.cpadilla.adoptionpostservice.entity.AdoptionPostEntity;
import com.cpadilla.adoptionpostservice.model.FilterRequest;
import com.cpadilla.adoptionpostservice.model.SearchRequest;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
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

    public Specification<T> getSearchSpecification(SearchRequest searchRequest) {
        return new Specification<T>() {
            @Override
            public Predicate toPredicate(Root<T> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                return criteriaBuilder.equal(root.get(searchRequest.getFilter()), searchRequest.getValue());
            }
        };
    }

//    public Specification<T> getSearchSpecification(List<SearchRequest> searchRequests) {
//        return (root, query, criteriaBuilder) -> {
//            List<Predicate> predicates = new ArrayList<>();
//            predicates.add(criteriaBuilder.equal(root.get("status"), true)); // filter active ones
//
//            for (SearchRequest searchRequest : searchRequests) {
//                log.info("applying filter {}", searchRequest.getFilter());
//                Object formatedValue = "";
//                if (searchRequest.getFilter().equals("date")) {
//                    log.info("applying filter of date for posts before {}", searchRequest.getValue());
//                    var takenDate = LocalDate.parse(searchRequest.getValue());
//                    formatedValue = takenDate.atStartOfDay(ZoneId.systemDefault()).toInstant();
//                    predicates.add(criteriaBuilder
//                            .lessThanOrEqualTo(root.get(searchRequest.getFilter()), Instant.parse(formatedValue.toString())));
//                    continue;
//                } else if (searchRequest.getFilter().equals("id")) {
//                    formatedValue = searchRequest.getValue();
//                }
//                Predicate equal = criteriaBuilder
//                        .equal(root.get(searchRequest.getFilter()), formatedValue);
//                predicates.add(equal);
//            }
//            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
//        };
//    }


    public Specification<AdoptionPostEntity> getSearchSpecification(FilterRequest filterRequest) {
        return (root, query, criteriaBuilder) -> {

            List<Predicate> predicates = new ArrayList<>();
            Object formatedValue = "";

            predicates.add(criteriaBuilder.equal(root.get("status"), true)); // filter active ones

            if (filterRequest.getDate()!= null && !filterRequest.getDate().isEmpty()) {
                log.info("applying filter of date for posts with date before {}", filterRequest.getDate());
                var takenDate = LocalDate.parse(filterRequest.getDate());
                formatedValue = takenDate.atStartOfDay(ZoneId.systemDefault()).toInstant();
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("date"), Instant.parse(formatedValue.toString())));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
