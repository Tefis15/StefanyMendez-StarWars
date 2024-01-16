import React, { useContext, useEffect } from "react";
import '../../styles/planets.css'
import { Link } from "react-router-dom";
import PropTypes from "prop-types"
import { Context } from "../store/appContext";


export const CardPlanets = ({ planet }, ...props) => {
    const { store, actions } = useContext(Context);

    /*     useEffect(() => {
    
        }, [store.favorites.favorite]) */


    return (
        <div className="">
            <div className="card card-all h-100">
                <img src={`https://starwars-visualguide.com/assets/img/planets/6.jpg`} className="card-img-top img-card-all h-100" alt="..."
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg";
                    }} />
                <button className="btn btn-yellow fs-5 position-absolute end-0 me-2 mt-2" >
                    <i className=
                        "fa-solid fa-heart">
                    </i>
                </button>
                <div className="card-body text-center">
                    <h3 className="card-title text-white text-start">Luke</h3>
                    <button className="btn btn-yellow mt-4 me-2 fw-bold">
                        <Link className="link text-decoration-none text-dark" to="/">
                            Details
                        </Link>
                    </button>
                    <button className="btn btn-yellow mt-4 me-2 fw-bold">
                        <Link className="link text-decoration-none text-dark" to="/">
                            <i className="fa-solid fa-pen"></i>
                        </Link>
                    </button>
                    <button className="btn btn-trash mt-4 fw-bold">
                        <Link className="link text-decoration-none text-white" to="/">
                            <i className="fa-solid fa-trash-can"></i>
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    )
}
CardPlanets.propTypes = {
    planet: PropTypes.object
}
