import "../../styles/people.css";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";


export const PeopleDetails = (...props) => {

    const { store, actions } = useContext(Context);
    const navigate = useNavigate()

    useEffect(() => {
        !!store.character ? null : navigate('/people')
    }, [store.character])

    return (
        <div className="container-fluid mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-4 col-sm-12">
                    <img className="img-fluid rounded"
                        src={`https://starwars-visualguide.com/assets/img/characters/${!!store.character ? store.character.uid : "...Loading"}.jpg`}
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg";
                        }}></img>
                </div>
                <div className="col-lg-6 col-sm-auto my-auto">
                    <h1 className="mb-3 mt-2 text-warning">{!!store.character ? store.character.properties.name : "...Loading"}</h1>
                    <p className="p-description ms-md-5 ms-sm-0 fs-5">{!!store.character ? store.character.description : "...Loading"}</p>
                </div>
            </div>
            <hr className="text-warning" />
            <div className="row text-white justify-content-center">
                <div className="col-lg-3 col-sm-auto col-md-auto text-center my-5">
                    <label className="fs-3 fw-bold text-warning">Birth Year</label>
                    <br />
                    <label className="fs-4">{!!store.character ? store.character.properties.birth_year : "...Loading"}</label>
                </div>
                <div className="col-lg-3 col-sm-auto text-center my-5">
                    <label className="fs-3 fw-bold text-warning">Gender</label>
                    <br />
                    <label className="fs-4">{!!store.character ? store.character.properties.gender : "...Loading"}</label>
                </div>
                <div className="col-lg-3 col-sm-auto text-center my-5">
                    <label className="fs-3 fw-bold text-warning">Mass</label>
                    <br />
                    <label className="fs-4">{!!store.character ? store.character.properties.mass : "...Loading"}</label>
                </div>
                <div className="col-lg-3 col-sm-auto text-center my-5">
                    <label className="fs-3 fw-bold text-warning">Height</label>
                    <br />
                    <label className="fs-4">{!!store.character ? store.character.properties.height : "...Loading"}</label>
                </div>
                <div className="col-lg-3 col-sm-auto text-center my-5">
                    <label className="fs-3 fw-bold text-warning">Skin Color</label>
                    <br />
                    <label className="fs-4">{!!store.character ? store.character.properties.skin_color : "...Loading"}</label>
                </div>
                <div className="col-lg-3 col-sm-auto text-center my-5">
                    <label className="fs-3 fw-bold text-warning">Eye Color</label>
                    <br />
                    <label className="fs-4">{!!store.character ? store.character.properties.eye_color : "...Loading"}</label>
                </div>
                <div className="col-lg-3 col-sm-auto text-center my-5">
                    <label className="fs-3 fw-bold text-warning">Homeworld</label>
                    <br />
                    <label className="fs-4">{!!store.character ? store.character.properties.homeworld.name : "...Loading"}</label>
                </div>
            </div>
        </div>
    )

}
export default PeopleDetails