import React, { useContext } from 'react'
import { Context } from '../store/appContext'
import PropTypes from "prop-types";

export const PlanetsDetailsModal = (...props) => {

    const { store, actions } = useContext(Context)

    return (

        <form className='modal' tabIndex="-1" style={{ display: store.showModalDetails ? "inline-block" : "none" }}
            onSubmit={e => {
                e.preventDefault()
                if(!!store.planet){
                    actions.editPlanetsDetails(store.planet.uid)
                    e.target.reset()
                }else{
                    actions.addPlanetsDetails()
                    e.target.reset()
                }
            }}>
            <div className="modal-dialog modal-dialog-centered p-1">
                <div className="modal-content usersModalContent p-2">
                    <div className="modal-header">
                        <h5 className="modal-title fw-bold text-white fs-4">Planets Details</h5>
                        <button type="reset" className="close btn btn-yellow fw-bold text-center fw-bold"
                            onClick={() => actions.handleDeleteModalDetails()}>
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group mb-2">
                            <label htmlFor="Uid" className="modal-label-input text-warning">Uid</label>
                            <div className="input-group group-user-modal mb-3 input-select">
                                <select className="form-select select-modal" id="inputGroupRoles" onChange={actions.handleChange} name='uid'>
                                    <option className='option-modal' defaultValue="null">Select the Uid</option>
                                    {!!store.planet || store.planetEdit ?
                                        <option
                                            className='option-modal'
                                            selected={!!store.planet ? true : true}>
                                            {!!store.planet ? store.planet.uid : store.planetEdit.uid} - {!!store.planet ? store.planet.properties.name : store.planetEdit.name}
                                        </option>
                                        :
                                        !!store.planets && store.planets.map((planet, index) => {
                                            return (
                                                <option key={index}
                                                    className='option-modal'
                                                    selected={!!store.planet && store.planet.uid == planet.uid ? true : !!store.planetEdit && store.planetEdit.uid == planet.uid ? true : false}
                                                    value={planet.uid}>{planet.uid} - {planet.name}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="form-floating mb-3" hidden={!!store.planet ? false : true}>
                            <input
                                type="text"
                                className="form-control input-modal"
                                id="name"
                                name='name'
                                placeholder='Name'
                                onChange={actions.handleChange}
                                defaultValue={!!store.planet ? store.planet.properties.name : !!store.planetEdit ? store.planetEdit.name : ""}
                            />
                            <label className='text-warning' htmlFor="floatingInput">Name</label>
                        </div>
                        <div className="form-floating mb-3" hidden={!!store.planet ? false : true}>
                            <input
                                type="text"
                                className="form-control input-modal"
                                id="url"
                                name='url'
                                placeholder='URL'
                                defaultValue={!!store.planet ? store.planet.properties.url : !!store.planetEdit ? store.planetEdit.url : store.url}
                                readOnly />
                            <label className='text-warning' htmlFor="floatingInput">URL</label>
                        </div>
                        <div className="form mb-3">
                            <label className='text-warning' htmlFor="floatingInput">Description</label>
                            <textarea
                                type="text"
                                className="form-control input-modal"
                                id="description"
                                name='description'
                                rows="3"
                                onChange={actions.handleChange}
                                defaultValue={!!store.planet ? store.planet.description : ""} />
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="number"
                                className="form-control input-modal"
                                id="diameter"
                                name='diameter'
                                placeholder='Diameter'
                                onChange={actions.handleChange}
                                defaultValue={!!store.planet ? store.planet.properties.diameter : ""} />
                            <label className='text-warning' htmlFor="floatingInput">Diameter</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="number"
                                className="form-control input-modal"
                                id="rotationPeriod"
                                name='rotationPeriod'
                                placeholder='Rotation Period'
                                onChange={actions.handleChange}
                                defaultValue={!!store.planet ? store.planet.properties.rotation_period : ""} />
                            <label className='text-warning' htmlFor="floatingInput">Rotation Period</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="number"
                                className="form-control input-modal"
                                id="orbitalPeriod"
                                name='orbitalPeriod'
                                placeholder='Orbital Period'
                                onChange={actions.handleChange}
                                defaultValue={!!store.planet ? store.planet.properties.orbital_period : ""} />
                            <label className='text-warning' htmlFor="floatingInput">Orbital Period</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control input-modal"
                                id="gravity"
                                name='gravity'
                                placeholder='Gravity'
                                onChange={actions.handleChange}
                                defaultValue={!!store.planet ? store.planet.properties.gravity : ""} />
                            <label className='text-warning' htmlFor="floatingInput">Gravity</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control input-modal"
                                id="population"
                                name='population'
                                placeholder='Population'
                                onChange={actions.handleChange}
                                defaultValue={!!store.planet ? store.planet.properties.population : ""} />
                            <label className='text-warning' htmlFor="floatingInput">Population</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control input-modal"
                                id="climate"
                                name='climate'
                                placeholder='Climate'
                                onChange={actions.handleChange}
                                defaultValue={!!store.planet ? store.planet.properties.climate : ""} />
                            <label className='text-warning' htmlFor="floatingInput">Climate</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control input-modal"
                                id="terrain"
                                name='terrain'
                                placeholder='Terrain'
                                onChange={actions.handleChange}
                                defaultValue={!!store.planet ? store.planet.properties.terrain : ""} />
                            <label className='text-warning' htmlFor="floatingInput">Terrain</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="number"
                                className="form-control input-modal"
                                id="surfaceWater"
                                name='surfaceWater'
                                placeholder='Surface Water'
                                onChange={actions.handleChange}
                                defaultValue={!!store.planet ? store.planet.properties.surface_water : ""} />
                            <label className='text-warning' htmlFor="floatingInput">Surface Water</label>
                        </div>
                        
                        <div className="form-floating mb-3" hidden={!!store.planet ? false : true}>
                            <input
                                type="text"
                                className="form-control input-modal"
                                id="created"
                                name='created'
                                placeholder='Created Date'
                                readOnly
                                defaultValue={!!store.planet ? new Date(store.planet.properties.created).toLocaleString() : ""}
                            />
                            <label className='text-warning' htmlFor="floatingInput">Created Date</label>
                        </div>
                        <div className="form-floating mb-3" hidden={!!store.planet ? false : true}>
                            <input
                                type="text"
                                className="form-control input-modal"
                                id="edited"
                                name='edited'
                                placeholder='Edited Date'
                                readOnly
                                defaultValue={!!store.planet ? new Date(store.planet.properties.edited).toLocaleString()  : ""} />
                            <label className='text-warning' htmlFor="floatingInput">Edited Date</label>
                        </div>

                    </div>
                    <div className="modal-footer d-flex justify-content-center align-items-center">
                        <button type="submit" className="btn btn-yellow fw-bold text-center">
                            Save
                        </button>
                        <button type="reset" className="btn btn-yellow fw-bold text-center">
                            Clear
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}
PlanetsDetailsModal.propTypes = {
    show: PropTypes.bool,
}
PlanetsDetailsModal.defaultProps = {
    show: false
}