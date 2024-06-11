import React, { useContext, useEffect} from 'react'
import '../../styles/starships.css'
import { Context } from '../store/appContext'
import {CardStarships} from '../component/cardStarships'
import { StarshipsModal } from '../component/starshipsModal'

export const Starships = () => {
    const { store, actions } = useContext(Context);

	useEffect(() => {
		actions.getAllStarships()
	}, [store.showModal, store.showModalDetails, store.deleted, store.favoritesStarships])

	return (
		<>
			<div className='container-fluid mt-4'>
			<div className='row row-cols-1 row-cols-sm-1 mb-4 ms-lg-5 '>
					<div className="div-search d-flex align-items-center col mb-3">
						<input type="text" id="inputStarshipsSearch" className="form-control input-search"
							autoComplete="off" aria-describedby="passwordHelpInline" placeholder="Search by Name"
							onKeyUp={(e) => {
								actions.searchStarships(e.target.value)
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
					{!!store.starships && store.starships.map((starship, index) => {
						if (starship.uid != 0) {
							return (
								<CardStarships key={index} starship={starship} />
							)
						}
					})}
				</div>
			</div>
			<StarshipsModal show={store.showModal} />
		</>
	)
}