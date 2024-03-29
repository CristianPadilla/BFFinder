import { Http } from "@mui/icons-material"
import { authApi } from "../../api/authApi"
import { checkingCredentials, login, logout } from "./"
import { HttpStatusCode } from "axios"
import { clearPostsLogout } from "../post"
import { clearGlobalLogout, setActiveModule } from "../global"
import { clearPetsLogout } from "../pet"
import { clearQuestionsLogout } from "../questions"

export const checkingAuthentication = (email, password) =>
    async (dispatch, getState) => {
        dispatch(checkingCredentials())

    }

export const startRegisterUser = (us) =>
    async (dispatch, getState) => {

        try {

            const type = us.type;
            const userRegisterReq = us;

            dispatch(checkingCredentials())
            const url = "/register" + (type === 's' ? "/shelter" : "");
            const { status, data } = await authApi.post(url, userRegisterReq)
            if (!status === HttpStatusCode.Created) return dispatch(logout())

            const { user } = data
            const sent = {
                token: data.token,
                userId: user.userId,
                name: user.name,
                lastname: user.lastname || null,
                email: user.email,
                photoUrl: user.photoUrl,
                role: user.role
            }
            dispatch(login(sent))


        } catch (error) {
            const errorMessage = error.response.data.message
            dispatch(logout({ errorMessage }))
        }


    }


export const startLogin = ({ email, password }) =>
    async (dispatch, getState) => {

        dispatch(checkingCredentials())
        try {
            const { status, data } = await authApi.post("/authenticate", { username: email, password })
            if (!status === HttpStatusCode.Ok) return dispatch(logout({ errorMessage: data.message }))
            // console.log("GGGGGGGGGGGGG ", data)
            const { user } = data
            const sent = {
                token: data.token,
                userId: user.userId,
                name: user.name,
                lastname: user.lastname || null,
                email: user.email,
                photoUrl: user.photoUrl,
                role: user.role,
                shelterEnabled: user.shelterEnabled
            }
            dispatch(setActiveModule({ module: user.role === "u" ? "posts" : "pets" }))
            dispatch(login(sent))

        } catch (error) {
            const errorMessage = error.response.data.message
            dispatch(logout({ errorMessage }))
        }
    }


export const startGoogleSignIn = () =>
    async (dispatch, getState) => {
        dispatch(checkingCredentials())

    }

export const startLogout = (error) =>
    async (dispatch, getState) => {
        dispatch(checkingCredentials())
        setTimeout(() => {
            dispatch(clearPostsLogout())
            dispatch(clearPetsLogout())
            dispatch(clearGlobalLogout())
            dispatch(clearQuestionsLogout())
            dispatch(logout(error?.message))

        }, 1000);
    }


export const validateAuth = ({ tokenToValidate }) =>
    async (dispatch, getState) => {
        dispatch(checkingCredentials())
        try {
            if (tokenToValidate === null) return dispatch(logout())
            const { status, data } = await authApi.get("/validate", { headers: { Authorization: `Bearer ${tokenToValidate}` } })
            if (!status === HttpStatusCode.Ok) return dispatch(logout({ errorMessage: data.message }))

            const { userId, name, lastname, email, photoUrl, role, shelterEnabled } = data.user
            dispatch(login({ token: tokenToValidate, userId, name, lastname, email, photoUrl, role, shelterEnabled }))

        } catch (error) {
            const errorMessage = error.response.data.message
            dispatch(logout({ errorMessage }))
        }

    }