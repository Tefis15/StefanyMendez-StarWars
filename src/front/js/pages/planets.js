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
				<div className='text-end mb-3'>
					<button className='btn btn-yellow me-2' hidden={!!store.isLoggedIn && store.userLogin.role == "admin" ? false : true}
						onClick={() => { actions.handleShowModal() }}>
						Add New <i className="fa-solid fa-plus"></i>
					</button>
					<button className='btn btn-yellow me-2' hidden={!!store.isLoggedIn && store.userLogin.role == "admin" ? false : true}
						onClick={() => { actions.handleShowModalDetails() }}>
						Add New Details <i className="fa-solid fa-plus"></i>
					</button>
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