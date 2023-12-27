import { postApi } from "../../../api/postApi";
import { fetchPostsStart, fetchPostsSuccess } from "./postSlice";


export const fetchPosts = (page = 0, filters = {}) => async (dispatch, getState) => {
    // try {
    dispatch(fetchPostsStart());

    const response = await postApi.post("/all/filter", filters);
    console.log("fetchPosts ->", response.data);

    dispatch(fetchPostsSuccess({
        posts: response.data.content,

        page: response.data.number + 1
    }));
    // } catch (error) {
    //     dispatch(fetchPostsFailure(error.message));
    // }
};