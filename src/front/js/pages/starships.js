import React, { useContext, useEffect, useState } from 'react'
import '../../styles/starships.css'
import { Link, useNavigate } from 'react-router-dom'
import { Context } from '../store/appContext'
import CardStarships from '../component/cardStarships'

const Starships = () => {
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
            <div className="row row-cols-1 row-cols-md-4 rows-cols-sm-1 rows-cols-lg-6 g-4">
                <CardStarships />
                <CardStarships />
                <CardStarships />
                <CardStarships />
                <CardStarships />
                <CardStarships />
                <CardStarships />
                <CardStarships />
                <CardStarships />
            </div>
        </div>
    )
}
export default Starships