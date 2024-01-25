import { get } from "react-scroll/modules/mixins/scroller"
import { setActiveModule, startContentLoading, stopContentLoading } from "./globalSlice"
import { specieApi } from "../../api/specieApi"
import { setErrorMessage } from "../pet"
import { HttpStatusCode } from "axios"
import { breedApi } from "../../api/breedApi"
import { userApi } from "../../api/userApi"

export const changeActiveModule = ({ module }) =>
    async (dispatch, getState) => {
        if (module === getState().persisted.global.activeModule) return
        dispatch(setActiveModule({ module }))

    }

export const getSpecies = () => async (dispatch, getState) => {

    const { data, status } = await specieApi.get("/all");
    // console.log("getSpecies", data, status);
    if (status !== HttpStatusCode.Ok) dispatch(setErrorMessage(data));
    return data;
};

export const getBreedsBySpecieId = (specieId) => async (dispatch, getState) => {
    const { data, status } = await breedApi.get("/specie/" + specieId);
    if (status !== HttpStatusCode.Ok) dispatch(setErrorMessage(data));
    return data;
};

export const startGetLoggedUserInformation = () => async (dispatch, getState) => {
    console.log("startGetLoggedUserInformation");
    // dispatch(startContentLoading());
    const { userId } = getState().persisted.auth;
    const { data, status } = await userApi.get("/" + userId);
    if (status !== HttpStatusCode.Ok) dispatch(setErrorMessage(data));
    // dispatch(stopContentLoading());
    return data;
}