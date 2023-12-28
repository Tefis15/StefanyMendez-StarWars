import React, { useContext, useEffect } from 'react'
import '../../styles/forgetPass.css'
import { Link, useNavigate } from 'react-router-dom'
import { Context } from '../store/appContext'

const ForgetPass = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()

    /*  useEffect(()=>{
         store.is_logued ? navigate('/') : null
     },[store.is_logued])
  */
    return (
        <div className='container-forget-pass pb-3'>
            <div className='text-center'>
                <img className='img-form-forget-pass mt-5' src='https://mir-s3-cdn-cf.behance.net/project_modules/hd/a9dbaa32212593.5673bfaac1156.png' ></img>
            </div>
            <form className="row g-3 mx-4 mt-2">
                <div className="form-floating mb-3">
                    <input type="email" className="form-control input-forget-pass" id="floatingInput" placeholder="name@example.com" />
                    <label className='text-warning' for="floatingInput">Email address</label>
                </div>
                <div className='text-center mb-2'>
                    <button className="btn btn-yellow" type="submit" onClick={() => {
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
                    }>Send Email
                    </button>
                    <div className='text-end text-warning'>
                        <Link to="/login" className='text-decoration-none text-warning'>
                            <span>or LogIn <i class="fa-solid fa-shuttle-space"></i></span>
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default ForgetPass