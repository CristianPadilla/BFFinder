import { postApi } from "../../api/postApi";
import { fetchPostsStart, fetchPostsSuccess } from "./postSlice";


export const fetchPosts = (page = 0, request = {}) => async (dispatch, getState) => {
    try {
    const { filters } = request;
    dispatch(fetchPostsStart());
    const { data } = await postApi.post("/all/filter", request);

    dispatch(fetchPostsSuccess({

        posts: data.content,
        pageable: {
            pageNumber: data.number,
            pageSize: data.size,
            numberOfElements: data.numberOfElements,
            totalPages: data.totalPages,
            totalElements: data.totalElements,
            offset: data.pageable.offset,
            last: data.last,
            first: data.first,
            sort: {
                sort: data.sort.property,
                desc: data.sort.descending,
            },
        }
    }));
    } catch (error) {
        console.log(error);
        // dispatch(fetchPostsFailure(error.message));
    }
};