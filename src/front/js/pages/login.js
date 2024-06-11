import React, { useContext, useEffect, useState } from 'react'
import '../../styles/login.css'
import { Link, useNavigate } from 'react-router-dom'
import { Context } from '../store/appContext'

const Login = () => {
    const { store, actions } = useContext(Context);
    const [showPass, setShowPass] = useState(false)
    const navigate = useNavigate()

     useEffect(()=>{
         store.isLoggedIn ? navigate('/') : null
     },[store.isLoggedIn])
  
    return (
        <div className='container-login pb-3'>
            <div className='text-center'>
                <img className='img-form-login mt-5' src='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/19cac168-e90a-4566-ab1a-353b45bcd138/dfad1ry-137c781b-823b-4675-b128-5de658c05e2a.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzE5Y2FjMTY4LWU5MGEtNDU2Ni1hYjFhLTM1M2I0NWJjZDEzOFwvZGZhZDFyeS0xMzdjNzgxYi04MjNiLTQ2NzUtYjEyOC01ZGU2NThjMDVlMmEucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.dUvx1qqFiztBegCskrsQFBGpLAb8baPXYD-1dih28HE' ></img>
            </div>
            <form className="row g-3 mx-4 mt-2" onSubmit={(e)=>{
                                e.preventDefault()
                                actions.login()
            }}>
                <div className="form-floating mb-3">
                    <input
                        type="email"
                        className="form-control input-login"
                        id="floatingInput"
                        placeholder="name@example.com"
                        name='email'
                        onChange={actions.handleChange} />
                    <label className='text-warning' htmlFor="floatingInput">Email Address</label>
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
                <div className='text-start text-warning'>
                    <Link to="/forgetpass" className='text-decoration-none text-yellow'>
                        <span>Forget Password?</span>
                    </Link>
                </div>
                <div className='text-center mb-2'>
                    <button className="btn btn-yellow">LogIn
                    </button>
                    <div className='text-end text-yellow'>
                        <Link to="/signin" className='text-decoration-none text-yellow'>
                            <span>or SignIn <i className="fa-solid fa-shuttle-space"></i></span>
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login