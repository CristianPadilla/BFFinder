package com.cpadilla.adoptionpostservice.controller;

import com.cpadilla.adoptionpostservice.model.*;
import com.cpadilla.adoptionpostservice.service.AdoptionPostService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/post")
@Log4j2
public class AdoptionPostController {


    @Autowired
    private AdoptionPostService service;

    @GetMapping("/{id}")
    public ResponseEntity<AdoptionPostResponse> getAdoptionPostById(@PathVariable("id") int postId) {
        log.info("Getting post with id {} from CONTROLLER layer", postId);
        return new ResponseEntity<>(service.getAdoptionPostById(postId), HttpStatus.OK);
    }

    @GetMapping("/all/user/{id}")
    public ResponseEntity<List<AdoptionPostPartialsResponse>> getAllAdoptionPostsByUserId(@PathVariable("id") int userId) {
        log.info("Getting all post by user with id {} from CONTROLLER layer", userId);
        return new ResponseEntity<>(service.getAllPostsByUserId(userId), HttpStatus.OK);
    }

    @GetMapping("/all/sort/{sortMethod}/{desc}")
    public ResponseEntity<List<AdoptionPostPartialsResponse>> getAllAdoptionPosts(@PathVariable("sortMethod") String sortingMethod, @PathVariable("desc") boolean isDecending) {
        log.info("Getting by {} sorted post from CONTROLLER layer ", sortingMethod);
        return new ResponseEntity<>(service.getAllSorted(sortingMethod, isDecending), HttpStatus.OK);
    }

    @GetMapping("/all/filter")
    public ResponseEntity<List<AdoptionPostPartialsResponse>> getAllAdoptionPostsFiltered(@RequestBody FilterRequest filterRequest) {
        log.info("Getting posts filtered from CONTROLLER layer with filters: {}", filterRequest);
        return new ResponseEntity<>(service.getAllFilter(filterRequest), HttpStatus.OK);
    }

    @PostMapping("/save")
    public ResponseEntity<Integer> saveAdoptionPost(@RequestBody PostRequest request) {
        log.info("Creating post from CONTROLLER layer");
        return new ResponseEntity<>(service.savePost(request), HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<Integer> updateAdoptionPost(@RequestBody AdoptionPostRequest request) {
        log.info("Updating post from CONTROLLER layer");
        return new ResponseEntity<>(service.updatePost(request), HttpStatus.OK);
    }

    @GetMapping("check/pet/{petId}")
    public ResponseEntity<Boolean> checkPetIsPosted(@PathVariable("petId") int petId) {
        log.info("Checking if post already exist with prtId id {} from CONTROLLER layer", petId);
        return new ResponseEntity<>(service.checkPetIsPosted(petId), HttpStatus.OK);
    }

}
