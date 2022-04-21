import React from 'react';
import '../Styles/Home.scss';
// TODO: Re-add email input
// import EmailInput from '../Components/EmailInput';
import HomeGraphic from '../Assets/home-page-graphic.png';
import DownArrow from '../Assets/down-arrow.png';
import HomeGraphicMobile from '../Assets/home-page-graphic-mobile.png';
import forwardArrow from '../Assets/color-right-arrow.png';

const Home = () => {
  return (
    <div>
      <div className="Home">
        <div className="home-section">
          <div className="home-logo">
            <img src={HomeGraphic} alt="" className="home-graphic" />
            <img src={HomeGraphicMobile} alt="" className="home-graphic-mobile" />
          </div>
          <div className="home-intro">
            <h1 className="home-title"> eHacks</h1>
            <p className="home-text2">
              February 5, 2022 - February 6, 2022
            </p>
            <p className="home-text1">
              Join us and 200 other technology-focused and business-focused students for 24 hours of learning, networking, and prototyping!
            </p>

            <p className="home-text1">
              100% Free and 100% Life Changing
            </p>
            {/* <EmailInput></EmailInput>*/}
            <div className="home__buttons">
            </div>

            <p className="home-text2 center-mobile">
            </p>
            <a href="/login">
              <button className="portal-link">Hacker Portal<img className="next-arrow" src={forwardArrow} alt='arrow'/></button>
            </a>
         
          </div>
        </div>
        <div className="scroll">
          Scroll for More
          <img src={DownArrow} alt="" className="down-arrow"/>
        </div>
      </div>
    </div>
  );
};

export default Home;
