import React, { useContext } from "react";
import { Link } from "react-router-dom";
import starWars from "../../img/starwars.png"
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	return (
		<nav className="navbar navbar-expand-lg sticky-top">
			<div className="container-fluid">
				<Link to="/" className="text-decoration-none text-white ms-2">
					<img src={starWars} alt="Logo" className="logo-nav d-inline-block align-text-center me-2" />
				</Link>
				<button className="navbar-toggler text-warning" type="button" data-bs-toggle="collapse"
					data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
					<i className="fa-solid fa-bars"></i>
				</button>
				<div className="collapse navbar-collapse" id="navbarTogglerDemo02">
					<ul className="navbar-nav mb-lg-0">
						<li className="nav-link nav-item nav-menu ms-3">
							<Link to="/people" className="nav-link text-decoration-none" >
								<span className="nav-span">People</span>
							</Link>
						</li>
						<li className="nav-link nav-item nav-menu ms-3">
							<Link to="/planets" className="nav-link text-decoration-none">
								<span className="nav-span">Planets</span>
							</Link>
						</li>
						<li className="nav-link nav-item nav-menu ms-3">
							<Link to="/vehicles" className="nav-link text-decoration-none">
								<span className="nav-span">Vehicles</span>
							</Link>
						</li>
						<li className="nav-link nav-item nav-menu ms-3">
							<Link to="/starships" className="nav-link text-decoration-none" >
								<span className="nav-span">Starships</span>
							</Link>
						</li>
						<li className="nav-link nav-item nav-menu ms-3"
							hidden={store.isLoggedIn ? false : true}>
							<Link to="/favorites" className="nav-link text-decoration-none position-relative"
								id="dropdownMenuButton1" data-bs-auto-close="outside" aria-expanded="false">
								<span className="nav-span">Favorites</span>
								<span className="position-absolute top-25 start-100 translate-middle badge rounded-pill bg-danger ">
									{store.isLoggedIn ? store.favoritesPeople.length + store.favoritesPlanets.length
										+ store.favoritesVehicles.length + store.favoritesStarships.length : 0}
									<span className="visually-hidden">Not Favorites</span>
								</span>
							</Link>
						</li>
						<li className="nav-link nav-item nav-menu ms-3"
							hidden={store.isLoggedIn && store.userLogin.role == "admin" ? false : true}>
							<Link to="/users" className="nav-link text-decoration-none position-relative"
								id="dropdownMenuButton1" data-bs-auto-close="outside" aria-expanded="false">
								<span className="nav-span">Users</span>
							</Link>
						</li>
					</ul>
					<ul className="navbar-nav mb-lg-0 ms-auto">
						<li className="nav-item ms-2 mb-2" hidden={store.isLoggedIn ? false : true}>
							<Link to="/profile" className="text-decoration-none" >
								<button className="btn btn-yellow"><i className="fa-solid fa-earth-americas me-2"></i>Profile</button>
							</Link>
						</li>
						<li className="nav-item ms-2 mb-2" hidden={store.isLoggedIn ? true : false}>
							<Link to="/login" className="text-decoration-none" >
								<button className="btn btn-yellow"><i className="fa-solid fa-user-astronaut me-2"></i>LogIn</button>
							</Link>
						</li>
						<li className="nav-item ms-2 mb-2" hidden={store.isLoggedIn ? true : false}>
							<Link to="/signin" className="text-decoration-none" >
								<button className="btn btn-yellow"><i className="fa-solid fa-meteor me-2"></i>SignIn</button>
							</Link>
						</li>
						<li className="nav-item ms-2" hidden={store.isLoggedIn ? false : true}>
							<Link to="/" className="text-decoration-none" >
								<button className="btn btn-yellow" onClick={() => actions.logOut()}><i className="fa-solid fa-rocket me-2"></i>LogOut</button>
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};