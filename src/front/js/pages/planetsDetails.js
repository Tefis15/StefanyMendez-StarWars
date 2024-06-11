import "../../styles/planets.css";
import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";


export const PlanetsDetails = (...props) => {

    const { store, actions } = useContext(Context);
    const navigate = useNavigate()
    !!store.planet ? null : navigate('/planets')

    useEffect(() => {
    }, [store.planet])
    return (
        <div className="container-fluid mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-4 col-sm-12">
                    <img className="img-fluid rounded" src={`https://starwars-visualguide.com/assets/img/planets/${!!store.planet ? store.planet.uid : "...Loading"}.jpg `}
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg";
                        }}></img>
                </div>
                <div className="col-lg-6 col-sm-auto my-auto">
                    <h1 className="mb-3 mt-2 text-warning">{!!store.planet ? store.planet.properties.name : "...Loading"}</h1>
                    <p className="p-description ms-md-5 ms-sm-0 fs-5">{!!store.planet ? store.planet.description : "...Loading"}</p>
                </div>
            </div>
            <hr className="text-warning" />
            <div className="row text-white justify-content-center">
                <div className="col-lg-3 col-sm-auto col-md-auto text-center my-5">
                    <label className="fs-3 fw-bold text-warning">Diameter</label>
                    <br />
                    <label className="fs-4">{!!store.planet ? store.planet.properties.diameter : "...Loading"}</label>
                </div>
                <div className="col-lg-3 col-sm-auto text-center my-5">
                    <label className="fs-3 fw-bold text-warning">Rotation Period</label>
                    <br />
                    <label className="fs-4">{!!store.planet ? store.planet.properties.rotation_period : "...Loading"}</label>
                </div>
                <div className="col-lg-3 col-sm-auto text-center my-5">
                    <label className="fs-3 fw-bold text-warning">Orbital Period</label>
                    <br />
                    <label className="fs-4">{!!store.planet ? store.planet.properties.orbital_period : "...Loading"}</label>
                </div>
                <div className="col-lg-3 col-sm-auto text-center my-5">
                    <label className="fs-3 fw-bold text-warning">Gravity</label>
                    <br />
                    <label className="fs-4">{!!store.planet ? store.planet.properties.gravity : "...Loading"}</label>
                </div>
                <div className="col-lg-3 col-sm-auto text-center my-5">
                    <label className="fs-3 fw-bold text-warning">Population</label>
                    <br />
                    <label className="fs-4">{!!store.planet ? store.planet.properties.population : "...Loading"}</label>
                </div>
                <div className="col-lg-3 col-sm-auto text-center my-5">
                    <label className="fs-3 fw-bold text-warning">Climate</label>
                    <br />
                    <label className="fs-4">{!!store.planet ? store.planet.properties.climate : "...Loading"}</label>
                </div>
                <div className="col-lg-3 col-sm-auto text-center my-5">
                    <label className="fs-3 fw-bold text-warning">Terrain</label>
                    <br />
                    <label className="fs-4">{!!store.planet ? store.planet.properties.terrain : "...Loading"}</label>
                </div>
                <div className="col-lg-3 col-sm-auto text-center my-5">
                    <label className="fs-3 fw-bold text-warning">Surface Water</label>
                    <br />
                    <label className="fs-4">{!!store.planet ? store.planet.properties.surface_water : "...Loading"}</label>
                </div>
            </div>
        </div>
    )

}
export default PlanetsDetails