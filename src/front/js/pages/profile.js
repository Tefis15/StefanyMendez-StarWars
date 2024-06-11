import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/profile.css";

export const Profile = () => {
    const { store, actions } = useContext(Context);
    const [showPass, setShowPass] = useState(false)
    const [showConfirmPass, setShowConfirmPass] = useState(false)

    useEffect(()=>{
        
     },[store.userLogin])
  

    return (

        <div className='container container-profile pb-5'>
            <div className='text-center'>
                <img className='img-form-profile mt-5' src='https://mir-s3-cdn-cf.behance.net/project_modules/disp/691daf33084637.569f59c582a9b.gif' ></img>
            </div>
            <form className="row g-3 mx-4 mt-2" onSubmit={(e)=>{
                e.preventDefault()
                actions.editUser(store.userLogin.email)
                e.target.reset()
            }}>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control input-profile"
                        id="name"
                        name="name"
                        defaultValue={!!store.userLogin ? store.userLogin.name : ""}
                        readOnly
                    />
                    <label className='text-warning' htmlFor="floatingInput">Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="email"
                        className="form-control input-profile"
                        id="email"
                        name="email"
                        defaultValue={!!store.userLogin ? store.userLogin.email : ""}
                        readOnly
                    />
                    <label className='text-warning' htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control input-profile"
                        defaultValue={!!store.userLogin ? store.userLogin.phone : ""}
                        id="phone"
                        name="phone"
                        onChange={actions.handleChange}
                        placeholder='Phone'
                    />
                    <label className='text-warning' htmlFor="floatingInput">Phone</label>
                </div>
                <div className="form-floating d-flex position-relative align-items-center">
                    <input
                        type={showPass ? "text" : "password"}
                        className="form-control input-profile "
                        id="floatingPassword"
                        name="password"
                        onChange={actions.handleChange}
                        placeholder="Password" />
                    <div onClick={() => { setShowPass(!showPass) }}>
                        {showPass ?
                            <i className="fa-solid fa-eye text-warning"></i> :
                            <i className="fa-solid fa-eye-slash text-warning"></i>
                        }
                    </div>
                    <label className="text-warning" htmlFor="floatingPassword">New Password</label>
                </div>
                <div className="form-floating d-flex position-relative align-items-center">
                    <input
                        type={showConfirmPass ? "text" : "password"}
                        className="form-control input-profile"
                        id="confirmPassword"
                        name="confirmPassword"
                        onChange={actions.handleChange}
                        placeholder="Password" />
                    <div onClick={() => { setShowConfirmPass(!showConfirmPass) }}>
                        {showConfirmPass ?
                            <i className="fa-solid fa-eye text-warning"></i> :
                            <i className="fa-solid fa-eye-slash text-warning"></i>
                        }
                    </div>
                    <label className="text-warning" htmlFor="floatingPassword">Confirm Password</label>
                </div>
                <div className='text-center mb-2'>
                    <button className="btn btn-yellow mt-2" type="submit" >Save Chages
                    </button>
                </div>
            </form>
        </div>
    )
}