import { HttpStatusCode } from "axios";
import { postApi } from "../../api/postApi";
import { startContentLoading, stopContentLoading } from "../global";
import { setQuestions } from "./questionSlice";
import { setErrorMessage } from "../pet";

export const startFetchQuestionsByShelter = () =>
    async (dispatch, getState) => {
        try {
            dispatch(startContentLoading())
            const { userId } = getState().persisted.auth;
            if (!userId) throw new Error("No user id not exists");

            const { status, data } = await postApi.get("/question/all/shelter/" + userId);
            // console.log("startFetchQuestionsByShelter from thunk ", status, data);

            if (status !== HttpStatusCode.Ok) dispatch(setErrorMessage(data));

            dispatch(setQuestions(data))
            dispatch(stopContentLoading())
        } catch (error) {
            console.log(error);
            dispatch(stopContentLoading())
            throw new Error(error);
        }

    };

export const startUpdateQuestionAnswer = (questionId, answer) =>
    async (dispatch, getState) => {
        try {
            // console.log("startUpdateQuestionAnswer from thunk ", questionId, answer);
            dispatch(startContentLoading())
            const answerUpdateRequest = {
                answer: answer,
                questionId: questionId
            }
            const { status, data } = await postApi.put("/question/update/answer", answerUpdateRequest);
            // console.log("startUpdateQuestionAnswer from thunk ", status, data);

            if (status !== HttpStatusCode.Ok) dispatch(setErrorMessage(data));

            dispatch(stopContentLoading())
            dispatch(startFetchQuestionsByShelter())
        } catch (error) {
            console.log(error);
            dispatch(stopContentLoading())
            throw new Error(error);
        }

    };

export const startCreateQuestion = (question, postId) =>
    async (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            try {
                const { userId } = getState().persisted.auth;
                if (!userId) throw new Error("No user id not exists");
                // console.log("startCreateQuestion from thunk ", question);
                dispatch(startContentLoading())
                const questionRequest = {
                    question: question,
                    postId: postId,
                    userId: userId
                }
                const { status, data } = await postApi.post("/question/save", questionRequest);
                // console.log("startCreateQuestion from thunk ", status, data);
                if (status !== HttpStatusCode.Created) {
                    dispatch(setErrorMessage(data));
                    reject(data);
                } else {
                    resolve(data);
                    dispatch(stopContentLoading())
                }

            } catch (error) {
                console.log(error);
                dispatch(stopContentLoading())
                reject(error);
            }
        });
    };