package com.cpadilla.adoptionpostservice.controller;


import com.cpadilla.adoptionpostservice.model.QuestionAnswerUpdateRequest;
import com.cpadilla.adoptionpostservice.model.QuestionRequest;
import com.cpadilla.adoptionpostservice.model.QuestionResponse;
import com.cpadilla.adoptionpostservice.service.AdoptionPostService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Log4j2
@RequestMapping("/post/question")
public class QuestionController {


    @Autowired
    AdoptionPostService adoptionPostService;

    @PostMapping("/save")
    ResponseEntity<QuestionResponse> saveQuestion(@RequestBody QuestionRequest request) {
        log.info("Saving question from CONTROLLER layer");
        return ResponseEntity.status(HttpStatus.CREATED).body(adoptionPostService.saveQuestion(request));
    }

    @PutMapping("/update/answer")
    ResponseEntity<QuestionResponse> updateQuestionAnswer(@RequestBody QuestionAnswerUpdateRequest request) {
        log.info("Updating question answer from CONTROLLER layer");
        return ResponseEntity.status(HttpStatus.OK).body(adoptionPostService.updateQuestionAnswer(request));
    }

    @GetMapping("/all/shelter/{userId}")
    ResponseEntity<List<QuestionResponse>> saveQuestion(@PathVariable("userId") int userId) {
        log.info("Getting all questions y shelter {} from CONTROLLER layer", userId);
        return ResponseEntity.status(HttpStatus.OK).body(adoptionPostService.findQuestionsByShelterUserId(userId));
    }

    @GetMapping("/pending/count/shelter/{userId}")
    ResponseEntity<Integer> getPendingQuestionsCountByShelter(@PathVariable("userId") int userId) {
        log.info("Getting pending questions by shelter {} from CONTROLLER layer", userId);
        return ResponseEntity.status(HttpStatus.OK).body(adoptionPostService.getPendingQuestionsCountByShelter(userId));
    }

}
