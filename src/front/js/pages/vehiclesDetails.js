import "../../styles/vehicles.css";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";


export const VehiclesDetails = (...props) => {

    const { store, actions } = useContext(Context);
    const navigate = useNavigate()
    !!store.vehicle ? null : navigate('/vehicles')
    
    useEffect(() => {
    }, [store.vehicle])
    return (
        <div className="container-fluid mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-4 col-sm-12">
                    <img className="img-fluid rounded" src={`https://starwars-visualguide.com/assets/img/vehicles/${!!store.vehicle ? store.vehicle.uid : "...Loading"}.jpg `}
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg";
                        }}></img>
                </div>
                <div className="col-lg-6 col-sm-auto my-auto">
                    <h1 className="mb-3 mt-2 text-warning">{!!store.vehicle ? store.vehicle.properties.name : "...Loading"}</h1>
                    <p className="p-description ms-md-5 ms-sm-0 fs-5">{!!store.vehicle ? store.vehicle.description : "...Loading"}</p>
                </div>
            </div>
            <hr className="text-warning" />
            <div className="row text-white justify-content-center">
                <div className="col-lg-3 col-sm-auto col-md-auto text-center my-5">
                    <label className="fs-3 fw-bold text-warning">Model</label>
                    <br />
                    <label className="fs-4">{!!store.vehicle ? store.vehicle.properties.model : "...Loading"}</label>
                </div>
                <div className="col-lg-3 col-sm-auto text-center my-5">
                    <label className="fs-3 fw-bold text-warning">Vehiclesehicle Class</label>
                    <br />
                    <label className="fs-4">{!!store.vehicle ? store.vehicle.properties.vehicle_class : "...Loading"}</label>
                </div>
                <div className="col-lg-3 col-sm-auto text-center my-5">
                    <label className="fs-3 fw-bold text-warning">Manufacturer</label>
                    <br />
                    <label className="fs-4">{!!store.vehicle ? store.vehicle.properties.manufacturer : "...Loading"}</label>
                </div>
                <div className="col-lg-3 col-sm-auto text-center my-5">
                    <label className="fs-3 fw-bold text-warning">Cost In Credits</label>
                    <br />
                    <label className="fs-4">{!!store.vehicle ? store.vehicle.properties.cost_in_credits : "...Loading"}</label>
                </div>
                <div className="col-lg-3 col-sm-auto text-center my-5">
                    <label className="fs-3 fw-bold text-warning">Length</label>
                    <br />
                    <label className="fs-4">{!!store.vehicle ? store.vehicle.properties.length : "...Loading"}</label>
                </div>
                <div className="col-lg-3 col-sm-auto text-center my-5">
                    <label className="fs-3 fw-bold text-warning">Crew</label>
                    <br />
                    <label className="fs-4">{!!store.vehicle ? store.vehicle.properties.crew : "...Loading"}</label>
                </div>
                <div className="col-lg-3 col-sm-auto text-center my-5">
                    <label className="fs-3 fw-bold text-warning">Passengers</label>
                    <br />
                    <label className="fs-4">{!!store.vehicle ? store.vehicle.properties.passengers : "...Loading"}</label>
                </div>
                <div className="col-lg-3 col-sm-auto text-center my-5">
                    <label className="fs-3 fw-bold text-warning">Max Atmosphering Speed</label>
                    <br />
                    <label className="fs-4">{!!store.vehicle ? store.vehicle.properties.max_atmosphering_speed : "...Loading"}</label>
                </div>
                <div className="col-lg-3 col-sm-auto text-center my-5">
                    <label className="fs-3 fw-bold text-warning">Cargo Capacity</label>
                    <br />
                    <label className="fs-4">{!!store.vehicle ? store.vehicle.properties.cargo_capacity : "...Loading"}</label>
                </div>
                <div className="col-lg-3 col-sm-auto text-center my-5">
                    <label className="fs-3 fw-bold text-warning">Consumables</label>
                    <br />
                    <label className="fs-4">{!!store.vehicle ? store.vehicle.properties.consumables : "...Loading"}</label>
                </div>
            </div>
        </div>
    )

}
export default VehiclesDetails