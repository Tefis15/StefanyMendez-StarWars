import React, { useContext, useEffect } from "react";
import '../../styles/people.css'
import { Link } from "react-router-dom";
import PropTypes from "prop-types"
import { Context } from "../store/appContext";

export const CardFavoritesStarships = ({ favorite }, ...props) => {
    const { store, actions } = useContext(Context);

    /*     useEffect(() => {
    
        }, [store.favorites.favorite]) */


    return (
        <>
            <div className="">
                <div className="card card-people h-100">
                    <img src={`https://starwars-visualguide.com/assets/img/starships/${favorite.starships_uid.uid}.jpg`}
                        className="card-img-top img-card-people h-100" alt="..."
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
                        <h3 className="card-title text-white text-start">{favorite.starships_uid.name}</h3>
                        <button className="btn btn-yellow mt-4 me-2 fw-bold">
                            <Link className="link text-decoration-none text-dark"
                                to={`/starships/details/${favorite.starships_uid.uid}`}
                                onClick={() => actions.getStarshipsById(favorite.starships_uid.uid, "details")}>
                                Details
                            </Link>
                        </button>

                    </div>
                </div>
            </div>
        </>
    )
}
CardFavoritesStarships.propTypes = {
    favorite: PropTypes.object
}