import React from "react";
import { useState } from "react";
import { RegisterUserPage } from "../pages/RegisterUserPage";
import RegisterFoundationPage from "../pages/RegisterFoundationPage";

export default function SignUp() {
  const [selectedRole, setSelectedRole] = useState("user");

  // const [register, setRegister] = useState({
  //   firstname: "",
  //   lastname: "",
  //   email: "",
  //   password: "",
  //   confirmPassword: "",
  // });

  // const handleChange = (e) => {
  //   setRegister({ ...register, [e.target.name]: e.target.value });
  // };

  return (
    <>
      <div>
        <h2 className="titulo">Registrarse</h2>
        <button onClick={() => setSelectedRole("user")}>Usuario Regular</button>
        <button onClick={() => setSelectedRole("foundation")}>
          Administrador
        </button>
      </div>

      {selectedRole === "user" ? (
        <RegisterUserPage />
      ) : (
        <RegisterFoundationPage />
      )}
    </>
  );
}
