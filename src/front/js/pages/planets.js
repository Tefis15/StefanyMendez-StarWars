import React, { useContext, useEffect } from 'react'
import '../../styles/planets.css'
import { Context } from '../store/appContext'
import { CardPlanets } from '../component/cardPlanets'
import { PlanetsModal } from '../component/planetsModal'

export const Planets = () => {
	const { store, actions } = useContext(Context);


	useEffect(() => {
		actions.getAllPlanets()
	}, [store.showModal, store.showModalDetails, store.deleted, store.favoritesPlanets])

	return (
		<>
			<div className='container-fluid mt-4'>
			<div className='row row-cols-1 row-cols-sm-1 mb-4 ms-lg-5 '>
					<div className="div-search d-flex align-items-center col mb-3">
						<input type="text" id="inputPlanetsSearch" className="form-control input-search"
							autoComplete="off" aria-describedby="passwordHelpInline" placeholder="Search by Name"
							onKeyUp={(e) => {
								actions.searchPlanets(e.target.value)
							}} />
						<i className="fa-solid fa-magnifying-glass "></i>
					</div>
					<div className='text-end col'>
						<button className='btn btn-yellow me-lg-2 me-2' hidden={!!store.isLoggedIn && store.userLogin.role == "admin" ? false : true}
							onClick={() => { actions.handleShowModal() }}>
							Add New <i className="fa-solid fa-plus"></i>
						</button>
						<button className='btn btn-yellow me-lg-2' hidden={!!store.isLoggedIn && store.userLogin.role == "admin" ? false : true}
							onClick={() => { actions.handleShowModalDetails() }}>
							Add New Details <i className="fa-solid fa-plus"></i>
						</button>
					</div>
				</div>
				<div className="row row-cols-1 row-cols-md-4 row-cols-sm-1 row-cols-lg-6 g-3">
					{!!store.planets && store.planets.map((planet, index) => {
						if (planet.uid != 0) {
							return (
								<CardPlanets key={index} planet={planet} />
							)
						}
					})}
				</div>
			</div>
			<PlanetsModal show={store.showModal} />
		</>
	)
}