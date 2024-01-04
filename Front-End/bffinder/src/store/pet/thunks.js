import { petApi } from "../../api/petApi";
import { fetchPetsStart, fetchPetsSuccess } from "./petSlice";

export const fetchPets = (page = 0, request = {}) => async (dispatch, getState) => {
    console.log("fetchPets thunk");
    // try {
    const request = {
        search: "", // search por nombre mascota
        //"size": "s", // l, m , s
        //"specie_id": 1,
        //"breed_id": 1,
        //"age": 5,
        //"vaccinated": false,
        //"sterilized": null,
        //"dewormed": true,
        //"posted": true, //
        //"sort": "name", // name, age,
        //"desc": true,
        //"gender": 'f',

        page: 0,
        page_size: 10
    };
    dispatch(fetchPetsStart());
    try {
        const { data } = await petApi.post("/user/52/filter", request);

        dispatch(fetchPetsSuccess({

            pets: data.content,
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
        console.log("error: ", error);  
        // dispatch(fetchPostsFailure(error.message));
    }
};