import React, { useContext, useEffect } from 'react'
import '../../styles/forgetPass.css'
import { Link, useNavigate } from 'react-router-dom'
import { Context } from '../store/appContext'

const ForgetPass = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()

     useEffect(()=>{
         store.emailSent ? navigate('/login') : null
     },[store.emailSent])
  
    return (
        <div className='container-forget-pass pb-3'>
            <div className='text-center'>
                <img className='img-form-forget-pass mt-5' src='https://mir-s3-cdn-cf.behance.net/project_modules/hd/a9dbaa32212593.5673bfaac1156.png' ></img>
            </div>
            <form className="row g-3 mx-4 mt-2" onSubmit={(e)=>{
                e.preventDefault()
                actions.resetPassword()
            }}>
                <div className="form-floating mb-3">
                    <input type="email" name='email' className="form-control input-forget-pass" id="email" placeholder="name@example.com" onChange={actions.handleChange} />
                    <label className='text-warning' htmlFor="email">Email Address</label>
                </div>
                <div className='text-center mb-2'>
                    <button className="btn btn-yellow" type="submit"
                    >Send Email
                    </button>
                    <div className='text-end text-warning'>
                        <Link to="/login" className='text-decoration-none text-warning'>
                            <span>or LogIn <i className="fa-solid fa-shuttle-space"></i></span>
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default ForgetPass