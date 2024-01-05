import { postApi } from "../../api/postApi";
import { fetchPostsStart, fetchPostsSuccess } from "./postSlice";


export const fetchPosts = (page = 0, filtersRequest = {}) => async (dispatch, getState) => {
    try {
        const { filters } = filtersRequest;
        dispatch(fetchPostsStart());
        const { data } = await postApi.post("/all/filter", filtersRequest);
        const { page, request } = data;
        console.log("fetchPosts=== ", request);
        dispatch(fetchPostsSuccess({

            posts: page.content,
            pageable: {
                pageNumber: page.number,
                pageSize: page.size,
                numberOfElements: page.numberOfElements,
                totalPages: page.totalPages,
                totalElements: page.totalElements,
                offset: page.pageable.offset,
                last: page.last,
                first: page.first,
                sort: {
                    sort: page.sort.property,
                    desc: page.sort.descending,
                },
            }
        }));
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};