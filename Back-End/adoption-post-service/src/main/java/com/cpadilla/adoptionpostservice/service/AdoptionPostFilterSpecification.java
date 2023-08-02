package com.cpadilla.adoptionpostservice.service;

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
import java.util.Objects;

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

    public Specification<T> getSearchSpecification(List<SearchRequest> searchRequests) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            for (SearchRequest searchRequest : searchRequests) {
                log.info("=================== 111 {}", searchRequest.getFilter());
                Object formatedValue = "";
                if (searchRequest.getFilter().equals("status")) {
                    formatedValue = Boolean.parseBoolean(searchRequest.getValue());

                } else if (searchRequest.getFilter().equals("date")) {
                    log.info("============11======= ");
                    var takenDate = LocalDate.parse(searchRequest.getValue());
                    formatedValue = takenDate.atStartOfDay(ZoneId.systemDefault()).toInstant();
                    log.info("============22======= {}", formatedValue.toString());
                    Predicate equal = criteriaBuilder
                            .lessThanOrEqualTo(root.get(searchRequest.getFilter()), Instant.parse(formatedValue.toString()));
                    predicates.add(equal);
                    continue;
//                        formatedValue= Instant.parse(searchRequest.getValue());
//                    formatedValue = "2020-08-21T00:00:00.000Z";

                } else if (searchRequest.getFilter().equals("id")) {
                    formatedValue = searchRequest.getValue();
                }
                Predicate equal = criteriaBuilder
                        .equal(root.get(searchRequest.getFilter()), formatedValue);
                predicates.add(equal);
            }
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
