import React, { useContext } from 'react'
import { Context } from '../store/appContext'
import PropTypes from "prop-types";

export const PeopleModal = (...props) => {

    const { store, actions } = useContext(Context)

    return (

        <form className='modal' tabIndex="-1" style={{ display: store.showModal ? "inline-block" : "none" }}>
            <div className="modal-dialog modal-dialog-centered p-1">
                <div className="modal-content usersModalContent p-2">
                    <div className="modal-header">
                        <h5 className="modal-title fw-bold text-white fs-4">People</h5>
                        <button type="reset" className="close btn btn-yellow fw-bold text-center fw-bold"
                            onClick={() => actions.handleDeleteModal()}>
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control input-modal"
                                id="peopleUid"
                                name='peopleUid'
                                placeholder='People Uid' />
                            <label className='text-warning' for="floatingInput">People Uid</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control input-modal"
                                id="name"
                                name='name'
                                placeholder='Name' />
                            <label className='text-warning' for="floatingInput">Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control input-modal"
                                id="description"
                                name='description'
                                placeholder='Description' />
                            <label className='text-warning' for="floatingInput">Description</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control input-modal"
                                id="height"
                                name='height'
                                placeholder='Height' />
                            <label className='text-warning' for="floatingInput">Height</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control input-modal"
                                id="mass"
                                name='mass'
                                placeholder='Mass' />
                            <label className='text-warning' for="floatingInput">Mass</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control input-modal"
                                id="skinColor"
                                name='skinColor'
                                placeholder='Skin Color' />
                            <label className='text-warning' for="floatingInput">Skin Color</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control input-modal"
                                id="eyeColor"
                                name='eyeColor'
                                placeholder='Eye Color' />
                            <label className='text-warning' for="floatingInput">Eye Color</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control input-modal"
                                id="birthYear"
                                name='birthYear'
                                placeholder='Birth Year' />
                            <label className='text-warning' for="floatingInput">Birth Year</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control input-modal"
                                id="gender"
                                name='gender'
                                placeholder='Gender' />
                            <label className='text-warning' for="floatingInput">Gender</label>
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="role" className="modal-label-input">Homeworld</label>
                            <div className="input-group group-user-modal mb-3 input-select">
                                <select className="form-select select-user-modal" id="inputGroupRoles" onChange={actions.handle_change} name='role'>
                                    <option className='option-user-modal' defaultValue="null">Select the planet</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control input-modal"
                                id="created"
                                name='created'
                                placeholder='Created Date'
                                readOnly
                                />
                            <label className='text-warning' for="floatingInput">Created Date</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control input-modal"
                                id="edited"
                                name='edited'
                                placeholder='Edited Date'
                                readOnly />
                            <label className='text-warning' for="floatingInput">Edited Date</label>
                        </div>
                        
                    </div>
                    <div className="modal-footer d-flex justify-content-center aligh-items-center">
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
PeopleModal.propTypes = {
    show: PropTypes.bool,
}
PeopleModal.defaultProps = {
    show: false
}