import React from 'react';
import {Link} from 'react-router-dom';
import '../Styles/Page404.scss';
import ehacksLogo from '../Assets/ehacks_logo.png';
import facebookLogo from '../Assets/Popup-Facebook.jpg';
import instagramLogo from '../Assets/Popup-Instagram.jpg';
import linkedinLogo from '../Assets/Popup-LinkedIn.jpg';

function Header() {
  return (
    <>
      <Link className="page404-logo-link-left" to="/">
        <img src={ehacksLogo} className="login_header_logo" alt="logo" />
      </Link>
      <a className="page404-logo-link-right" id="page404-last-icon" href="https://www.linkedin.com/company/ehacks-events/">
        <img src={linkedinLogo} className="login_header_logo" alt="logo" />
      </a>
      <a className="page404-logo-link-right" href="https://www.facebook.com/ehacksevents">
        <img src={facebookLogo} className="login_header_logo" alt="logo" />
      </a>
      <a className="page404-logo-link-right" href="https://www.instagram.com/ehacksevents/">
        <img src={instagramLogo} className="login_header_logo" alt="logo" />
      </a>
    </>
  );
}

export default function Page404() {
  return (
    <>
      <Header />
      <div className="page404-container">
        <h1 className="page404-title">Whoops!</h1>
        <p className="page404-text">It looks like the page you are looking for <br/> doesn&apos;t exist.</p>
        <Link className="page404-button" to='/'>Back to home</Link>
      </div>
    </>
  );
}
