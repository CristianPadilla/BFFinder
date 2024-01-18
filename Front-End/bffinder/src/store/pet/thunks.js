import { HttpStatusCode } from "axios";
import { petApi } from "../../api/petApi";
import { savingNewPet, setActivePet, setActivePetField, setActivePetFielsd, setBreeds, setErrorMessage, setLoadingTrue, setPetsPage, setPetsRequest, setSpecies } from "./petSlice";
import { startContentLoading, stopContentLoading } from "../global";
import { specieApi } from "../../api/specieApi";
import { breedApi } from "../../api/breedApi";
import { setBreedsP, setSpeciesP } from "../post";

export const startFetchPets = () => async (dispatch, getState) => {
    try {
        dispatch(startContentLoading())
        const petsRequest = getState().pets.petsRequest;
        const { userId } = getState().persisted.auth;
        if (!userId) throw new Error("No user id exists");

        const { data } = await petApi.post("/user/" + userId + "/filter", petsRequest);
        const { page, filters } = data;
        // console.log("finish startFetchPets from thunk ", data);
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
                gender: filters.gender,
                sort: page.sort[0].property,
                desc: page.sort[0].descending,
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

export const startAddNewPet = (pet) => async (dispatch, getState) => {
    const { userId } = getState().persisted.auth;

    dispatch(savingNewPet(true))
    const petToSave = {
        ...pet, ownerId: userId,
    }
    // console.log("startNewPet from thunk ", petToSave);

    const { data, status } = await petApi.post("/save", petToSave);
    // console.log("Finish savepet from thunk ", data, status);
    if (status !== HttpStatusCode.Created) dispatch(setErrorMessage(data));

    if (pet.image !== null) {
        // console.log("actualizando imagen de mascota ");
        dispatch(updatePetProfileImage(data.id, pet.image));

    };
    dispatch(setActivePet(null)); // no concluido
    dispatch(savingNewPet(false));
    dispatch(startFetchPets());
};


export const startUpdatePet = (pet) => async (dispatch, getState) => {

    dispatch(savingNewPet(true))
    // console.log("startUpdatePet from thunk ", pet);

    const { data, status } = await petApi.put("/update", pet);
    // console.log("Finish UpdatePet from thunk ", data, status);
    if (status !== HttpStatusCode.Ok) dispatch(setErrorMessage(data));

    if (pet.image !== null) {
        // console.log("actualizando imagen de mascota ");
        dispatch(updatePetProfileImage(data.id, pet.image));

    };
    dispatch(setActivePet(null));
    dispatch(savingNewPet(false));
    dispatch(startFetchPets());
};



export const updateActivePet = (fields) => async (dispatch, getState) => {
    fields.forEach(field => {
        console.log("actualizando campo de mascota ", field);
        dispatch(setActivePetField(field));
    });
};


export const startGetPetById = (id) => async (dispatch) => {
    dispatch(startContentLoading())
    const { data, status } = await petApi.get('/' + id);
    // console.log("startGetPetById ", data, status);
    if (status !== HttpStatusCode.Ok) dispatch(setErrorMessage(data));
    dispatch(setActivePet(data));// no concluido
    dispatch(stopContentLoading())
};

export const startGetSpecies = () => async (dispatch, getState) => {
    try {

        const { activeModule } = getState().persisted.global
        // const { token } = getState().persisted.auth
        // console.log("JJJJJJJJJJJJJJJJ ", specieApi.defaults);
        const { data, status } = await specieApi.get("/all");
        // console.log("startGetSpecies", data, status);
        if (status !== HttpStatusCode.Ok) dispatch(setErrorMessage(data));
        activeModule === "posts"
            ? dispatch(setSpeciesP(data))
            : dispatch(setSpecies(data));
    } catch (error) {
        // console.log("error startGetSpecies", error.config.headers);
        console.log("error startGetSpecies", error);

    }
};
export const getPetsByUserId = () => async (dispatch, getState) => {
    const { userId } = getState().persisted.auth;
    const { data, status } = await petApi.get('/owner/' + userId + '/unposted');
    if (status !== HttpStatusCode.Ok) dispatch(setErrorMessage(data));
    // console.log("pets pot usario ", data, status);
    return data;
};

export const startGetBreedsBySpecieId = (specieId,) => async (dispatch, getState) => {
    const { activeModule } = getState().persisted.global
    const { data, status } = await breedApi.get("/specie/" + specieId);
    // console.log("startGetBreedsBySpecieId", data, status);
    if (status !== HttpStatusCode.Ok) dispatch(setErrorMessage(data));
    activeModule === "posts"
        ? dispatch(setBreedsP(data))
        : dispatch(setBreeds(data));
};

export const updatePetProfileImage = (petId, imageBase64) => async (dispatch, getState) => {
    console.log("updatePetProfileImage ", petId, imageBase64);

    const formData = new FormData();
    const response = await fetch(imageBase64);
    const imageBlob = await response.blob();
    formData.append('image', imageBlob, 'image.jpg');

    const { data, status } = await petApi.put("/update/profile/" + petId, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });

    // console.log("updatePetProfileImage ", data, status);
    if (status !== HttpStatusCode.Ok) dispatch(setErrorMessage(data));
    // dispatch(setActivePet(data));
}







