import { HttpStatusCode } from "axios";
import { petApi } from "../../api/petApi";
import { savingNewPet, setActivePet, setErrorMessage, setPetsPage } from "./petSlice";

export const startFetchPets = (petsRequest) => async (dispatch, getState) => {
    try {
        console.log("startFetchPets from thunk ", petsRequest);
        const { userId } = getState().persisted.auth;
        if (!userId) throw new Error("No user id exists");
        const { data } = await petApi.post("/user/" + userId + "/filter", petsRequest);
        const { page, filters } = data;

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
            }
        }

        ));
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }

    // console.log("finish from thunk ", data);
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
