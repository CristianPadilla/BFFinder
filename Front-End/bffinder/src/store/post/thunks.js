import { HttpStatusCode } from "axios";
import { locationApi } from "../../api/locationApi";
import { postApi } from "../../api/postApi";
import { startContentLoading, stopContentLoading } from "../global";
import { fetchPostsStart, fetchPostsSuccess, setActivePost, setCities, setCityIdFilter, setDepartments, setIsSaving, setPostsRequest } from "./postSlice";
import { setErrorMessage } from "../pet";


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
        // console.log("fetchPosts from thunk ", data);
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
        dispatch(setPostsRequest(filter));
    });
    dispatch(fetchPosts());

};

export const startGetDepartments = () => async (dispatch) => {
    const { data, status } = await locationApi.get("/department/all");
    // console.log("startGetDepartments", data, status);
    if (status !== HttpStatusCode.Ok) dispatch(setErrorMessage(data));
    dispatch(setDepartments(data));
};

export const startGetCitiesByDepartmentId = (departmentId) => async (dispatch) => {
    const { data, status } = await locationApi.get("/department/" + departmentId + "/cities");
    // console.log("startGetCitiesByDepartmentId", data, status);
    if (status !== HttpStatusCode.Ok) dispatch(setErrorMessage(data));
    dispatch(setCities(data));
};

export const startCleanCities = () => async (dispatch) => {
    // console.log("startCleanCities");
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

export const startUpdatePost = (post) => async (dispatch, getState) => {
    dispatch(stopContentLoading())
    dispatch(setIsSaving(true))
    const currentPost = getState().posts.active;
    // console.log("startUpdatePost from thunk ", currentPost);

    if (currentPost.description !== post.description) {
        dispatch(startUpdatePostDescription(currentPost.id, post.description));
    }

    if (post.petId !== currentPost.petResponse.id) {
        dispatch(startReassignPetOfPost(currentPost.id, post.petId));
    }

    if (post.images.length > 0) {
        await dispatch(startCleanPostImages(currentPost.id));
        const imagesUploadPromises = [];
        for (const image of post.images) {
            // console.log("GGGGGGGGGGGGGGG  ", image);
            imagesUploadPromises.push(dispatch(startUpdatePostImage(currentPost.id, image)));
        }
        const urls = await Promise.all(imagesUploadPromises);
        // console.log("urls ", urls);
    }

    dispatch(setActivePost(null));
    dispatch(setIsSaving(false));
    dispatch(stopContentLoading())
    dispatch(fetchPosts());
}

export const startUpdatePostImage = (postId, image) => async (dispatch) => {
    // console.log("startUploadPostImages ", postId, image);

    const formData = new FormData();
    const response = await fetch(image.data);
    const imageBlob = await response.blob();
    formData.append('image', imageBlob, image.name);
    const { data, status } = await postApi.post(postId + "/image", formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });

    if (status !== HttpStatusCode.Ok) throw new Error("Error al subir la imagen " + image.name);
    return data.imageUrl;
}

export const startCreatePost = (post) => async (dispatch, getState) => {
    dispatch(stopContentLoading())
    dispatch(setIsSaving(true))
    // console.log("startCreatePost from thunk ", post.images);
    const { userId } = getState().persisted.auth;
    const postToCreate = {
        userId: userId,
        adoptionPostRequest: {
            description: post.description,
            petId: post.petId,
        }
    }
    const { data, status } = await postApi.post('/save', postToCreate);

    if (status !== HttpStatusCode.Created) {
        console.log("Error al crear la publicacion ", data);
        dispatch(setErrorMessage(data));
        throw new Error("Error al crear la publicacion ");
    }
    
    if (post.images.length > 0) {
        const imagesUploadPromises = [];
        for (const image of post.images) {
            imagesUploadPromises.push(dispatch(startUpdatePostImage(data.id, image)));
        }
        const urls = await Promise.all(imagesUploadPromises);
        // console.log("urls ", urls);
    }

    dispatch(setActivePost(null));
    dispatch(stopContentLoading())
    dispatch(setIsSaving(false))
    dispatch(fetchPosts());
}

export const startReassignPetOfPost = (postId, petId) => async (dispatch) => {
    const { data, status } = await postApi.put('/update/pet/' + postId + '/' + petId);
    if (status !== HttpStatusCode.Ok) dispatch(setErrorMessage("Error al reasignar la mascota de la publicacion"));

}

export const startUpdatePostDescription = (postId, description) => async (dispatch) => {
    const { data, status } = await postApi.put('/update/description', { id: postId, description: description });
    // console.log("startUpdatePostDescription ", data, status);
    if (status !== HttpStatusCode.Ok) dispatch(setErrorMessage("Error al actualizar la descripción de la publicacion"));
}


export const startCleanPostImages = (postId) => async (dispatch) => {
    const { data, status } = await postApi.delete('/image/clean/' + postId);
    if (status !== HttpStatusCode.NoContent) dispatch(setErrorMessage("Error al actualizar la descripción de la publicacion"));
}

export const startChangePostStatus = (postId, statusToSet) => async (dispatch) => {
    console.log("startChangePostStatus ", postId, statusToSet);

    let response;
    if (statusToSet === "enable") {
        response = await postApi.put('/enable/' + postId);

    } else if (statusToSet === "disable") {
        response = await postApi.put('/disable/' + postId);
    }
    const { status, data } = response;
    if (status !== HttpStatusCode.Ok) dispatch(setErrorMessage("Error al deshabilitar la publicacion"));

    dispatch(setActivePost(null));
    dispatch(changePostsRequest([{ page: 0 }]))
    dispatch(fetchPosts());
}