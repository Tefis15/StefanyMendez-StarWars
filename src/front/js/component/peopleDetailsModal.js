import React, { useContext, useEffect } from 'react'
import { Context } from '../store/appContext'
import PropTypes from "prop-types";

export const PeopleDetailsModal = (...props) => {

    const { store, actions } = useContext(Context)

    return (

        <form className='modal' tabIndex="-1" style={{ display: store.showModalDetails ? "inline-block" : "none" }}
            onSubmit={e => {
                e.preventDefault()
                if(!!store.character){
                    actions.editPeopleDetails(store.character.uid)
                    e.target.reset()
                }else{
                    actions.addPeopleDetails()
                    e.target.reset()
                }
            }}>
            <div className="modal-dialog modal-dialog-centered p-1">
                <div className="modal-content usersModalContent p-2">
                    <div className="modal-header">
                        <h5 className="modal-title fw-bold text-white fs-4">People Details</h5>
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
                                    {!!store.character || store.characterEdit ?
                                        <option
                                            className='option-modal'
                                            selected={!!store.character ? true : true}>
                                            {!!store.character ? store.character.uid : store.characterEdit.uid} - {!!store.character ? store.character.properties.name : store.characterEdit.name}
                                        </option>
                                        :
                                        !!store.people && store.people.map((character, index) => {
                                            return (
                                                <option key={index}
                                                    className='option-modal'
                                                    selected={!!store.character && store.character.uid == character.uid ? true : !!store.characterEdit && store.characterEdit.uid == character.uid ? true : false}
                                                    value={character.uid}>{character.uid} - {character.name}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="form-floating mb-3" hidden={!!store.character ? false : true}>
                            <input
                                type="text"
                                className="form-control input-modal"
                                id="name"
                                name='name'
                                placeholder='Name'
                                onChange={actions.handleChange}
                                defaultValue={!!store.character ? store.character.properties.name : !!store.characterEdit ? store.characterEdit.name : ""}
                            />
                            <label className='text-warning' htmlFor="floatingInput">Name</label>
                        </div>
                        <div className="form-floating mb-3" hidden={!!store.character ? false : true}>
                            <input
                                type="text"
                                className="form-control input-modal"
                                id="url"
                                name='url'
                                placeholder='URL'
                                defaultValue={!!store.character ? store.character.properties.url : !!store.characterEdit ? store.characterEdit.url : store.url}
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
                                defaultValue={!!store.character ? store.character.description : ""} />
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="number"
                                className="form-control input-modal"
                                id="height"
                                name='height'
                                placeholder='Height'
                                onChange={actions.handleChange}
                                defaultValue={!!store.character ? store.character.properties.height : ""} />
                            <label className='text-warning' htmlFor="floatingInput">Height</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="number"
                                className="form-control input-modal"
                                id="mass"
                                name='mass'
                                placeholder='Mass'
                                onChange={actions.handleChange}
                                defaultValue={!!store.character ? store.character.properties.mass : ""} />
                            <label className='text-warning' htmlFor="floatingInput">Mass</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control input-modal"
                                id="skinColor"
                                name='skinColor'
                                placeholder='Skin Color'
                                onChange={actions.handleChange}
                                defaultValue={!!store.character ? store.character.properties.skin_color : ""} />
                            <label className='text-warning' htmlFor="floatingInput">Skin Color</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control input-modal"
                                id="eyeColor"
                                name='eyeColor'
                                placeholder='Eye Color'
                                onChange={actions.handleChange}
                                defaultValue={!!store.character ? store.character.properties.eye_color : ""} />
                            <label className='text-warning' htmlFor="floatingInput">Eye Color</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control input-modal"
                                id="birthYear"
                                name='birthYear'
                                placeholder='Birth Year'
                                onChange={actions.handleChange}
                                defaultValue={!!store.character ? store.character.properties.birth_year : ""} />
                            <label className='text-warning' htmlFor="floatingInput">Birth Year</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control input-modal"
                                id="gender"
                                name='gender'
                                placeholder='Gender'
                                onChange={actions.handleChange}
                                defaultValue={!!store.character ? store.character.properties.gender : ""} />
                            <label className='text-warning' htmlFor="floatingInput">Gender</label>
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="homeworld" className="modal-label-input text-warning">Homeworld</label>
                            <div className="input-group group-user-modal mb-3 input-select">
                                <select className="form-select select-modal" id="inputGroupRoles" onChange={actions.handleChange} name='homeworld'>
                                    <option className='option-modal' defaultValue="null">Select the Homeworld</option>
                                    {!!store.planets && store.planets.map((planet, index) => {
                                        return (
                                            <option key={index}
                                                className='option-modal'
                                                selected={!!store.character && store.character.properties.homeworld.uid == planet.uid ? true : false}
                                                value={planet.uid}>
                                                {planet.uid} - {planet.name}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="form-floating mb-3" hidden={!!store.character ? false : true}>
                            <input
                                type="text"
                                className="form-control input-modal"
                                id="created"
                                name='created'
                                placeholder='Created Date'
                                readOnly
                                defaultValue={!!store.character ? new Date(store.character.properties.created).toLocaleString() : ""}
                            />
                            <label className='text-warning' htmlFor="floatingInput">Created Date</label>
                        </div>
                        <div className="form-floating mb-3" hidden={!!store.character ? false : true}>
                            <input
                                type="text"
                                className="form-control input-modal"
                                id="edited"
                                name='edited'
                                placeholder='Edited Date'
                                readOnly
                                defaultValue={!!store.character ? new Date(store.character.properties.edited).toLocaleString()  : ""} />
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
PeopleDetailsModal.propTypes = {
    show: PropTypes.bool,
}
PeopleDetailsModal.defaultProps = {
    show: false
}