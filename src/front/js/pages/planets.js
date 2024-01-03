import React, { useContext, useEffect, useState } from 'react'
import '../../styles/planets.css'
import { Link, useNavigate } from 'react-router-dom'
import { Context } from '../store/appContext'
import {CardPlanets} from '../component/cardPlanets'

export const Planets = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()

	return (
		<div className='container mt-4'>
			<div className='text-end mb-3'>
				<button className='btn btn-yellow'>
					<Link to="/" className="link text-decoration-none text-dark">
						Add New <i className="fa-solid fa-plus"></i>
					</Link>
				</button>
			</div>
			<div className="row row-cols-1 row-cols-lg-5 row-cols-md-4 row-cols-sm-1 rows-cols-lg-5 g-3">
				<CardPlanets />
				<CardPlanets />
				<CardPlanets />
				<CardPlanets />
				<CardPlanets />
				<CardPlanets />
				<CardPlanets />
				<CardPlanets />
				<CardPlanets />
			</div>
		</div>
	)
}