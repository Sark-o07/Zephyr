import React from 'react'
import './Hero.css'
import star_icon from '../Assets/shooting-star.png'
import arrow_icon from '../Assets/arrow.png'
import hero_img from '../Assets/hero4.png'

export const Hero = () => {
  return (
    <div className='hero'>
        <div className="hero-left">
            <h2>LATEST TRENDS JUST IN ✨</h2>
            <div>
                <div className="hero-hand-icon">
                    <p>be</p>
                    <img src={star_icon} alt="" />
                </div>
                <p>the first</p>
                <p>to wear it</p>
            </div>
            <div className="hero-latest-btn">
                <div>Latest Collection</div>
                <img src={arrow_icon} alt="" />
            </div>
        </div>
        <div className="hero-right">
            <img src={hero_img} alt="" />
        </div>
    </div>
  )
}
