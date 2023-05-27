import React from "react";
import "styles/global.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "containers/Layout";
import Login from "containers/Login";
import RecoveryPassword from "containers/RecoveryPassword";
import Home from "pages/Home";
import NotFound from "pages/NotFound";
import Perfil from "pages/Perfil";

const App = () => {
  return (
	<BrowserRouter>
		<Layout>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login/>} />
				<Route path="/perfil" element={<Perfil/>} />
				<Route path="/recovery-password" element={<RecoveryPassword/>} />
				<Route path="*" element={<NotFound/>} />
			</Routes>
		</Layout>
	</BrowserRouter>
  );
}; 

export default App;