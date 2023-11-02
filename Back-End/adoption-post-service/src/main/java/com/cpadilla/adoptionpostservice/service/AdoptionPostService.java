package com.cpadilla.adoptionpostservice.service;

import com.cpadilla.adoptionpostservice.model.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface AdoptionPostService {

    AdoptionPostResponse getAdoptionPostById(int postId);

    int savePost(PostRequest request);

    ImageResponse savePostImage(int postId, MultipartFile image);
    ImageResponse cancelPostImage(int postId, int imageId);

    List<AdoptionPostPartialsResponse> getAllPostsByUserId(int userId);

    List<AdoptionPostPartialsResponse> getAllSorted(String sortingMethod, boolean desc);

    List<AdoptionPostPartialsResponse> getAllFilter(FilterRequest filterRequest);

    int updatePost(AdoptionPostRequest request);

    int cancelPost(int postId);

    boolean checkPetIsPosted(int petId);


}
