import React from 'react'
import PropTypes from "prop-types";
import "../../styles/home.css"

const CarouselHome = ({ urlImg, title, year, description, active }, ...props) => {
  return (

    <div className={`carousel-item ${active}`} data-bs-interval="10000">

      <div className='row row-cols-2 row-cols-md-2 rows-cols-sm-2 rows-cols-lg-2'>
        <div className='col'>
          <h2 className='title-movie'>{title} <span className='fst-italic'>{year}</span></h2>
          <p className='text-movie'>{description}</p>
        </div>
        <div className='col'>
          <img className='img-movie rounded' src={urlImg} alt="Poster Movie" />
        </div>
      </div>
    </div>

  )
  CarouselHome.propTypes = {
    urlImg: PropTypes.string,
    title: PropTypes.string,
    year: PropTypes.string,
    description: PropTypes.string,
    active: PropTypes.string
  }
}
export default CarouselHome