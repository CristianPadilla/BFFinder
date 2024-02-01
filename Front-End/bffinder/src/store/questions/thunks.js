import { HttpStatusCode } from "axios";
import { postApi } from "../../api/postApi";
import { startContentLoading, stopContentLoading } from "../global";
import { setPendingShelters, setQuestions } from "./questionSlice";
import { setErrorMessage } from "../pet";
import { userApi } from "../../api/userApi";

export const startFetchQuestionsByShelter = () =>
    async (dispatch, getState) => {
        try {
            dispatch(startContentLoading())
            const { userId } = getState().persisted.auth;
            if (!userId) throw new Error("No user id not exists");

            console.log("startFetchQuestionsByShelter from thunk ", userId);
            const { status, data } = await postApi.get("/question/all/shelter/" + userId);

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

export const startGetPendingShelters = () =>
    async (dispatch, getState) => {
        try {
            dispatch(startContentLoading())

            const { status, data } = await userApi.get("/pending/shelters");

            if (status !== HttpStatusCode.Ok) dispatch(setErrorMessage(data));

            dispatch(setPendingShelters(data))
            dispatch(stopContentLoading())
        } catch (error) {
            console.log(error);
            dispatch(stopContentLoading())
            throw new Error(error);
        }
    }

export const startDisableShelter = (userId) =>
    async (dispatch, getState) => {
        try {
            dispatch(startContentLoading())
            const { status, data } = await userApi.put("/disable/shelter/" + userId);
            if (status !== HttpStatusCode.Ok) dispatch(setErrorMessage(data));
            dispatch(startGetPendingShelters())
        } catch (error) {
            console.log(error);
            dispatch(stopContentLoading())
            throw new Error(error);
        }
    }

export const startEnableShelter = (userId) =>
    async (dispatch, getState) => {
        try {
            dispatch(startContentLoading())
            const { status, data } = await userApi.put("/enable/shelter/" + userId);
            if (status !== HttpStatusCode.Ok) dispatch(setErrorMessage(data));
            dispatch(startGetPendingShelters())
        } catch (error) {
            console.log(error);
            dispatch(stopContentLoading())
            throw new Error(error);
        }
    }
