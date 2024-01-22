import React, { useContext, useEffect } from "react";
import '../../styles/people.css'
import PropTypes from "prop-types"
import { Context } from "../store/appContext";
import { UserModal } from "./userModal";

export const UsersTable = ({ user }, ...props) => {
    const { store, actions } = useContext(Context);

    return (
        <>
            <tr className='row-table'>
                <th scope="row" className='text-center'>{user.id}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td className="text-center">{user.phone}</td>
                <td className="text-center">{user.role}</td>
                <td>
                    <div className="form-check d-flex justify-content-center">
                        <input
                            className="form-check-input"
                            name="isActive"
                            type="checkbox"
                            onChange={actions.handleChange}
                            onMouseDown={actions.handleChange}
                            checked={!!store.users && user.is_active ? true : false}
                            value={user.is_active ? false : true}
                            onClick={() => {
                                actions.editUserActiveAdmin(user.id)
                            }}
                            id="isActive"
                        />
                    </div></td>
                <td>

                    <button className="btn btn-yellow  me-2 fw-bold" onClick={() => {
                        actions.getUserById(user.id)
                        actions.handleShowModal()
                    }}>
                        <i className="fa-solid fa-pen"></i>
                    </button>
                    <button className="btn btn-trash  fw-bold"
                        onClick={() =>
                            Swal.fire({
                                title: 'Are you sure?',
                                text: "You won't be able to revert this!",
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#d33',
                                cancelButtonColor: '#34AACB',
                                confirmButtonText: 'Yes, delete it!',
                                padding: "2em",
                                color: "#FFC107",
                                background: `#000000
                                url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7ce55e30-e602-4e3d-b05a-d2a7a0fa49d8/daqj3gl-9a94472a-1945-4acd-ac69-b8eba9806db9.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzdjZTU1ZTMwLWU2MDItNGUzZC1iMDVhLWQyYTdhMGZhNDlkOFwvZGFxajNnbC05YTk0NDcyYS0xOTQ1LTRhY2QtYWM2OS1iOGViYTk4MDZkYjkucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.pSd9UXJUti2afeziH1UqbQzFGAnKPSWtnjukxIAqnO8") 
                                no-repeat
                                `,
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    actions.deleteUser(user.id, user.name)
                                }
                            })
                        }>
                        <i className="fa-solid fa-trash-can"></i>
                    </button>
                </td>
            </tr>

        </>
    )
}
UsersTable.propTypes = {
    user: PropTypes.object
}