import React from "react";
import "styles/global.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "containers/Layout";
import RecoveryPassword from "containers/RecoveryPassword";
import PreHome from "pages/PreHome";
import Home from "pages/Home";
import NotFound from "pages/NotFound";
import Perfil from "pages/Perfil";
import Autenticacion from "../pages/Autenticacion";

const App = () => {
  return (
	<BrowserRouter>
		<Layout areClass={'Layout'} css = {style.css} >
			<Routes>
				<Route path="/" element={<PreHome />} />
				<Route path="/login" element={<Autenticacion/>} />
				<Route path="/perfil" element={<Perfil/>} />
				<Route path="/home" element={<Home/>} />
				<Route path="/recovery-password" element={<RecoveryPassword/>} />
				<Route path="*" element={<NotFound/>} />
			</Routes>
		</Layout>
	</BrowserRouter>
  );
}; 

const style = {
	css: {
		backgroundColor: "white",
	}
}

export default App;