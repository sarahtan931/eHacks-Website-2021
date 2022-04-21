// This is the JSX for the footer component at the bottom of the webpage
import React from 'react';
import '../Styles/Footer.scss';
import PageLink from './PageLink';
import facebookLogo from '../Assets/facebook_logo.jpg';
import instagramLogo from '../Assets/instagram_logo.jpg';
import linkedinLogo from '../Assets/linkedin_logo.jpg';
import emailjs from 'emailjs-com';
import Snackbar from '@mui/material/Snackbar';
import {init} from 'emailjs-com';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

require('dotenv').config();

export default function Footer() {
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [msg, setMsg] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [openErr, setOpenErr] = React.useState(false);
  const [openEmailErr, setOpenEmailErr] = React.useState(false);

  init(process.env.REACT_APP_KEY);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    setOpenErr(false);
    setOpenEmailErr(false);
  };

  const handleNameChange = (event) => { // setting name input 
    setName(event.target.value);
  };

  const handleEmailChange = (event) => { // setting email input 
    setEmail(event.target.value);
  };

  const handleTextChange = (event) => { // setting text input 
    setMsg(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email)) {
      sendFeedback({message_html: msg, from_name: name, reply_to: email});
    } else {
      setOpenEmailErr(true);
    }
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="Medium" />
      </IconButton>
    </React.Fragment>
  );
  
  const sendFeedback = (obj) => { // sending the inquiry email using email.js
    emailjs.send(process.env.REACT_APP_SERVICEID, process.env.REACT_APP_TEMPLATEID, obj, process.env.REACT_APP_KEY,
    ).then(() => {
      setOpen(true);
      setEmail('');
      setMsg('');
      setName('');
    }).catch((err) => setOpenErr(true));
  };
  return (
    <div className="Footer__background">
      <div className="Footer">

        <div className="Footer__left">
          <div className="Footer__left_contents">
            <div className="Footer__text">
              <h1>Got more questions?</h1>
            </div>

            {/* Links to eHacks' social media pages */}
            <div className="Footer__social_media_links">
              <div className="Footer__social_media_link">
                <a href="https://www.instagram.com/ehacksevents/">
                  <PageLink mobile={true} socialMedia = {true} img = {instagramLogo} linkName = "FAQ" link = "/#About_scroll_point"/>
                </a>
              </div>
              <div className="Footer__social_media_link">
                <a href="https://www.facebook.com/ehacksevents">
                  <PageLink mobile={true} socialMedia = {true} img = {facebookLogo} linkName = "FAQ" link = "/#About_scroll_point"/>
                </a>
              </div>
              <div className="Footer__social_media_link">
                <a href="https://www.linkedin.com/company/ehacks-events/">
                  <PageLink mobile={true} socialMedia = {true} img = {linkedinLogo} linkName = "FAQ" link = "/#About_scroll_point"/>
                </a>
              </div>
            </div>

            <span className = "Footer__text2">Or send us an email at ehacksevents@gmail.com</span>

          </div>
        </div>

        {/* The form for users to submit questions */}
        <div className="Footer__question_form">
          <form className="Footer__form">
            <div className="Footer__email_fields">
              <input className="Footer__email_field_1" type="name" name="name" placeholder="Your Name" onChange={handleNameChange} value={name} />
              <input className="Footer__email_field_2" type="email" name="email" placeholder="Your Email" onChange={handleEmailChange} value={email}/>
            </div>
            <textarea className="Footer__question_field" name="msg" cols="1" rows="6" placeholder="Your Questions" onChange={handleTextChange} value={msg}></textarea>
            <div className="Footer__send_btn_container">
              <button className="Footer__send_btn" type="submit" value="Send" onClick={handleSubmit}>Send</button>
            </div>
          </form>
        </div>

        {/* Validation Messages */}
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message="Successfully Sent Email"
          action={action}
          fontSize={100}
        />
        <Snackbar
          open={openErr}
          autoHideDuration={6000}
          onClose={handleClose}
          message="Error Sending Email"
          action={action}
          fontSize={100}
        />
        <Snackbar
          open={openEmailErr}
          autoHideDuration={6000}
          onClose={handleClose}
          message="Please Enter a Valid Email"
          action={action}
          fontSize={100}
        />
      </div>

    </div>
  );
}
    
