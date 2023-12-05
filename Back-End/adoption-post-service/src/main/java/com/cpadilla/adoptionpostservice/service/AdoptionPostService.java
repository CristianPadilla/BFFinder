package com.cpadilla.adoptionpostservice.service;

import com.cpadilla.adoptionpostservice.model.*;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface AdoptionPostService {

    AdoptionPostResponse getAdoptionPostById(int postId);

    int savePost(PostRequest request);

    ImageResponse savePostImage(int postId, MultipartFile image);

    void cancelPostImage(int postId, int imageId);

    Page<AdoptionPostPartialsResponse> getPostsByUserIdFilter(int userId, PostsByUserFilterRequest filterRequest);

    List<AdoptionPostPartialsResponse> getAllSorted(String sortingMethod, boolean desc);

    Page<AdoptionPostPartialsResponse> getAllFilter(AllPostsFilterRequest filterRequest);

    int updatePost(AdoptionPostRequest request);

    int cancelPost(int postId);

    boolean checkPetIsPosted(int petId);

    List<ImageResponse> findPostImages(int postId);


}
