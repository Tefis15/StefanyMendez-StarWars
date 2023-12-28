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
            <form className="row g-3 mx-4 mt-2">
                <div className="form-floating mb-3">
                    <input type="text" className="form-control input-signin" id="floatingInput" placeholder='Name' />
                    <label className='text-warning' for="floatingInput">Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control input-signin" id="floatingInput" placeholder='Phone' />
                    <label className='text-warning' for="floatingInput">Phone</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="email" className="form-control input-signin" id="floatingInput" placeholder="name@example.com" />
                    <label className='text-warning' for="floatingInput">Email address</label>
                </div>
                <div className="form-floating d-flex position-relative align-items-center">
                    <input type={showPass ? "text" : "password"} className="form-control input-signin" id="floatingPassword" placeholder="Password" />
                    <div onClick={() => { setShowPass(!showPass) }}>
                        {showPass ?
                            <i className="fa-solid fa-eye text-yellow"></i> :
                            <i class="fa-solid fa-eye-slash text-yellow"></i>
                        }
                    </div>
                    <label className="text-warning" for="floatingPassword">Password</label>
                </div>
                <div className="form-floating d-flex position-relative align-items-center">
                    <input type={showConfirmPass ? "text" : "password"} className="form-control input-signin" id="floatingPassword" placeholder="Password" />
                    <div onClick={() => { setShowConfirmPass(!showConfirmPass) }}>
                        {showConfirmPass ?
                            <i className="fa-solid fa-eye text-yellow"></i> :
                            <i class="fa-solid fa-eye-slash text-yellow"></i>
                        }
                    </div>
                    <label className="text-warning" for="floatingPassword">Confirm Password</label>
                </div>
                <div className='text-center mb-2'>
                    <button className="btn btn-yellow mt-2" type="submit" onClick={() => {
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
                    }>SignIn
                    </button>
                    <div className='text-end text-yellow'>
                        <Link to="/login" className='text-decoration-none text-yellow'>
                            <span>or LogIn <i class="fa-solid fa-shuttle-space"></i></span>
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default Signin