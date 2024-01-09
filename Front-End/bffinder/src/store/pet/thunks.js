import { HttpStatusCode } from "axios";
import { petApi } from "../../api/petApi";
import { savingNewPet, setActivePet, setErrorMessage, setLoadingTrue, setPetsPage, setPetsRequest } from "./petSlice";
import { startContentLoading, stopContentLoading } from "../global";

export const startFetchPets = () => async (dispatch, getState) => {
    try {
        dispatch(startContentLoading())
        const petsRequest = getState().pets.petsRequest;
        const { userId } = getState().persisted.auth;
        if (!userId) throw new Error("No user id exists");

        const { data } = await petApi.post("/user/" + userId + "/filter", petsRequest);
        const { page, filters } = data;
        console.log("startFetchPets from thunk ", data);
        dispatch(setPetsPage({

            page: {
                pageNumber: page.number,
                pageSize: page.size,
                numberOfElements: page.numberOfElements,
                totalPages: page.totalPages,
                totalElements: data.totalElements,
                offset: page.pageable.offset,
                last: page.last,
                first: page.first,
                sort: page.sort[0].property,
                desc: page.sort[0].descending,
                pets: page.content,
            },
            petsRequest: {
                search: filters.search,
                size: filters.size,
                specie_id: filters.specie_id,
                breed_id: filters.breed_id,
                age: filters.age,
                gender: filters.gender,
                vaccinated: filters.vaccinated,
                sterilized: filters.sterilized,
                dewormed: filters.dewormed,
                posted: filters.posted,
                sort: filters.sort,
                desc: filters.desc,
                page: filters.page,
                page_size: filters.page_size,
            },
        }

        ));
        dispatch(stopContentLoading())
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }

};


export const changePetsRequest = (filters) => async (dispatch, getState) => {
    filters.forEach(filter => {
        console.log("aplicando filtro ", filter);
        dispatch(setPetsRequest(filter));
    });
    dispatch(startFetchPets());
};

export const startAddNewPet = () => async (dispatch, getState) => {

    dispatch(savingNewPet())
    const { userId } = getState().persisted.auth;
    console.log("startNewPet from thunk ", userId);
    const { data, status } = await petApi.post("/save", newPet);
    console.log(data, status);
    if (status !== HttpStatusCode.Created) dispatch(setErrorMessage(data));
    dispatch(startFetchPets());
    dispatch(setActivePet(data)); // no concluido
};

export const startGetPetById = (id) => async (dispatch) => {
    const { data, status } = await petApi.get("/pet/" + id);
    console.log("startGetPetById", data, status);
    if (status !== HttpStatusCode.Ok) dispatch(setErrorMessage(data));
    dispatch(setActivePet(data));// no concluido
};
