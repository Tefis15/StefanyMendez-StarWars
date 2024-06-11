import React, { useContext, useEffect } from 'react'
import '../../styles/vehicles.css'
import { Context } from '../store/appContext'
import { CardVehicles } from '../component/cardVehicles'
import { VehiclesModal } from '../component/vehiclesModal'

export const Vehicles = () => {
	const { store, actions } = useContext(Context);


	useEffect(() => {
		actions.getAllVehicles()
	}, [store.showModal, store.showModalDetails, store.deleted, store.favoritesVehicles])

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
					{!!store.vehicles && store.vehicles.map((vehicle, index) => {
						if (vehicle.uid != 0) {
							return (
								<CardVehicles key={index} vehicle={vehicle} />
							)
						}
					})}
				</div>
			</div>
			<VehiclesModal show={store.showModal} />
		</>
	)
}