package com.cpadilla.adoptionpostservice.service;

import com.cpadilla.adoptionpostservice.entity.AdoptionPostEntity;
import com.cpadilla.adoptionpostservice.exception.CustomException;
import com.cpadilla.adoptionpostservice.model.PostFilters;
import jakarta.persistence.criteria.Predicate;
import lombok.extern.log4j.Log4j2;
import org.hibernate.query.sqm.TemporalUnit;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.*;
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

    public Specification<AdoptionPostEntity> getSearchSpecification(PostFilters filterRequest) {
        return (root, query, criteriaBuilder) -> {

            List<Predicate> predicates = new ArrayList<>();
            Object formatedValue = "";

            if (filterRequest.getFromDate() != null && !filterRequest.getFromDate().isEmpty()) {// date filter
                log.info("applying filter of date for posts with date before {}", filterRequest.getFromDate());
                var dateFilter = LocalDate.parse(filterRequest.getFromDate());

                var filter = dateFilter.atStartOfDay(ZoneId.systemDefault()).minusHours(5).toInstant(); // from that day start
                if (filterRequest.isSpecificDate()) {
                    var finalOfDay = dateFilter.atStartOfDay(ZoneId.systemDefault()).minusHours(5).plusDays(1).minusSeconds(1).toInstant(); // from that day start

                    var predicate = criteriaBuilder.and(
                            criteriaBuilder.greaterThanOrEqualTo(root.get("date"), Instant.parse(filter.toString())),
                            criteriaBuilder.lessThan(root.get("date"), Instant.parse(finalOfDay.toString()))
                    );
                    predicates.add(predicate);
                } else {
                    predicates.add(
                            criteriaBuilder.greaterThanOrEqualTo(root.get("date"), Instant.parse(filter.toString())));
                }
            }

            if (filterRequest.getStatus() != null && !filterRequest.getStatus().isEmpty()) {
                if (filterRequest.getStatus().toUpperCase().equals("A"))
                    predicates.add(criteriaBuilder.equal(root.get("status"), true)); // filter active ones;
                else if (filterRequest.getStatus().toUpperCase().equals("I"))
                    predicates.add(criteriaBuilder.equal(root.get("status"), false)); // filter inactive ones;
                else
                    throw new CustomException("Filter 'status' is not valid", "FILTER_NOT_VALID", HttpStatus.BAD_REQUEST.value());
            }

            if (filterRequest.getUserId() != 0)
                predicates.add(criteriaBuilder.equal(root.get("userId"), filterRequest.getUserId())); // filter by user id

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
