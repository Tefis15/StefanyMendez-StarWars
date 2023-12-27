import React, { useContext, useEffect, useState } from 'react'
import '../../styles/login.css'
import { Link, useNavigate } from 'react-router-dom'
import { Context } from '../store/appContext'

const Login = () => {
    const { store, actions } = useContext(Context);
    const [showPass, setShowPass] = useState(false)
    const navigate = useNavigate()

    /*  useEffect(()=>{
         store.is_logued ? navigate('/') : null
     },[store.is_logued])
  */
    return (
        <div className='container-login pb-3'>
            <div className='text-center'>
                <img className='img-form-login mt-5' src='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/19cac168-e90a-4566-ab1a-353b45bcd138/dfad1ry-137c781b-823b-4675-b128-5de658c05e2a.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzE5Y2FjMTY4LWU5MGEtNDU2Ni1hYjFhLTM1M2I0NWJjZDEzOFwvZGZhZDFyeS0xMzdjNzgxYi04MjNiLTQ2NzUtYjEyOC01ZGU2NThjMDVlMmEucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.dUvx1qqFiztBegCskrsQFBGpLAb8baPXYD-1dih28HE' ></img>
            </div>
            <form className="row g-3 mx-4 mt-2">
                <div className="form-floating mb-3">
                    <input type="email" className="form-control input-login" id="floatingInput" placeholder="name@example.com" />
                    <label className='text-warning' for="floatingInput">Email address</label>
                </div>
                <div className="form-floating d-flex position-relative align-items-center">
                    <input type={showPass ? "text" : "password"} className="form-control input-login" id="floatingPassword" placeholder="Password" />
                    <div onClick={() => { setShowPass(!showPass) }}>
                        {showPass ?
                            <i className="fa-solid fa-eye text-warning"></i> :
                            <i class="fa-solid fa-eye-slash text-warning"></i>
                        }
                    </div>
                    <label className="text-warning" for="floatingPassword">Password</label>
                </div>
                <div className='text-start text-warning'>
                    <Link to="/forgetpass" className='text-decoration-none text-warning'>
                        <span>Forget Password?</span>
                    </Link>
                </div>
                <div className='text-center mb-2'>
                    <button className="btn btn-warning" type="submit" onClick={() => {

                        Swal.fire({
                            title: "Welcome Back",
                            timer: 2000,
                            padding: "2em",
                            color: "#FFC107",
                            showConfirmButton: false,
                            background: `#000000
                            url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7ce55e30-e602-4e3d-b05a-d2a7a0fa49d8/daqj3gl-9a94472a-1945-4acd-ac69-b8eba9806db9.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzdjZTU1ZTMwLWU2MDItNGUzZC1iMDVhLWQyYTdhMGZhNDlkOFwvZGFxajNnbC05YTk0NDcyYS0xOTQ1LTRhY2QtYWM2OS1iOGViYTk4MDZkYjkucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.pSd9UXJUti2afeziH1UqbQzFGAnKPSWtnjukxIAqnO8") 
                            no-repeat
                            `,
                            showclass: {
                                popup: `animate__animated
                                animate__fadeInUp
                                animate__faster`
                            },
                            hideClass: {
                                popup: `animate__animated
                                animate__fadeOutDown
                                animate__faster`
                            },
                            backdrop: `
                            rgba(0,0,123,0.4)
                            url("https://media.tenor.com/ONv6f0zBNFYAAAAj/hugging-grogu.gif")
                            right top 
                            no-repeat
                            `
                        })
                    }
                    }>LogIn
                    </button>
                    <div className='text-end text-warning'>
                        <Link to="/signin" className='text-decoration-none text-warning'>
                            <span>or SignIn <i class="fa-solid fa-shuttle-space"></i></span>
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login