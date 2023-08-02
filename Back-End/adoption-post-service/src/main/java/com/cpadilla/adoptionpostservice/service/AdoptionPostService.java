package com.cpadilla.adoptionpostservice.service;

import com.cpadilla.adoptionpostservice.model.*;

import java.util.List;

public interface AdoptionPostService {

    AdoptionPostResponse getAdoptionPostById(int postId);

    int savePost(PostRequest request);

    List<AdoptionPostPartialsResponse> getAllPostsByUserId(int userId);
    List<AdoptionPostPartialsResponse> getAllSorted(String sortingMethod, boolean desc);
    List<AdoptionPostPartialsResponse> getAllFilter(FilterRequest filterRequest);

    int updatePost(AdoptionPostRequest request);

    int cancelPost(int postId);


}
