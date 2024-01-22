package com.cpadilla.adoptionpostservice.controller;

import com.cpadilla.adoptionpostservice.model.*;
import com.cpadilla.adoptionpostservice.service.AdoptionPostService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

    @PostMapping("/user/{userId}/filter")
    public ResponseEntity<PostsFilteredPageResponse> getAdoptionPostsByUserIdFilter(@PathVariable("userId") int userId, @RequestBody PostsRequest filterRequest) {
        log.info("Getting filtered post by user with id {} from CONTROLLER layer", userId);
        return new ResponseEntity<>(service.getPostsByUserIdFilter(userId, filterRequest), HttpStatus.OK);
    }

    @GetMapping("/all/sort/{sortMethod}/{desc}")
    public ResponseEntity<List<AdoptionPostPartialsResponse>> getAllAdoptionPosts(@PathVariable("sortMethod") String sortingMethod, @PathVariable("desc") boolean isDecending) {
        log.info("Getting by {} sorted post from CONTROLLER layer ", sortingMethod);
        return new ResponseEntity<>(service.getAllSorted(sortingMethod, isDecending), HttpStatus.OK);
    }

    @PostMapping("/all/filter")
    public ResponseEntity<PostsFilteredPageResponse> getAllAdoptionPostsFiltered(@RequestBody PostsRequest filterRequest) {
        log.info("Getting posts filtered from CONTROLLER layer with filters: {}", filterRequest);
        return new ResponseEntity<>(service.getAllFilter(filterRequest), HttpStatus.OK);
    }

    @PostMapping("/save")
    public ResponseEntity<AdoptionPostResponse> saveAdoptionPost(@Validated @RequestBody PostRequest request) {
        log.info("Creating post from CONTROLLER layer");
        return new ResponseEntity<>(service.savePost(request), HttpStatus.CREATED);
    }


    @PutMapping("/update/description")
    public ResponseEntity<AdoptionPostResponse> updateAdoptionPostDescription(@RequestBody AdoptionPostRequest request) {
        log.info("Updating post description from CONTROLLER layer");
        return new ResponseEntity<>(service.updatePostDescription(request), HttpStatus.OK);
    }

    @PutMapping("/update/pet/{postId}/{petId}")
    public ResponseEntity<AdoptionPostResponse> updateAdoptionAssignedPet(@PathVariable("postId") int postId, @PathVariable("petId") int petId) {
        log.info("Updating post assigned pet from CONTROLLER layer");
        return new ResponseEntity<>(service.updatePostAssignedPet(postId, petId), HttpStatus.OK);
    }

    @GetMapping("/check/pet/{petId}")
    public ResponseEntity<Boolean> checkPetIsPosted(@PathVariable("petId") int petId) {
        log.info("Checking if post already exist with petId id {} from CONTROLLER layer", petId);
        return new ResponseEntity<>(service.checkPetIsPosted(petId), HttpStatus.OK);
    }

    // Images managment
    @PostMapping("/{postId}/image")
    public ResponseEntity<ImageResponse> saveAdoptionPostImage(@PathVariable("postId") int postId, @RequestBody MultipartFile image) {
        log.info("saving post image from CONTROLLER layer");
        return new ResponseEntity<>(service.savePostImage(postId, image), HttpStatus.OK);
    }

    @DeleteMapping("/image/{imageId}/{postId}")
    public ResponseEntity<Void> deleteImageFromPost(@PathVariable("imageId") int imageId, @PathVariable("postId") int postId) {
        log.info("deleting post image from CONTROLLER layer");
        service.cancelPostImage(postId, imageId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/image/clean/{postId}")
    public ResponseEntity<Void> cleanPostImages(@PathVariable("postId") int postId) {
        log.info("cleaning post {} images from CONTROLLER layer", postId);
        service.cleanPostImages(postId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/disable/{postId}")
    public ResponseEntity<Void> disablePost(@PathVariable("postId") int postId) {
        log.info("disabling post from CONTROLLER layer");
        service.cancelPost(postId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/enable/{postId}")
    public ResponseEntity<Void> enablePost(@PathVariable("postId") int postId) {
        log.info("enabling post from CONTROLLER layer");
        service.enablePost(postId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/pet/{petId}/delete")
    public ResponseEntity<Void> deletePostByPetId(@PathVariable("petId") int petId) {
        log.info("deleting post from CONTROLLER layer");
        service.deletePostByPetId(petId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/available/species")
    public ResponseEntity<List<Integer>> findAvailablePostedSpecies() {
        log.info("Getting available species from CONTROLLER layer");
        return new ResponseEntity<>(service.findAvailablePostedSpecies(), HttpStatus.OK);
    }

    @GetMapping("/available/breeds/specie/{specieId}")
    public ResponseEntity<List<Integer>> findAvailablePostedBreedsBySpecieId(@PathVariable("specieId") int specieId) {
        log.info("Getting available breeds from CONTROLLER layer");
        return new ResponseEntity<>(service.findAvailablePostedBreedsBySpecieId(specieId), HttpStatus.OK);
    }

}
