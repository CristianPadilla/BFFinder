import { HttpStatusCode } from "axios";
import { locationApi } from "../../api/locationApi";
import { postApi } from "../../api/postApi";
import { startContentLoading, stopContentLoading } from "../global";
import { fetchPostsStart, fetchPostsSuccess, setActivePost, setCities, setCityIdFilter, setDepartments, setPostsRequest } from "./postSlice";


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
        console.log("fetchPosts from thunk ", data);
        const payload = {

            page: {
                pageNumber: page.number,
                pageSize: page.size,
                numberOfElements: page.numberOfElements,
                totalPages: page.totalPages,
                totalElements: page.totalElements,
                offset: page.pageable.offset,
                last: page.last,
                first: page.first,
                sort: page.sort[0].property,
                desc: page.sort[0].descending,
                posts: page.content,

            },
            postRequest: {
                search: request.search,
                filters: {
                    from_date: request.filters.from_date,
                    specie_id: request.filters.specie_id,
                    breed_id: request.filters.breed_id,
                    size: request.filters.size,
                    department_id: request.filters.department_id,
                    city_id: request.filters.city_id,
                    gender: request.filters.gender,
                    age: request.filters.age,
                    status: request.filters.status,
                },
                sorting: {
                    sort: page.sort[0].property,
                    desc: page.sort[0].descending
                },
                page: request.page,
                page_size: request.page_size,
            }

        }
        dispatch(fetchPostsSuccess(payload));
        dispatch(stopContentLoading())
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

export const changePostsRequest = (filters) => async (dispatch, getState) => {
    filters.forEach(filter => {
        console.log("aplicando filtro ", filter);
        dispatch(setPostsRequest(filter));
    });
    dispatch(fetchPosts());

};

export const startGetDepartments = () => async (dispatch) => {
    const { data, status } = await locationApi.get("/department/all");
    console.log("startGetDepartments", data, status);
    if (status !== HttpStatusCode.Ok) dispatch(setErrorMessage(data));
    dispatch(setDepartments(data));
};

export const startGetCitiesByDepartmentId = (departmentId) => async (dispatch) => {
    const { data, status } = await locationApi.get("/department/" + departmentId + "/cities");
    console.log("startGetCitiesByDepartmentId", data, status);
    if (status !== HttpStatusCode.Ok) dispatch(setErrorMessage(data));
    dispatch(setCities(data));
};

export const startCleanCities = () => async (dispatch) => {
    console.log("startCleanCities");
    dispatch(setCities([]));
    dispatch(setCityIdFilter(0));
};

export const startGetPostById = (id) => async (dispatch) => {
    dispatch(startContentLoading())
    const { data, status } = await postApi.get('/' + id);
    // console.log("startGetPostById ", data, status);
    if (status !== HttpStatusCode.Ok) dispatch(setErrorMessage(data));
    dispatch(setActivePost(data));
    dispatch(stopContentLoading())
};

export const startReassignPetOfPost = (postId, petId) => async (dispatch) => {
    // dispatch(startContentLoading())
    // const { data, status } = await postApi.put('/' + id + '/update-description', description);
    // // console.log("startUpdatePostDescription ", data, status);
    // if (status !== HttpStatusCode.Ok) dispatch(setErrorMessage(data));
    // dispatch(setActivePost(data));
    // dispatch(stopContentLoading())
}

export const startUpdatePostDescription = (id, description) => async (dispatch) => {
    // dispatch(startContentLoading())
    // const { data, status } = await postApi.put('/' + id + '/update-description', description);
    // // console.log("startUpdatePostDescription ", data, status);
    // if (status !== HttpStatusCode.Ok) dispatch(setErrorMessage(data));
    // dispatch(setActivePost(data));
    // dispatch(stopContentLoading())
}

export const startUpdatePostImages = (postId, images) => async (dispatch) => {
    console.log("startUploadPostImages ", postId, images);
    // dispatch(startContentLoading())
    // const { data, status } = await postApi.post('/' + id + '/upload-images', images);
    // // console.log("startUploadPostImages ", data, status);
    // if (status !== HttpStatusCode.Ok) dispatch(setErrorMessage(data));
    // dispatch(setActivePost(data));
    // dispatch(stopContentLoading())
}