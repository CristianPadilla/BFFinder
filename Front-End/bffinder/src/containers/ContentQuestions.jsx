import React, { useState } from "react";
import { Card, CardContent, Tabs, Tab, Typography } from "@mui/material";
import ContentPetQuestions from "./ContentPetQuestions";

const ContentQuestions = () => {
  const [tabValue, setTabValue] = useState(0);
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: "Mensaje sin responder 1",
      isAnswered: false,
      answer: "",
      petId: 1,
    },
    {
      id: 2,
      question: "Mensaje con responder 2",
      isAnswered: true,
      answer: "respuesta 1",
      petId: 2,
    },
    {
      id: 3,
      question: "Mensaje sin responder 3",
      isAnswered: false,
      answer: "",
      petId: 2,
    },
    {
      id: 4,
      question: "Mensaje con responder 4",
      isAnswered: true,
      answer: "respuesta 2",
      petId: 1,
    },
    {
      id: 5,
      question: "Mensaje sin responder 5",
      isAnswered: false,
      answer: "",
      petId: 2,
    },
    {
      id: 6,
      question: "Mensaje con responder 5",
      isAnswered: true,
      answer: "respuesta 3",
      petId: 3,
    },
  ]);

  const answeredQuestions = questions.filter((question) => question.isAnswered);
  const unAnsweredQuestions = questions.filter(
    (question) => !question.isAnswered
  );

  // const petAnsweredGroups = answeredQuestions.map((question) => {

  const extractPetGroups = (questions) => {
    let questionsGroups = [];
    let i = 0;
    for (i; i < questions.length; i++) {
      console.log("questions[i].petId:", questions[i]);
      const aux = questionsGroups.findIndex(
        (questionGroup) => questionGroup.petId === questions[i].petId
      );
      console.log("aux:", aux);
      if (aux > 0) {
        console.log("iffffff", aux);
        questionsGroups[aux].questions.push({
          id: questions[i].id,
          descripcion: questions[i].question,
          answer: questions[i].answer,
          isAnswered: questions[i].isAnswered,
        });
      } else {
        console.log("elseeee", aux);
        questionsGroups.push({
          petId: questions[i].petId,
          questions: [
            {
              id: questions[i].id,
              descripcion: questions[i].question,
              answer: questions[i].answer,
              user: {},
            },
          ],
        });
      }
    }
    return questionsGroups;
  };
  const answeredGroups = extractPetGroups(answeredQuestions);// 
  const unAnsweredGroups = extractPetGroups(unAnsweredQuestions);
  console.log("DDDDDDDDDDDDDDDD questionsGroups:", answeredGroups);
  console.log("FFFFFFFFFFFFFFFF questionsGroups:", unAnsweredGroups);
  // });

  // const [answeredQuestions, setAnsweredQuestions] = useState([]);
  // const [editedQuestions, setEditedQuestions] = useState([]);

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
          // unAnsweredQuestions.map((question) => !question.isAnswered) && ()

          <ContentPetQuestions
            questions={questions.filter((question) => !question.isAnswered)}
            onReply={handleReply}
            showAnswered={false}
          />
        )}
        {tabValue === 1 && (
          <ContentPetQuestions
            questions={answeredQuestions}
            showAnswered={true}
            onEdit={handleEdit}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default ContentQuestions;
