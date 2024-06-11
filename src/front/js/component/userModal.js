import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../store/appContext'
import PropTypes from "prop-types";

export const UserModal = (...props) => {

    const { store, actions } = useContext(Context)
    const [showPass, setShowPass] = useState(false)


    return (

        <form className='modal' tabIndex="-1" style={{ display: store.showModal ? "inline-block" : "none" }}
            onSubmit={e => {
                e.preventDefault()
                if(!!store.user){
                    actions.editUserAdmin(store.user.id)
                    e.target.reset()
                }else{
                    actions.addUserAdmin()
                    e.target.reset()
                }
            }}>
            <div className="modal-dialog modal-dialog-centered p-1">
                <div className="modal-content usersModalContent p-2">
                    <div className="modal-header">
                        <h5 className="modal-title fw-bold text-white fs-4">User {!!store.user ? store.user.id : null}</h5>
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
                                id="name"
                                name='name'
                                placeholder='Name'
                                onChange={actions.handleChange}
                                defaultValue={!!store.user ? store.user.name : ""}
                            />
                            <label className='text-warning' htmlFor="floatingInput">Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="email"
                                className="form-control input-modal"
                                id="email"
                                name='email'
                                placeholder='Email'
                                onChange={actions.handleChange}
                                defaultValue={!!store.user ? store.user.email : ""}
                            />
                            <label className='text-warning' htmlFor="floatingInput">Email</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control input-modal"
                                id="phone"
                                name='phone'
                                placeholder='Phone'
                                onChange={actions.handleChange}
                                defaultValue={!!store.user ? store.user.phone : ""}
                            />
                            <label className='text-warning' htmlFor="floatingInput">Phone</label>
                        </div>
                        <div className="form-floating d-flex position-relative align-items-center">
                            <input
                                type={showPass ? "text" : "password"}
                                className="form-control input-login"
                                id="floatingPassword"
                                name='password'
                                onChange={actions.handleChange}
                                placeholder="Password" />
                            <div onClick={() => { setShowPass(!showPass) }}>
                                {showPass ?
                                    <i className="fa-solid fa-eye text-yellow"></i> :
                                    <i className="fa-solid fa-eye-slash text-yellow"></i>
                                }
                            </div>
                            <label className="text-warning" htmlFor="floatingPassword">Password</label>
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="role" className="modal-label-input text-warning">Role</label>
                            <div className="input-group group-user-modal mb-3 input-select">
                                <select className="form-select select-modal" id="inputGroupRoles" onChange={actions.handleChange} name='role'>
                                    <option className='option-modal'>Select the Role</option>
                                    <option
                                        className='option-modal'
                                        selected={!!store.user && store.user.role == "admin" ? true : false}
                                        value="admin">Admin
                                    </option>
                                    <option
                                        className='option-modal'
                                        selected={!!store.user && store.user.role == "user" ? true : false}
                                        value="user">User
                                    </option>
                                </select>
                            </div>
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
UserModal.propTypes = {
    show: PropTypes.bool,
}
UserModal.defaultProps = {
    show: false
}