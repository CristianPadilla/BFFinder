import { HttpStatusCode } from "axios";
import { postApi } from "../../api/postApi";
import { startContentLoading, stopContentLoading } from "../global";
import { setQuestions } from "./questionSlice";

export const startFetchQuestionsByShelter = () =>
    async (dispatch, getState) => {
        try {
            dispatch(startContentLoading())
            const { userId } = getState().persisted.auth;
            if (!userId) throw new Error("No user id not exists");

            const { status, data } = await postApi.get("/question/all/shelter/" + userId);
            console.log("startFetchQuestionsByShelter from thunk ", status, data);

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
            console.log("startUpdateQuestionAnswer from thunk ", questionId, answer);
            dispatch(startContentLoading())
            const answerUpdateRequest = {
                answer: answer,
                questionId: questionId
            }
            const { status, data } = await postApi.put("/question/update/answer", answerUpdateRequest);
            console.log("startUpdateQuestionAnswer from thunk ", status, data);

            if (status !== HttpStatusCode.Ok) dispatch(setErrorMessage(data));

            dispatch(stopContentLoading())
            dispatch(startFetchQuestionsByShelter())
        } catch (error) {
            console.log(error);
            dispatch(stopContentLoading())
            throw new Error(error);
        }

    };