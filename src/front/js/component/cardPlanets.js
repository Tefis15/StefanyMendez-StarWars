import React, { useContext} from "react";
import '../../styles/planets.css'
import { Link } from "react-router-dom";
import PropTypes from "prop-types"
import { Context } from "../store/appContext";
import { PlanetsModal } from "./planetsModal";
import { PlanetsDetailsModal } from "./planetsDetailsModal";


export const CardPlanets = ({ planet }, ...props) => {
    const { store, actions } = useContext(Context);

    return (
        <>
        <div className="">
            <div className="card card-all">
                <img src={`https://starwars-visualguide.com/assets/img/planets/${planet.uid}.jpg`}
                    className="card-img-top img-card-all" alt="..."
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg";
                    }} />
                <button className="btn btn-yellow fs-5 position-absolute end-0 me-2 mt-2"
                    onClick={() => {
                        !!store.isLoggedIn ?
                            store.favoritesPlanets.find((favorite) => favorite.planets_uid.uid === planet.uid) ?
                                actions.deleteFavoritesPlanets(planet.uid)
                                :
                                actions.addFavoritesPlanets(planet.uid)
                            : Swal.fire({
                                icon: 'warning',
                                text: "Please LogIn or SingIn for add favorites",
                                timer: 3000,
                                padding: "2em",
                                color: "#FFC107",
                                showConfirmButton: false,
                                background: `#000000
                        url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7ce55e30-e602-4e3d-b05a-d2a7a0fa49d8/daqj3gl-9a94472a-1945-4acd-ac69-b8eba9806db9.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzdjZTU1ZTMwLWU2MDItNGUzZC1iMDVhLWQyYTdhMGZhNDlkOFwvZGFxajNnbC05YTk0NDcyYS0xOTQ1LTRhY2QtYWM2OS1iOGViYTk4MDZkYjkucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.pSd9UXJUti2afeziH1UqbQzFGAnKPSWtnjukxIAqnO8") 
                        no-repeat`,
                                backdrop: `rgba(0,0,123,0.4)
                        url("https://media2.giphy.com/media/QC0iYuIqKccSoLW0Bf/200.gif?cid=95b27944solsgq6e6y3ixpq7t2w3f6jdgizt5fodhuqjmha0&ep=v1_gifs_gifId&rid=200.gif&ct=s")
                        right top 
                        no-repeat`
                            })
                    }}>

                    <i className={store.favoritesPlanets.find((favorite) => favorite.planets_uid.uid === planet.uid) ?
                        "fa-solid fa-heart"
                        : "fa-regular fa-heart"}>
                    </i>
                </button>
                <div className="card-body text-center">
                    <h3 className="card-title text-white text-start">{planet.name}</h3>
                    <button className="btn btn-yellow mt-4 me-2 fw-bold">
                        <Link className="link text-decoration-none text-dark"
                            to={`/planets/details/${planet.uid}`}
                            onClick={() => actions.getPlanetsById(planet.uid, "details")}>
                            Details
                        </Link>
                    </button>

                    <button className="btn btn-yellow mt-4 me-2 fw-bold" hidden={store.userLogin.role == "admin" ? false : true} onClick={() => {
                        actions.getPlanetsById(planet.uid, "edit")
                        actions.handleShowModalDetails()
                    }}>
                        <i className="fa-solid fa-pen"></i>
                    </button>
                    <button className="btn btn-trash mt-4 fw-bold" hidden={store.userLogin.role == "admin" ? false : true}
                        onClick={() =>
                            Swal.fire({
                                title: 'Are you sure?',
                                text: "You won't be able to revert this!",
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#d33',
                                cancelButtonColor: '#34AACB',
                                confirmButtonText: 'Yes, delete it!',
                                padding: "2em",
                                color: "#FFC107",
                                background: `#000000
                            url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7ce55e30-e602-4e3d-b05a-d2a7a0fa49d8/daqj3gl-9a94472a-1945-4acd-ac69-b8eba9806db9.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzdjZTU1ZTMwLWU2MDItNGUzZC1iMDVhLWQyYTdhMGZhNDlkOFwvZGFxajNnbC05YTk0NDcyYS0xOTQ1LTRhY2QtYWM2OS1iOGViYTk4MDZkYjkucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.pSd9UXJUti2afeziH1UqbQzFGAnKPSWtnjukxIAqnO8") 
                            no-repeat
                            `,
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    actions.deletePlanets(planet.uid, planet.name)
                                }
                            })
                        }>
                        <i className="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            </div>
        </div>
        <PlanetsModal show={store.showModal} />
        <PlanetsDetailsModal show={store.showModalDetails} />
    </>
    )
}
CardPlanets.propTypes = {
    planet: PropTypes.object
}
