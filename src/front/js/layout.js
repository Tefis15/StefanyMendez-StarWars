import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import BackToTopBtn from "./component/backToTop";
import Login from "./pages/login";
import Signin from "./pages/signin";
import ForgetPass from "./pages/forgetPass.js";
import { Profile } from "./pages/profile.js";
import People from "./pages/people.js";
import Planets from "./pages/planets";
import Vehicles from "./pages/vehicles.js";
import Starships from "./pages/starships.js";
import PeopleDetails from "./pages/peopleDetails.js";
import PlanetsDetails from "./pages/planetsDetails.js";
import StarshipsDetails from "./pages/starshipsDetails.js";
import VehiclesDetails from "./pages/vehiclesDetails.js";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Signin />} path="/signin" />
                        <Route element={<ForgetPass/>} path="/forgetpass" />
                        <Route element={<Profile/>} path="/profile" />
                        <Route element={<People/>} path="/people" />
                        <Route element={<Planets/>} path="/planets" />
                        <Route element={<Vehicles/>} path="/vehicles" />
                        <Route element={<Starships/>} path="/starships" />
                        <Route element={<PeopleDetails/>} path="/peopledetails" />
                        <Route element={<PlanetsDetails/>} path="/planetsdetails" />
                        <Route element={<StarshipsDetails/>} path="/starshipsdetails" />
                        <Route element={<VehiclesDetails/>} path="/vehiclesdetails" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    {/* <Footer /> */}
                </ScrollToTop>
                <BackToTopBtn/>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
