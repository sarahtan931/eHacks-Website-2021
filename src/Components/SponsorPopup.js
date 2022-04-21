import React from 'react';
import Instagram from '../Assets/instagram_logo.jpg';
import Facebook from '../Assets/facebook_logo.jpg';
import LinkedIn from '../Assets/linkedin_logo.jpg';
import '../Styles/SponsorPopup.scss';

export default function SponsorPopup() { 
  // Exit button 
  function ExitButton() {
    return (
      <div className="exit-button-container">
        <h1 className="exit">EXIT</h1>
      </div>
    );
  }

  // Content for the pop-up
  function SponsorUsContent(props) {
    return (
      <div className="content-container">
        <h1 className="title">{props.title}</h1>
        <p className="paragraph">{props.contentOne}</p>
        <p className="paragraph">{props.contentTwo}</p>
        <button className="button">{props.buttonText}</button>
        <p className="caption">{props.contentThree}</p>
      </div>
    );
  }

  // Social media images 
  function SocialMediaIcons() {
    return (
      <div className="social-media">
        <img className="social-media-icon" src={Instagram}/>
        <img className="social-media-icon" src={Facebook}/>
        <img className="social-media-icon" src={LinkedIn}/>
      </div>
    );
  }

  return (
    <div className="sponsor-popup-container">
      <ExitButton />
      <SponsorUsContent title="Sponsor Us" contentOne="Interested in recruiting top talent? Gaining brand recognition? Connecting with students?" contentTwo="Get in touch to see how you can make an impact on future entrepeneurs and leaders!" buttonText="Learn More" contentThree="View our sponsorship package for details."/>
      <SocialMediaIcons />
    </div>
  );
}
