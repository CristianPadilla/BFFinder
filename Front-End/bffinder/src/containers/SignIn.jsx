import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function SignIn() {

    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    })
    const [token, setToken] = useState("");

    // const handleChange = (e) => {
    //     setCredentials({
    //         ...credentials,
    //         [e.target.name]: e.target.value
    //     })
    // }

     //login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
        console.log('entra try ' + credentials.username);
      const response = await axios.post(
        "http://localhost:9090/auth/authenticate",
        {
          username: credentials.username,
          password: credentials.password,
        }
      );
      console.log('despues petición');
      // Aqu铆 puedes manejar la respuesta de la API, como almacenar el token de autenticaci贸n en el estado de tu aplicaci贸n.
      setToken(response.data.token);
      navigate("/home");

    } catch (error) {
        console.log('entra catch');
      if (error.response && error.response.status === 404) {
        // setAlertMessage("El usuario no se encuentra registrado en el sistema");
      }
      if (error.response && error.response.status === 403) {
        // setAlertMessage("Por favor, llene todos los campos");
      } else {
        // setAlertMessage(
        //   "El correo electr贸nico o la contrase帽a son incorrectas"
        // );
      }
    //   setOpen(true);
      console.error(error);
    }
  };


    return <form className="sign-in-form" onSubmit={handleLogin}>
        <h2 className="titulo">Iniciar Sesión</h2>

        <div className="input-field">
            <i className="fas fa-user" />
            <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                placeholder="ejemplo@mail.com"
            />
        </div>

        <div className="input-field">
            <i className="fas fa-lock" />
            <input
                type="password"
                placeholder="******"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
        </div>

        <input
            id="sign-in-btn"
            type="submit"
            value="Iniciar Sesión"
            className="btn"
        />

        <p className="social-text">O Ingresa con Google</p>

        <div className="social-media">
            <button type="button" className="googlebutton">
                Iniciar sesión con Google
            </button>
        </div>
    </form>
}
