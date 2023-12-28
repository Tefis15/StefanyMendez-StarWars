import "../../styles/vehicles.css";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";


export const VehiclesDetails = (...props) => {

    const { store, actions } = useContext(Context);

    return (
        <div className="container-fluid mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-4 col-sm-12">
                    <img className="img-fluid rounded" src={`https://starwars-visualguide.com/assets/img/vehicles/6.jpg `}
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg";
                        }}></img>
                </div>
                <div className="col-lg-6 col-sm-auto my-auto">
                    <h1 className="mb-3 mt-2 text-warning">Luke {/* {!!store.idCharacter ? store.idCharacter.name : "...Loading"} */}</h1>
                    <p className="p-description ms-md-5 ms-sm-0 fs-5">Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. </p>
                </div>
            </div>
            <hr className="text-warning" />
            <div className="row text-white justify-content-center">
                <div className="col-lg-3 col-sm-auto col-md-auto text-center my-5">
                    <label className="fs-3 fw-bold text-warning">Model</label>
                    <br />
                    <label className="fs-4">67654{/* {!!store.idCharacter ? store.idCharacter.birth_year : "...Loading"} */}</label>
                </div>
                <div className="col-lg-3 col-sm-auto text-center my-5">
                    <label className="fs-3 fw-bold text-warning">Class</label>
                    <br />
                    <label className="fs-4">{/* {!!store.idCharacter ? store.idCharacter.gender : "...Loading"} */}</label>
                </div>
                <div className="col-lg-3 col-sm-auto text-center my-5">
                    <label className="fs-3 fw-bold text-warning">Manufacturer</label>
                    <br />
                    <label className="fs-4">{/* {!!store.idCharacter ? store.idCharacter.mass : "...Loading"} */}</label>
                </div>
                <div className="col-lg-3 col-sm-auto text-center my-5">
                    <label className="fs-3 fw-bold text-warning">Cost in Credits</label>
                    <br />
                    <label className="fs-4">{/* {!!store.idCharacter ? store.idCharacter.height : "...Loading"} */}</label>
                </div>
                <div className="col-lg-3 col-sm-auto text-center my-5">
                    <label className="fs-3 fw-bold text-warning">Lenght</label>
                    <br />
                    <label className="fs-4">{/* {!!store.idCharacter ? store.idCharacter.skin_color : "...Loading"} */}</label>
                </div>
                <div className="col-lg-3 col-sm-auto text-center my-5">
                    <label className="fs-3 fw-bold text-warning">Crew</label>
                    <br />
                    <label className="fs-4">{/* {!!store.idCharacter ? store.idCharacter.eye_color : "...Loading"} */}</label>
                </div>
                <div className="col-lg-3 col-sm-auto text-center my-5">
                    <label className="fs-3 fw-bold text-warning">Passengers</label>
                    <br />
                    <label className="fs-4">{/* {!!store.idCharacter ? store.idCharacter.eye_color : "...Loading"} */}</label>
                </div>
                <div className="col-lg-3 col-sm-auto text-center my-5">
                    <label className="fs-3 fw-bold text-warning">Max Atmosphering Speed</label>
                    <br />
                    <label className="fs-4">{/* {!!store.idCharacter ? store.idCharacter.eye_color : "...Loading"} */}</label>
                </div>
                <div className="col-lg-3 col-sm-auto text-center my-5">
                    <label className="fs-3 fw-bold text-warning">Cargo Capacity</label>
                    <br />
                    <label className="fs-4">{/* {!!store.idCharacter ? store.idCharacter.eye_color : "...Loading"} */}</label>
                </div>
                <div className="col-lg-3 col-sm-auto text-center my-5">
                    <label className="fs-3 fw-bold text-warning">Consumables</label>
                    <br />
                    <label className="fs-4">{/* {!!store.idCharacter ? store.idCharacter.eye_color : "...Loading"} */}</label>
                </div>
            </div>
        </div>
    )

}
export default VehiclesDetails