import React, { useContext, useEffect, useState } from 'react'
import '../../styles/people.css'
import { Link, useNavigate } from 'react-router-dom'
import { Context } from '../store/appContext'
import CardPeople from '../component/cardPeople'
import { PeopleModal } from '../component/peopleModal'


const People = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()

	return (
		<>
		<div className='container mt-4'>
			<div className='text-end mb-3'>
				<button className='btn btn-yellow me-2' onClick={()=>{actions.handleShowModal()}}>
						Add New <i className="fa-solid fa-plus"></i>			
				</button>
			</div>
			<div className="row row-cols-1 row-cols-md-4 rows-cols-sm-1 rows-cols-lg-6 g-4">
				<CardPeople />
				<CardPeople />
				<CardPeople />
				<CardPeople />
				<CardPeople />
				<CardPeople />
				<CardPeople />
				<CardPeople />
				<CardPeople />
			</div>
		</div>
		<PeopleModal show={store.showModal}/>
		</>
	)
}
export default People