import React, { useEffect } from "react";
import "styles/global.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "containers/Layout";
import RecoveryPassword from "containers/RecoveryPassword";
import PreHome from "pages/PreHome";
import Home from "pages/Home";
import NotFound from "pages/NotFound";
import Account from "../pages/Account";
import Perfil from "pages/Perfil";
import Autenticacion from "pages/Autenticacion";
import Verpublicacion from "pages/ViewPost";
import { useDispatch, useSelector } from "react-redux";
import { CheckingAuth } from "../pages/auth/CheckingAuth";
import { logout, validateAuth } from "../store/auth";
import { setAuthToken } from "../api";
import { use } from "i18next";
import axios from "axios";
import { setLocation } from "../store/global";


const MAPS_API_KEY = "AIzaSyCsrzjwPXU2CiwIfW4KmCXz5RklPHQ5TQ8";
const App = () => {
	const { status, token } = useSelector(state => state.persisted.auth);
	const dispatch = useDispatch();



	useEffect(() => {
		if (status === 'authenticated' || status === 'checking') dispatch(validateAuth({ tokenToValidate: token }));




		if (navigator.geolocation && status === 'authenticated') {
			navigator.geolocation.getCurrentPosition(async (position) => {
				try {
					const latitude = position.coords.latitude;
					const longitude = position.coords.longitude;
					// const latitude = 4.7110; // simulacion de ubicacion bogota
					// const longitude = -74.0721;
					// console.log(`Latitude: ${latitude} °, Longitude: ${longitude} °`);
					const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${MAPS_API_KEY}`);

					const locationInfo = response.data.results[0].address_components;
					const city = locationInfo.find(component => component.types.includes('locality')).long_name;
					const department = locationInfo.find(component => component.types.includes('administrative_area_level_1')).long_name;
					
					dispatch(setLocation({ city, department }));
					console.log(`City: ${city}, Department: ${department}`);
				} catch (error) {
					console.error('Error getting location info:', error);
				}
			});
		} else {
			console.log("Geolocation is not supported by this browser.");
		}


	}, []);


	useEffect(() => {
		setAuthToken(token);
	}, [token]);


	if (status === 'checking') {
		return <CheckingAuth />
	}

	setAuthToken(token);
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
									<Route path="/ver-publicacion/:id" element={<Verpublicacion />} />
									<Route path="/account" element={<Account />} />
								</Routes>
							} />
							: <Route path="/*" element={
								<Routes >
									<Route path="/auth/login" element={<Autenticacion />} />
									<Route path="/prehome" element={<PreHome />} />
									<Route path="/*" element={<Navigate to='/auth/login' />} />
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