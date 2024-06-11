import React, { useContext, useEffect, useState } from 'react'
import '../../styles/people.css'
import { Context } from '../store/appContext'
import { CardPeople } from '../component/cardPeople'
import { PeopleModal } from '../component/peopleModal'


export const People = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		actions.getAllPeople()
		actions.getAllPlanets()
	}, [store.showModal, store.showModalDetails, store.deleted, store.favoritesPeople])

	return (
		<>
			<div className='container-fluid mt-4' onKeyUp={e =>{
				 if (e.key == "Escape") {
                    actions.handleDeleteModal()
                }
			}}>
				<div className='row row-cols-1 row-cols-sm-1 mb-4 ms-lg-5 '>
					<div className="div-search d-flex align-items-center col mb-3">
						<input type="text" id="inputPeopleSearch" className="form-control input-search"
							autoComplete="off" aria-describedby="passwordHelpInline" placeholder="Search by Name"
							onKeyUp={(e) => {
								actions.searchPeople(e.target.value)
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