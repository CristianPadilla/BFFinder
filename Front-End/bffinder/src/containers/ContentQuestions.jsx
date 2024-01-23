import React, { useEffect, useState } from "react";
import { Card, CardContent, Tabs, Tab, Typography } from "@mui/material";
import ContentPetQuestions from "./ContentPetQuestions";
import { useDispatch, useSelector } from "react-redux";
import { use } from "i18next";
import { startFetchQuestionsByShelter } from "../store/questions/thunks";

const ContentQuestions = () => {
  const dispatch = useDispatch();
  const { activeModule, contentLoading } = useSelector((state) => state.persisted.global);
  const [tabValue, setTabValue] = useState(0);
  const { questions } = useSelector((state) => state.questions);


  useEffect(() => {
    console.log('useEffect== 11 : ', questions);
    if (questions.length === 0) {
      dispatch(startFetchQuestionsByShelter());
    }
  }, []);


  const answeredQuestions = questions
    .filter((question) => question.answer && question.answer.trim().length > 0)
    .sort((a, b) => new Date(b.answerDate) - new Date(a.answerDate));

  const unAnsweredQuestions = questions
    .filter((question) => !question.answer || question.answer.trim().length === 0)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  console.log('answeredQuestions: ', answeredQuestions);
  console.log('unAnsweredQuestions: ', unAnsweredQuestions);


  const extractPetGroups = (questions) => {
    let questionsGroups = [];
    let i = 0;
    for (i; i < questions.length; i++) {
      console.log("questions[i].post.id:", questions[i].post.id);
      const aux = questionsGroups.findIndex(
        (questionGroup) => questionGroup.postId === questions[i].post.id
      );
      console.log("aux:", aux);
      if (aux >= 0) {
        console.log("iffffff", aux);
        questionsGroups[aux].questions.push({
          id: questions[i].id,
          descripcion: questions[i].question,
          date: questions[i].date,
          answer: questions[i].answer,
          answerDate: questions[i].answerDate,
          user: {
            name: questions[i].user.name,
            surname: questions[i].user.surname,
            avatar: questions[i].user.profileImageUrl,
          },
        });
      } else {
        console.log("elseeee", aux);
        questionsGroups.push({
          postId: questions[i].post.id,
          pet: questions[i].post.petResponse,
          questions: [
            {
              id: questions[i].id,
              descripcion: questions[i].question,
              date: questions[i].date,
              answer: questions[i].answer,
              answerDate: questions[i].answerDate,
              user: {
                name: questions[i].user.name,
                surname: questions[i].user.surname,
                avatar: questions[i].user.profileImageUrl,
              },
            },
          ],
        });
      }
    }
    return questionsGroups;
  };

  const answeredQuestionsGroups = extractPetGroups(answeredQuestions);
  const unAnsweredQuestionsGroups = extractPetGroups(unAnsweredQuestions);
  console.log("DDDDDDDDDDDDDDDD answeredGroups:", answeredQuestionsGroups);
  console.log("FFFFFFFFFFFFFFFF unAnsweredGroups:", unAnsweredQuestionsGroups);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleReply = (questionId, replyText) => {
    console.log("handleReply==");
    // const updatedQuestions = questions.map((question) =>
    //   question.id === questionId
    //     ? { ...question, isAnswered: true, replyText }
    //     : question
    // );
    // const answeredQuestion = updatedQuestions.find(
    //   (question) => question.id === questionId
    // );
    // setAnsweredQuestions([...answeredQuestions, answeredQuestion]);
    // setQuestions(updatedQuestions);
  };

  const handleEdit = (questionId, editedText) => {
    console.log("handleEdit==");
    // const updatedAnsweredQuestions = answeredQuestions.map((question) =>
    //   question.id === questionId
    //     ? { ...question, replyText: editedText }
    //     : question
    // );
    // setAnsweredQuestions(updatedAnsweredQuestions);
  };
  // {
  //   petINfo: {}
  //   questions: [
  //     {
  //       id,
  //       descripcion,
  //       answer,
  //       date,
  //       answerDate
  //       user:{},
  //     },
  //     {},
  //   ]
  // }

  // console.log("answeredQuestions:", answeredQuestions);
  // console.log("unAnsweredQuestions:", unAnsweredQuestions);

  return (
    <Card elevation={0} sx={{ borderRadius: "5px" }}>
      <CardContent sx={{ margin: 1 }}>
        <Typography variant="h5" component="div" sx={{ marginBottom: 4 }}>
          Gestión de preguntas y respuestas
        </Typography>
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          <Tab label="Preguntas sin responder" />
          <Tab label="Preguntas Respondidas" />
        </Tabs>

        {tabValue === 0 && (
          unAnsweredQuestionsGroups.map((questionGroup) => (
            <ContentPetQuestions
              key={questionGroup.postId}
              questionsGroup={questionGroup}
              onReply={handleReply}
              showAnswered={false}
            />
          ))
        )}
        {tabValue === 1 && (
          answeredQuestionsGroups.map((questionGroup) => (
            <ContentPetQuestions
              key={questionGroup.postId}
              questionsGroup={questionGroup}
              showAnswered={true}
              onEdit={handleEdit}
            />
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default ContentQuestions;
