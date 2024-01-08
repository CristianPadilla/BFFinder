import { postApi } from "../../api/postApi";
import { startContentLoading, stopContentLoading } from "../global";
import { fetchPostsStart, fetchPostsSuccess, setPostsRequest } from "./postSlice";


export const fetchPosts = () => async (dispatch, getState) => {
    try {
        dispatch(startContentLoading())
        const { userId, role } = getState().persisted.auth;
        const postsRequest = getState().posts.postRequest;
        const url = role === "u"
            ? "/all/filter"
            : `/user/${userId}/filter`;
            const { data } = await postApi.post(url, postsRequest);
            const { page, request } = data;
            dispatch(fetchPostsSuccess({
                
                page: {
                    pageNumber: page.number,
                    pageSize: page.size,
                    numberOfElements: page.numberOfElements,
                    totalPages: page.totalPages,
                totalElements: page.totalElements,
                offset: page.pageable.offset,
                last: page.last,
                first: page.first,
                sort: page.sort.property,
                desc: page.sort.descending,
                posts: page.content,
                
            }
        }));
        dispatch(stopContentLoading())
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

export const changePostsRequest = (filter) => async (dispatch, getState) => {
    console.log("changePostsRequest from thunk ", filter);
    dispatch(setPostsRequest(filter));
    dispatch(fetchPosts());

};