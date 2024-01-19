package com.cpadilla.adoptionpostservice.service;

import com.cpadilla.adoptionpostservice.model.*;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface AdoptionPostService {

    AdoptionPostResponse getAdoptionPostById(int postId);

    AdoptionPostResponse savePost(PostRequest request);

    ImageResponse savePostImage(int postId, MultipartFile image);

    void cancelPostImage(int postId, int imageId);
    void cleanPostImages(int postId);

    PostsFilteredPageResponse getPostsByUserIdFilter(int userId, PostsRequest filterRequest);

    List<AdoptionPostPartialsResponse> getAllSorted(String sortingMethod, boolean desc);

    PostsFilteredPageResponse getAllFilter(PostsRequest filterRequest);

    AdoptionPostResponse updatePostDescription(AdoptionPostRequest request);
    AdoptionPostResponse updatePostAssignedPet(int postId, int petId);

    int cancelPost(int postId);

    boolean checkPetIsPosted(int petId);

    List<ImageResponse> findPostImages(int postId);

    List<QuestionResponse> findQuestionsByShelterUserId(int userId);

    QuestionResponse saveQuestion(QuestionRequest request);

    QuestionResponse updateQuestionDescription(String description, int questionId);
    QuestionResponse updateQuestionAnswer(String description, int questionId);


}
