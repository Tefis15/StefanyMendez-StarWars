import React, { useContext } from 'react'
import { Context } from '../store/appContext'
import PropTypes from "prop-types";

export const VehiclesDetailsModal = (...props) => {

    const { store, actions } = useContext(Context)

    return (

        <form className='modal' tabIndex="-1" style={{ display: store.showModalDetails ? "inline-block" : "none" }}
            onSubmit={e => {
                e.preventDefault()
                if (!!store.vehicle) {
                    actions.editVehiclesDetails(store.vehicle.uid)
                    e.target.reset()
                } else {
                    actions.addVehiclesDetails()
                    e.target.reset()
                }
            }}>
            <div className="modal-dialog modal-dialog-centered p-1">
                <div className="modal-content usersModalContent p-2">
                    <div className="modal-header">
                        <h5 className="modal-title fw-bold text-white fs-4">Vehicles Details</h5>
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
                                    {!!store.vehicle || store.vehicleEdit ?
                                        <option
                                            className='option-modal'
                                            selected={!!store.vehicle ? true : true}>
                                            {!!store.vehicle ? store.vehicle.uid : store.vehicleEdit.uid} - {!!store.vehicle ? store.vehicle.properties.name : store.vehicleEdit.name}
                                        </option>
                                        :
                                        !!store.vehicles && store.vehicles.map((vehicle, index) => {
                                            return (
                                                <option key={index}
                                                    className='option-modal'
                                                    selected={!!store.vehicle && store.vehicle.uid == vehicle.uid
                                                        ? true
                                                        : !!store.vehicleEdit && store.vehicleEdit.uid == vehicle.uid ? true : false}
                                                    value={vehicle.uid}>{vehicle.uid} - {vehicle.name}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="form-floating mb-3" hidden={!!store.vehicle ? false : true}>
                            <input
                                type="text"
                                className="form-control input-modal"
                                id="name"
                                name='name'
                                placeholder='Name'
                                onChange={actions.handleChange}
                                defaultValue={!!store.vehicle ? store.vehicle.properties.name : !!store.vehicleEdit ? store.vehicleEdit.name : ""}
                            />
                            <label className='text-warning' htmlFor="floatingInput">Name</label>
                        </div>
                        <div className="form-floating mb-3" hidden={!!store.vehicle ? false : true}>
                            <input
                                type="text"
                                className="form-control input-modal"
                                id="url"
                                name='url'
                                placeholder='URL'
                                defaultValue={!!store.vehicle ? store.vehicle.properties.url : !!store.vehicleEdit ? store.vehicleEdit.url : store.url}
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
                                defaultValue={!!store.vehicle ? store.vehicle.description : ""} />
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control input-modal"
                                id="model"
                                name='model'
                                placeholder='Model'
                                onChange={actions.handleChange}
                                defaultValue={!!store.vehicle ? store.vehicle.properties.model : ""} />
                            <label className='text-warning' htmlFor="floatingInput">Model</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control input-modal"
                                id="class"
                                name='class'
                                placeholder='Vehicle Class'
                                onChange={actions.handleChange}
                                defaultValue={!!store.vehicle ? store.vehicle.properties.vehicle_class : ""} />
                            <label className='text-warning' htmlFor="floatingInput">Vehicle Class</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control input-modal"
                                id="manufacturer"
                                name='manufacturer'
                                placeholder='manufacturer'
                                onChange={actions.handleChange}
                                defaultValue={!!store.vehicle ? store.vehicle.properties.manufacturer : ""} />
                            <label className='text-warning' htmlFor="floatingInput">manufacturer</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control input-modal"
                                id="costInCredits"
                                name='costInCredits'
                                placeholder='Cost In Credits'
                                onChange={actions.handleChange}
                                defaultValue={!!store.vehicle ? store.vehicle.properties.cost_in_credits : ""} />
                            <label className='text-warning' htmlFor="floatingInput">Cost In Credits</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="number"
                                className="form-control input-modal"
                                id="length"
                                name='length'
                                placeholder='Length'
                                onChange={actions.handleChange}
                                defaultValue={!!store.vehicle ? store.vehicle.properties.length : ""} />
                            <label className='text-warning' htmlFor="floatingInput">Length</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="number"
                                className="form-control input-modal"
                                id="crew"
                                name='crew'
                                placeholder='Crew'
                                onChange={actions.handleChange}
                                defaultValue={!!store.vehicle ? store.vehicle.properties.crew : ""} />
                            <label className='text-warning' htmlFor="floatingInput">Crew</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="number"
                                className="form-control input-modal"
                                id="passengers"
                                name='passengers'
                                placeholder='Passengers'
                                onChange={actions.handleChange}
                                defaultValue={!!store.vehicle ? store.vehicle.properties.passengers : ""} />
                            <label className='text-warning' htmlFor="floatingInput">Passengers</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="number"
                                className="form-control input-modal"
                                id="maxAtmospheringSpeed"
                                name='maxAtmospheringSpeed'
                                placeholder='Max Atmosphering Speed'
                                onChange={actions.handleChange}
                                defaultValue={!!store.vehicle ? store.vehicle.properties.max_atmosphering_speed : ""} />
                            <label className='text-warning' htmlFor="floatingInput">Max Atmosphering Speed</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="number"
                                className="form-control input-modal"
                                id="cargoCapacity"
                                name='cargoCapacity'
                                placeholder='Cargo Capacity'
                                onChange={actions.handleChange}
                                defaultValue={!!store.vehicle ? store.vehicle.properties.cargo_capacity : ""} />
                            <label className='text-warning' htmlFor="floatingInput">Cargo Capacity</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control input-modal"
                                id="consumables"
                                name='consumables'
                                placeholder='Consumables'
                                onChange={actions.handleChange}
                                defaultValue={!!store.vehicle ? store.vehicle.properties.consumables : ""} />
                            <label className='text-warning' htmlFor="floatingInput">Consumables</label>
                        </div>

                        <div className="form-floating mb-3" hidden={!!store.vehicle ? false : true}>
                            <input
                                type="text"
                                className="form-control input-modal"
                                id="created"
                                name='created'
                                placeholder='Created Date'
                                readOnly
                                defaultValue={!!store.vehicle ? new Date(store.vehicle.properties.created).toLocaleString() : ""}
                            />
                            <label className='text-warning' htmlFor="floatingInput">Created Date</label>
                        </div>
                        <div className="form-floating mb-3" hidden={!!store.vehicle ? false : true}>
                            <input
                                type="text"
                                className="form-control input-modal"
                                id="edited"
                                name='edited'
                                placeholder='Edited Date'
                                readOnly
                                defaultValue={!!store.vehicle ? new Date(store.vehicle.properties.edited).toLocaleString() : ""} />
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
VehiclesDetailsModal.propTypes = {
    show: PropTypes.bool,
}
VehiclesDetailsModal.defaultProps = {
    show: false
}