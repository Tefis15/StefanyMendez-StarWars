import React from 'react'
import { useState, useEffect } from 'react'
import "../../styles/index.css"

const BackToTopBtn = () => {

    const [backToTopBtn, setbackToTopBtn] = useState(false);

    const handleVisibility = () => {
        if (window.scrollY > 100) {
            setbackToTopBtn(true)
        } else {
            setbackToTopBtn(false)
        }
    }
    useEffect(() => {
        window.addEventListener("scroll", handleVisibility)
        return () => window.removeEventListener("scroll", handleVisibility)
    }, [])
    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }
    return (
        <div className='go-top-btn rounded-circle'>
            {backToTopBtn && (
                <div onClick={scrollUp}  >
                    <i className="fa-brands fa-space-awesome fs-4"></i>
                </div>
                )
            }
        </div>
    )
}
export default BackToTopBtn