import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/profile.css";

export const Profile = () => {
    const { store, actions } = useContext(Context);
    const [showPass, setShowPass] = useState(false)
    const [showConfirmPass, setShowConfirmPass] = useState(false)

    return (

        <div className='container container-profile pb-5'>
            <div className='text-center'>
                <img className='img-form-profile mt-5' src='https://mir-s3-cdn-cf.behance.net/project_modules/disp/691daf33084637.569f59c582a9b.gif' ></img>
            </div>
            <form className="row g-3 mx-4 mt-2">
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control input-profile"
                        id="floatingInput" 
                        placeholder='Stefany'
                        defaultValue="Stefany"
                        readOnly
                    />
                    <label className='text-warning' for="floatingInput">Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="email"
                        className="form-control input-profile"
                        id="floatingInput"
                        defaultValue="tefa15@hotmail.es"
                        readOnly
                    />
                    <label className='text-warning' for="floatingInput">Email address</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control input-profile"
                        defaultValue="85984225"
                        id="floatingInput"
                        placeholder='Phone'
                    />
                    <label className='text-warning' for="floatingInput">Phone</label>
                </div>
                <div className="form-floating d-flex position-relative align-items-center">
                    <input type={showPass ? "text" : "password"} className="form-control input-profile " id="floatingPassword" placeholder="Password" />
                    <div onClick={() => { setShowPass(!showPass) }}>
                        {showPass ?
                            <i className="fa-solid fa-eye text-warning"></i> :
                            <i className="fa-solid fa-eye-slash text-warning"></i>
                        }
                    </div>
                    <label className="text-warning" for="floatingPassword">New Password</label>
                </div>
                <div className="form-floating d-flex position-relative align-items-center">
                    <input type={showConfirmPass ? "text" : "password"} className="form-control input-profile" id="floatingPassword" placeholder="Password" />
                    <div onClick={() => { setShowConfirmPass(!showConfirmPass) }}>
                        {showConfirmPass ?
                            <i className="fa-solid fa-eye text-warning"></i> :
                            <i className="fa-solid fa-eye-slash text-warning"></i>
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
                    }>Save Chages
                    </button>
                </div>
            </form>
        </div>
    )
}