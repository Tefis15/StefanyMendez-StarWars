import "../../styles/starships.css";
import React, { useContext, useEffect} from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";


export const StarshipsDetails = (...props) => {

    const { store, actions } = useContext(Context);
    const navigate = useNavigate()

    !!store.starship ? null : navigate('/starships')
    useEffect(() => {
    }, [store.starship])
    return (
        <div className="container-fluid mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-4 col-sm-12">
                    <img className="img-fluid rounded" src={`https://starwars-visualguide.com/assets/img/starships/${!!store.starship ? store.starship.uid : "...Loading"}.jpg `}
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg";
                        }}></img>
                </div>
                <div className="col-lg-6 col-sm-auto my-auto">
                    <h1 className="mb-3 mt-2 text-warning">{!!store.starship ? store.starship.properties.name : "...Loading"}</h1>
                    <p className="p-description ms-md-5 ms-sm-0 fs-5">{!!store.starship ? store.starship.description : "...Loading"}</p>
                </div>
            </div>
            <hr className="text-warning" />
            <div className="row text-white justify-content-center">
                <div className="col-lg-3 col-sm-auto col-md-auto text-center my-5">
                    <label className="fs-3 fw-bold text-warning">Model</label>
                    <br />
                    <label className="fs-4">{!!store.starship ? store.starship.properties.model : "...Loading"}</label>
                </div>
                <div className="col-lg-3 col-sm-auto text-center my-5">
                    <label className="fs-3 fw-bold text-warning">Starships Class</label>
                    <br />
                    <label className="fs-4">{!!store.starship ? store.starship.properties.starship_class : "...Loading"}</label>
                </div>
                <div className="col-lg-3 col-sm-auto text-center my-5">
                    <label className="fs-3 fw-bold text-warning">Manufacturer</label>
                    <br />
                    <label className="fs-4">{!!store.starship ? store.starship.properties.manufacturer : "...Loading"}</label>
                </div>
                <div className="col-lg-3 col-sm-auto text-center my-5">
                    <label className="fs-3 fw-bold text-warning">Cost In Credits</label>
                    <br />
                    <label className="fs-4">{!!store.starship ? store.starship.properties.cost_in_credits : "...Loading"}</label>
                </div>
                <div className="col-lg-3 col-sm-auto text-center my-5">
                    <label className="fs-3 fw-bold text-warning">Length</label>
                    <br />
                    <label className="fs-4">{!!store.starship ? store.starship.properties.length : "...Loading"}</label>
                </div>
                <div className="col-lg-3 col-sm-auto text-center my-5">
                    <label className="fs-3 fw-bold text-warning">Crew</label>
                    <br />
                    <label className="fs-4">{!!store.starship ? store.starship.properties.crew : "...Loading"}</label>
                </div>
                <div className="col-lg-3 col-sm-auto text-center my-5">
                    <label className="fs-3 fw-bold text-warning">Passengers</label>
                    <br />
                    <label className="fs-4">{!!store.starship ? store.starship.properties.passengers : "...Loading"}</label>
                </div>
                <div className="col-lg-3 col-sm-auto text-center my-5">
                    <label className="fs-3 fw-bold text-warning">Max Atmosphering Speed</label>
                    <br />
                    <label className="fs-4">{!!store.starship ? store.starship.properties.max_atmosphering_speed : "...Loading"}</label>
                </div>
                <div className="col-lg-3 col-sm-auto text-center my-5">
                    <label className="fs-3 fw-bold text-warning">Hyperdrive Rating</label>
                    <br />
                    <label className="fs-4">{!!store.starship ? store.starship.properties.hyperdrive_rating : "...Loading"}</label>
                </div>
                <div className="col-lg-3 col-sm-auto text-center my-5">
                    <label className="fs-3 fw-bold text-warning">MGLT</label>
                    <br />
                    <label className="fs-4">{!!store.starship ? store.starship.properties.MGLT : "...Loading"}</label>
                </div>
                <div className="col-lg-3 col-sm-auto text-center my-5">
                    <label className="fs-3 fw-bold text-warning">Cargo Capacity</label>
                    <br />
                    <label className="fs-4">{!!store.starship ? store.starship.properties.cargo_capacity : "...Loading"}</label>
                </div>
                <div className="col-lg-3 col-sm-auto text-center my-5">
                    <label className="fs-3 fw-bold text-warning">Consumables</label>
                    <br />
                    <label className="fs-4">{!!store.starship ? store.starship.properties.consumables : "...Loading"}</label>
                </div>
            </div>
        </div>
    )
}
export default StarshipsDetails