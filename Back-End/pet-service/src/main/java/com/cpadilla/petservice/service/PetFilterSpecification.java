package com.cpadilla.petservice.service;

import com.cpadilla.petservice.entity.PetEntity;
import com.cpadilla.petservice.exception.CustomException;
import com.cpadilla.petservice.external.client.BreedService;
import com.cpadilla.petservice.model.BreedResponse;
import com.cpadilla.petservice.model.FilterRequest;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Log4j2
public class PetFilterSpecification<T> {

    @Autowired
    private BreedService breedService;

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

            if (filterRequest.getSize() != null) { // size filter
                var sizeFilter = filterRequest.getSize().toLowerCase().charAt(0);
                if (sizeFilter != 'l' || sizeFilter != 'm' || sizeFilter != 's') {
                    log.info("applying filter of size in pet query");
                    predicates.add(criteriaBuilder.equal(root.get("size"), sizeFilter));
                } else
                    throw new CustomException("Filter 'size' is not valid", "FILTER_NOT_VALID", HttpStatus.NOT_FOUND.value());
            }

            if (filterRequest.getSpecieId() != 0) {// specie & breed filters
                log.info("applying filter of specie id: {} in pet query", filterRequest.getSpecieId());
                var filteredBreeds = breedService.getAllBreedsBySpecieId(filterRequest.getSpecieId()).getBody();
                if (filteredBreeds == null || filteredBreeds.size() == 0)
                    throw new CustomException("no breeds available for specie with id " + filterRequest.getSpecieId(), "NO_BREEDS_FOUND", HttpStatus.NOT_FOUND.value());

                List<Integer> allowedBreedIds;
                if (filterRequest.getBreedId() == 0) {
                    allowedBreedIds = filteredBreeds.stream().map(BreedResponse::getId).toList();
                } else {
                    log.info("applying filter of breed id: {} in pet query", filterRequest.getBreedId());
                    allowedBreedIds = filteredBreeds.stream()
                            .map(BreedResponse::getId)
                            .filter(id -> id == filterRequest.getBreedId())
                            .toList();
                }
                predicates.add(root.get("breedId").in(allowedBreedIds));
            }

            if (filterRequest.getAge() != 0) {// age filter
                log.info("applying filter of age <= {} years old at pet query", filterRequest.getAge());
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("age"), filterRequest.getAge()));
            }

            if (filterRequest.getName() != null && !filterRequest.getName().isEmpty()) {// name filter
                log.info("applying filter of name for pets with name {}", filterRequest.getName());
                var nameFilter = filterRequest.getName().toLowerCase(); // from that day start
                predicates.add(criteriaBuilder.like(root.get("name"), "%"+nameFilter+"%"));
            }


            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));


        };
    }
}
