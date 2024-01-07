import { postApi } from "../../api/postApi";
import { fetchPostsStart, fetchPostsSuccess, setPostsRequest } from "./postSlice";


export const fetchPosts = () => async (dispatch, getState) => {
    try {
        console.log("fetchinggg Posts from thunk ");
        dispatch(fetchPostsStart());
        const { userId, role } = getState().persisted.auth;
        const postsRequest = getState().posts.postRequest;
        const url = role === "u"
            ? "/all/filter"
            : `/user/${userId}/filter`;
        console.log("REQUERSTTTTT ", postsRequest);
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
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

export const changePostsRequest = (filter) => async (dispatch, getState) => {
    console.log("changePostsRequest from thunk ", filter);
    // dispatch(setLoadingTrue())
    dispatch(setPostsRequest(filter));
    dispatch(fetchPosts());

};