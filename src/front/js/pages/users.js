import React, { useContext, useEffect, useState } from 'react'
import '../../styles/users.css'
import { useNavigate } from 'react-router-dom'
import { Context } from '../store/appContext'
import { UsersTable } from '../component/usersTable'
import { UserModal } from '../component/userModal'

export const Users = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()

    useEffect(() => {
        actions.getAllUsers()
        !store.isLoggedIn || store.userLogin.role == "user" ? navigate('/login') : null
    }, [store.userEdited, store.showModal, store.deleted])

    return (
        <>
            <div className='container mt-5'>
                <div className='text-end mb-3'>

                    <button className='btn btn-yellow me-2'
                        onClick={() => { actions.handleShowModal() }}>
                        Add New <i className="fa-solid fa-plus"></i>
                    </button>
                </div>
                <div className='table-responsive'>
                    <table className="table fs-5">
                        <thead>
                            <tr>
                                <th scope="col" className='text-center'>ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col" className='text-center'>Phone</th>
                                <th scope="col" className='text-center'>Role</th>
                                <th scope="col" className='text-center'>Active</th>
                                <th scope="col">Actions</th>

                            </tr>
                        </thead>
                        <tbody>
                            {!!store.users && store.users.map((user, index) => {
                                return (
                                    <UsersTable key={index} user={user} />
                                )
                            })}

                        </tbody>
                    </table>
                </div>
            </div>
            <UserModal show={store.showModal} />
        </>
    )
}