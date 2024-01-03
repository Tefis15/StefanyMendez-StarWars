import React, { useContext, useEffect, useState } from 'react'
import '../../styles/people.css'
import { useNavigate } from 'react-router-dom'
import { Context } from '../store/appContext'
import { CardPeople } from '../component/cardPeople'
import { PeopleModal } from '../component/peopleModal'


export const People = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()

	useEffect(() => {
		actions.getAllPeople()
		actions.getAllPlanets()
	}, [store.showModal, store.showModalDetails, store.deleted])

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
					{!!store.people && store.people.map((character, index) => {
						return (
							<CardPeople key={index} character={character} />
						)
					})}
				</div>
			</div>
			<PeopleModal show={store.showModal} />
		</>
	)
}