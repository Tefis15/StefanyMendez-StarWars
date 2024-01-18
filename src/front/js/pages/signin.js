import React, { useContext, useEffect, useState } from 'react'
import '../../styles/signin.css'
import { Link, useNavigate } from 'react-router-dom'
import { Context } from '../store/appContext'

const Signin = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()
    const [showPass, setShowPass] = useState(false)
    const [showConfirmPass, setShowConfirmPass] = useState(false)

    /*  useEffect(()=>{
         store.is_logued ? navigate('/') : null
     },[store.is_logued])
  */
    return (
        <div className='container-signin pb-4'>
            <div className='text-center'>
                <img className='img-form-signin mt-5' src='https://png.pngtree.com/png-vector/20230816/ourmid/pngtree-this-is-a-star-wars-chewy-face-decal-sticker-clipart-vector-png-image_6977660.png' ></img>
            </div>
            <form className="row g-3 mx-4 mt-2" onSubmit={(e) => {
                e.preventDefault()
                actions.addUser()
                e.target.reset()
            }}>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control input-signin"
                        id="name"
                        name='name'
                        onChange={actions.handleChange}
                        placeholder='Name'
                    />
                    <label className='text-warning' htmlFor="name">Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control input-signin"
                        id="phone"
                        name='phone'
                        onChange={actions.handleChange}
                        placeholder='Phone'
                    />
                    <label className='text-warning' htmlFor="phone">Phone</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="email"
                        className="form-control input-signin"
                        id="email"
                        name='email'
                        onChange={actions.handleChange}
                        placeholder="name@example.com" />
                    <label className='text-warning' htmlFor="email">Email address</label>
                </div>
                <div className="form-floating d-flex position-relative align-items-center">
                    <input
                        type={showPass ? "text" : "password"}
                        className="form-control input-signin"
                        id="password"
                        name='password'
                        onChange={actions.handleChange}
                        placeholder="Password"
                    />
                    <div onClick={() => { setShowPass(!showPass) }}>
                        {showPass ?
                            <i className="fa-solid fa-eye text-yellow"></i> :
                            <i className="fa-solid fa-eye-slash text-yellow"></i>
                        }
                    </div>
                    <label className="text-warning" htmlFor="password">Password</label>
                </div>
                <div className="form-floating d-flex position-relative align-items-center">
                    <input
                        type={showConfirmPass ? "text" : "password"}
                        className="form-control input-signin"
                        id="confirmPassword"
                        name='confirmPassword'
                        onChange={actions.handleChange}
                        placeholder="Password"
                    />
                    <div onClick={() => { setShowConfirmPass(!showConfirmPass) }}>
                        {showConfirmPass ?
                            <i className="fa-solid fa-eye text-yellow"></i> :
                            <i className="fa-solid fa-eye-slash text-yellow"></i>
                        }
                    </div>
                    <label className="text-warning" htmlFor="confirmPassword">Confirm Password</label>
                </div>
                <div className='text-center mb-2'>
                    <button className="btn btn-yellow mt-2" type="submit">SignIn</button>
                    <div className='text-end text-yellow'>
                        <Link to="/login" className='text-decoration-none text-yellow'>
                            <span>or LogIn <i className="fa-solid fa-shuttle-space"></i></span>
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default Signin