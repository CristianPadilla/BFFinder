import React, { useEffect } from "react";
import "styles/global.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "containers/Layout";
import RecoveryPassword from "containers/RecoveryPassword";
import PreHome from "pages/PreHome";
import SelectSpecie from "pages/SelectSpecie";
import Home from "pages/Home";
import NotFound from "pages/NotFound";
import Perfil from "pages/Perfil";
import Autenticacion from "pages/Autenticacion";
import Verpublicacion from "pages/ViewPost";
import { useDispatch, useSelector } from "react-redux";
import { CheckingAuth } from "../pages/auth/CheckingAuth";
import { logout, validateAuth } from "../store/auth";

const App = () => {

	const { status, token } = useSelector(state => state.persisted.auth);
	const dispatch = useDispatch();



	useEffect(() => {
		if (status === 'authenticated' || status === 'checking') dispatch(validateAuth({ tokenToValidate: token }));
	}, []);

	if (status === 'checking') {
		return <CheckingAuth />
	}


	return (

		<BrowserRouter>
			<Layout areClass={'Layout'} css={style.css} >
				<Routes>
					{
						(status === 'authenticated')
							? <Route path="/*" element={
								<Routes >
									<Route path="/home" element={<Home />} />
									<Route path="/*" element={<Navigate to="/home" />} />
									<Route path="/perfil" element={<Perfil />} />
									<Route path="/selecciona-especie" element={<SelectSpecie />} />
									<Route path="/ver-publicacion" element={<Verpublicacion />} />

								</Routes>
							} />
							: <Route path="/auth/*" element={
								<Routes >
									<Route path="/login" element={<Autenticacion />} />
									<Route path="/prehome" element={<PreHome />} />
								</Routes>
							} />
					}
					<Route path="/*" element={<Navigate to='/auth/login' />} />
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