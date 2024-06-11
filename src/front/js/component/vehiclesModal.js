import React, { useContext } from 'react'
import { Context } from '../store/appContext'
import PropTypes from "prop-types";

export const VehiclesModal = (...props) => {

    const { store, actions } = useContext(Context)

    return (

        <form className='modal' tabIndex="-1" style={{ display: store.showModal ? "inline-block" : "none" }}
            onSubmit={e => {
                e.preventDefault()
                actions.addVehicles()
                e.target.reset()
            }}>
            <div className="modal-dialog modal-dialog-centered p-1">
                <div className="modal-content usersModalContent p-2">
                    <div className="modal-header">
                        <h5 className="modal-title fw-bold text-white fs-4">Vehicles</h5>
                        <button type="reset" className="close btn btn-yellow fw-bold text-center fw-bold"
                            onClick={() => actions.handleDeleteModal()}>
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="form-floating mb-3">
                            <input
                                type="number"
                                className="form-control input-modal"
                                id="uid"
                                name='uid'
                                onChange={actions.handleChange}
                                placeholder='Vehicle Uid'
                            />
                            <label className='text-warning' htmlFor="floatingInput">Vehicle Uid</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control input-modal"
                                id="name"
                                name='name'
                                placeholder='Name'
                                onChange={actions.handleChange}
                            />
                            <label className='text-warning' htmlFor="floatingInput">Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control input-modal"
                                id="url"
                                name='url'
                                placeholder='URL'
                                value={`https://www.swapi.tech/api/vehicles/${store.uid}`}
                                onChange={actions.handleChange}
                                readOnly
                            />
                            <label className='text-warning' htmlFor="floatingInput"></label>
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
VehiclesModal.propTypes = {
    show: PropTypes.bool,
}
VehiclesModal.defaultProps = {
    show: false
}