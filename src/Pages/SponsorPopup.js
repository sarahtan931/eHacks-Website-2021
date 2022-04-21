import React from 'react';
import Instagram from '../Assets/Popup-Instagram.jpg';
import Facebook from '../Assets/Popup-Facebook.jpg';
import LinkedIn from '../Assets/Popup-LinkedIn.jpg';
import eHacksPDF from '../Assets/eHacksSponsorshipPackage.pdf';
import '../Styles/SponsorPopup.scss';

export default function SponsorPopup(props) { 
  // Exit button 
  function ExitButton(props) {
    return (
      <div className="exit-button-container" onClick={props.exitOnClick}>
        <div className="exit-button">X</div>
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
        <p className="caption">{props.contentThree}</p>
        <a className="button" type="submit" href={eHacksPDF} target="_blank" rel="noreferrer">{props.buttonText}</a>
      </div>
    );
  }

  // Social media images 
  function SocialMediaIcons() {
    return (
      <div className="social-media">
        <a href="https://www.instagram.com/ehacksevents/" className="social-media-link">
          <img className="social-media-icon" src={Instagram} />
        </a>
        <a href="https://www.facebook.com/ehacksevents" className="social-media-link">
          <img className="social-media-icon" src={Facebook} href='#'/>
        </a>
        <a href="https://www.linkedin.com/company/ehacks-events/" className="social-media-link">
          <img className="social-media-icon" src={LinkedIn} href='#'/>
        </a>
      </div>
    );
  }

  return (
    <div className="sponsor-popup-container">
      <ExitButton exitOnClick={props.onClick}/>
      <SponsorUsContent exitOnClick={props.onClick} title="Sponsor Us" contentOne="Interested in recruiting top talent? Gaining brand recognition? Connecting with students?" contentTwo="Get in touch to see how you can make an impact on future entrepreneurs and leaders!" buttonText="Learn More" contentThree="View our sponsorship package for details."/>
      <SocialMediaIcons />
    </div>
  );
}
