import { postApi } from "../../api/postApi";
import { startContentLoading, stopContentLoading } from "../global";

export const startFetchQuestionsByShelter = () =>
    async (dispatch, getState) => {
        try {
            dispatch(startContentLoading())
            const { userId } = getState().persisted.auth;
            if (!userId) throw new Error("No user id not exists");
            
            const { data } = await postApi.get("/question/all/shelter/" + userId);
            console.log("startFetchQuestionsByShelter from thunk ", data);
            dispatch(stopContentLoading())
            return data
        } catch (error) {
            console.log(error);
            dispatch(stopContentLoading())
            throw new Error(error);
        }

    };