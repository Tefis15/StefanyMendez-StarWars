import React, { useContext } from 'react'
import { Context } from '../store/appContext'
import PropTypes from "prop-types";
import "../../styles/starships.css";

export const StarshipsDetailsModal = (...props) => {

    const { store, actions } = useContext(Context)

    return (

        <form className='modal' tabIndex="-1" style={{ display: store.showModalDetails ? "inline-block" : "none" }}
            onSubmit={e => {
                e.preventDefault()
                if (!!store.starship) {
                    actions.editStarshipsDetails(store.starship.uid)
                    e.target.reset()
                } else {
                    actions.addStarshipsDetails()
                    e.target.reset()
                }
            }}>
            <div className="modal-dialog modal-dialog-centered p-1">
                <div className="modal-content usersModalContent p-2">
                    <div className="modal-header">
                        <h5 className="modal-title fw-bold text-white fs-4">Starships Details</h5>
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
                                    {!!store.starship || store.starshipEdit ?
                                        <option
                                            className='option-modal'
                                            selected={!!store.starship ? true : true}>
                                            {!!store.starship ? store.starship.uid : store.starshipEdit.uid} - {!!store.starship ? store.starship.properties.name : store.starshipEdit.name}
                                        </option>
                                        :
                                        !!store.starships && store.starships.map((starship, index) => {
                                            return (
                                                <option key={index}
                                                    className='option-modal'
                                                    selected={!!store.starship && store.starship.uid == starship.uid
                                                        ? true
                                                        : !!store.starshipEdit && store.starshipEdit.uid == starship.uid ? true : false}
                                                    value={starship.uid}>{starship.uid} - {starship.name}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="form-floating mb-3" hidden={!!store.starship ? false : true}>
                            <input
                                type="text"
                                className="form-control input-modal"
                                id="name"
                                name='name'
                                placeholder='Name'
                                onChange={actions.handleChange}
                                defaultValue={!!store.starship ? store.starship.properties.name : !!store.starshipEdit ? store.starshipEdit.name : ""}
                            />
                            <label className='text-warning' htmlFor="floatingInput">Name</label>
                        </div>
                        <div className="form-floating mb-3" hidden={!!store.starship ? false : true}>
                            <input
                                type="text"
                                className="form-control input-modal"
                                id="url"
                                name='url'
                                placeholder='URL'
                                defaultValue={!!store.starship ? store.starship.properties.url : !!store.starshipEdit ? store.starshipEdit.url : store.url}
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
                                defaultValue={!!store.starship ? store.starship.description : ""} />
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control input-modal"
                                id="model"
                                name='model'
                                placeholder='Model'
                                onChange={actions.handleChange}
                                defaultValue={!!store.starship ? store.starship.properties.model : ""} />
                            <label className='text-warning' htmlFor="floatingInput">Model</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control input-modal"
                                id="class"
                                name='class'
                                placeholder='Starship Class'
                                onChange={actions.handleChange}
                                defaultValue={!!store.starship ? store.starship.properties.starship_class : ""} />
                            <label className='text-warning' htmlFor="floatingInput">Starship Class</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control input-modal"
                                id="manufacturer"
                                name='manufacturer'
                                placeholder='manufacturer'
                                onChange={actions.handleChange}
                                defaultValue={!!store.starship ? store.starship.properties.manufacturer : ""} />
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
                                defaultValue={!!store.starship ? store.starship.properties.cost_in_credits : ""} />
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
                                defaultValue={!!store.starship ? store.starship.properties.length : ""} />
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
                                defaultValue={!!store.starship ? store.starship.properties.crew : ""} />
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
                                defaultValue={!!store.starship ? store.starship.properties.passengers : ""} />
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
                                defaultValue={!!store.starship ? store.starship.properties.max_atmosphering_speed : ""} />
                            <label className='text-warning' htmlFor="floatingInput">Max Atmosphering Speed</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="number"
                                className="form-control input-modal"
                                id="hyperdrive"
                                name='hyperdrive'
                                placeholder='Hyperdrive Rating'
                                onChange={actions.handleChange}
                                defaultValue={!!store.starship ? store.starship.properties.hyperdrive_rating : ""} />
                            <label className='text-warning' htmlFor="floatingInput">Hyperdrive Rating</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="number"
                                className="form-control input-modal"
                                id="mglt"
                                name='mglt'
                                placeholder='mglt'
                                onChange={actions.handleChange}
                                defaultValue={!!store.starship ? store.starship.properties.MGLT : ""} />
                            <label className='text-warning' htmlFor="floatingInput">mglt</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="number"
                                className="form-control input-modal"
                                id="cargoCapacity"
                                name='cargoCapacity'
                                placeholder='Cargo Capacity'
                                onChange={actions.handleChange}
                                defaultValue={!!store.starship ? store.starship.properties.cargo_capacity : ""} />
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
                                defaultValue={!!store.starship ? store.starship.properties.consumables : ""} />
                            <label className='text-warning' htmlFor="floatingInput">Consumables</label>
                        </div>

                        <div className="form-floating mb-3" hidden={!!store.starship ? false : true}>
                            <input
                                type="text"
                                className="form-control input-modal"
                                id="created"
                                name='created'
                                placeholder='Created Date'
                                readOnly
                                defaultValue={!!store.starship ? new Date(store.starship.properties.created).toLocaleString() : ""}
                            />
                            <label className='text-warning' htmlFor="floatingInput">Created Date</label>
                        </div>
                        <div className="form-floating mb-3" hidden={!!store.starship ? false : true}>
                            <input
                                type="text"
                                className="form-control input-modal"
                                id="edited"
                                name='edited'
                                placeholder='Edited Date'
                                readOnly
                                defaultValue={!!store.starship ? new Date(store.starship.properties.edited).toLocaleString() : ""} />
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
StarshipsDetailsModal.propTypes = {
    show: PropTypes.bool,
}
StarshipsDetailsModal.defaultProps = {
    show: false
}