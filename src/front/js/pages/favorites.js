import React, { useContext, useEffect, useState } from 'react'
import '../../styles/people.css'
import { useNavigate } from 'react-router-dom'
import { Context } from '../store/appContext'
import { CardFavoritesPeople } from '../component/cardFavoritesPeople'
import { CardFavoritesPlanets } from '../component/cardFavoritesPlanets'
import { CardFavoritesVehicles } from '../component/cardFavoritesVehicles'
import { CardFavoritesStarships } from '../component/cardFavoritesStarships'

export const Favorites = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()

	useEffect(() => {
       actions.getPeopleFavorites()
       actions.getPlanetsFavorites()
       actions.getVehiclesFavorites()
       actions.getStarshipsFavorites()

	}, [store.deleted])

	return (
		<>
			<div className='container-fluid mt-4'>
				<div className='text-end mb-3'>
				</div>
				<div className="row row-cols-1 row-cols-md-4 row-cols-sm-1 row-cols-lg-6 g-3">
					{!!store.favoritesPeople && store.favoritesPeople.map((favorite, index) => {
						return (
							<CardFavoritesPeople key={index} favorite={favorite}/>
						)
					})}
					{!!store.favoritesPlanets && store.favoritesPlanets.map((favorite, index) => {
						return (
							<CardFavoritesPlanets key={index} favorite={favorite}/>
						)
					})}
					{!!store.favoritesVehicles && store.favoritesVehicles.map((favorite, index) => {
						return (
							<CardFavoritesVehicles key={index} favorite={favorite}/>
						)
					})}
					{!!store.favoritesStarships && store.favoritesStarships.map((favorite, index) => {
						return (
							<CardFavoritesStarships key={index} favorite={favorite}/>
						)
					})}
				</div>
			</div>
		</>
	)
}