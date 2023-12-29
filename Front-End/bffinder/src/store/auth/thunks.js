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
            // const userRegisterReq = type === 'u'
            //     ? { firstname: us.firstname, lastname: us.lastname, phone: us.phone, email: us.email, password: us.password }
            //     : { name: us.name, email: us.email, password: us.password, nit: us.nit, commercial_registration_number: us.commercial_registration_number };
            const userRegisterReq = us;

            // const us = {
            //     name,
            //     email,
            //     password,
            //     nit,
            //     commercial_registration_number
            // };

            console.log("holaquetallc ", type)
            dispatch(checkingCredentials())
            const url = "/register" + (type === 's' ? "/shelter" : "");
            console.log("url ", url)
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


export const startGoogleSignIn = () =>
    async (dispatch, getState) => {
        dispatch(checkingCredentials())

    }