package com.cpadilla.adoptionpostservice.service;

import com.cpadilla.adoptionpostservice.model.AdoptionPostPartialsResponse;
import com.cpadilla.adoptionpostservice.model.AdoptionPostRequest;
import com.cpadilla.adoptionpostservice.model.AdoptionPostResponse;
import com.cpadilla.adoptionpostservice.model.PostRequest;

import java.util.List;

public interface AdoptionPostService {

    AdoptionPostResponse getAdoptionPostById(int postId);

    int savePost(PostRequest request);

    List<AdoptionPostPartialsResponse> getAllPostsByUserId(int userId);
    List<AdoptionPostPartialsResponse> getAllSorted(String sortingMethod, boolean desc);

    int updatePost(PostRequest request);

    int cancelPost(int postId);


}
