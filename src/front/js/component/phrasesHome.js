import React from 'react'
import PropTypes from "prop-types";
import "../../styles/home.css"

const PhrasesHome = ({ author, phrase, uid, active }, ...props) => {
    return (
        <>
            <div className={`carousel-item ${active}`}>
                <div className='row row-cols-1 row-cols-md-2 rows-cols-sm-1 rows-cols-lg-2'>
                    <div className='col text-center'>
                        <img src={`https://starwars-visualguide.com/assets/img/characters/${uid}.jpg`} 
                            className="rounded" alt="Character Image" />
                    </div>
                    <div className='col text-white mt-5'>
                        <h1 className='author-phrases'>{author}</h1>
                        <p className='text-phrases'>{phrase}</p>
                    </div>
                </div>
            </div>
        </>
    )
    PhrasesHome.propTypes = {
        author: PropTypes.string,
        phrase: PropTypes.string,
        uid: PropTypes.string,
        active: PropTypes.string
    }
}
export default PhrasesHome