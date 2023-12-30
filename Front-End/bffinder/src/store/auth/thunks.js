import { Http } from "@mui/icons-material"
import { authApi } from "../../api/authApi"
import { checkingCredentials, login, logout } from "./"
import { HttpStatusCode } from "axios"

export const checkingAuthentication = (email, password) =>
    async (dispatch, getState) => {
        dispatch(checkingCredentials())

    }

export const startRegisterUser = (us) =>
    async (dispatch, getState) => {

        try {
            console.log("1111111111 ", us)

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

//create a for login
export const startLogin = ({ email, password }) =>
    async (dispatch, getState) => {

        console.log("en el thunkkk ", email, password)
        dispatch(checkingCredentials())
        try {
            const { status, data } = await authApi.post("/authenticate", { username: email, password })
            if (!status === HttpStatusCode.Ok) return dispatch(logout({ errorMessage: data.message }))

            console.log("data ", status, data)
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


export const startGoogleSignIn = () =>
    async (dispatch, getState) => {
        dispatch(checkingCredentials())

    }