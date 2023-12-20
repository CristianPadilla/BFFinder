import React from "react";
import "styles/global.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "containers/Layout";
import RecoveryPassword from "containers/RecoveryPassword";
import PreHome from "pages/PreHome";
import SelectSpecie from "pages/SelectSpecie";
import Home from "pages/Home";
import NotFound from "pages/NotFound";
import Perfil from "pages/Perfil";
import Autenticacion from "pages/Autenticacion";
import Ejemplo from "pages/Ejemplo";
import Verpublicacion from "pages/ViewPost";

const App = () => {
  return (
	<BrowserRouter>
		<Layout areClass={'Layout'} css = {style.css} >
			<Routes>
				<Route path="/" element={<PreHome />} />
				<Route path="/login" element={<Autenticacion/>} />
				<Route path="/perfil" element={<Perfil/>} />
				<Route path="/selecciona-especie" element={<SelectSpecie/>} />
				<Route path="/home" element={<Home/>} />
				<Route path="/ver-publicacion" element={<Verpublicacion/>} />
				<Route path="/ejemplo" element={<Ejemplo/>} />
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