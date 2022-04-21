import React from 'react';
import '../Styles/Login.scss';
import facebookLogo from '../Assets/facebook-logo-x10.png';
import instagramLogo from '../Assets/instagram-logo-x10.png';
import linkedinLogo from '../Assets/linkedin-logo-x10.png';
import {Link, useHistory} from 'react-router-dom';
import ehacksLogo from '../Assets/ehacks_logo.png';
import sparkle from '../Assets/sparkles_27280.png';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [openErr, setOpenErr] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenErr(false);
  };

  const handleEmailChange = (event) => { // setting email input 
    setEmail(event.target.value);
  };

  const handleTextChange = (event) => { // setting text input 
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const rePass = /^(?=.*[a-zA-Z\d]).{5,20}[^\<\\\.\&\%\/\>\*\(\)\+\=\{\}\[\]\:\;\'\"\,]$/;
    if (reEmail.test(email) && rePass.test(password)) {
      onSubmit({email: email.toLowerCase(), password: password});
    } else {
      setOpenErr(true);
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

  const onSubmit = (event) => {
    fetch(`${process.env.REACT_APP_URL}/login`, {
      // Creates a post call with the state info
      method: 'POST',
      body: JSON.stringify({email: email.toLowerCase(), password: password}),
      headers: {
        'Content-Type': 'application/json',
      },
    })
        .then((res) => {
          if (res.status === 200) {
            // If the response is successful
            res.json().then(
                function(data) {
                  // Set all local storage to returned values from DB. Allows them to be accessed from anywhere
                  localStorage.setItem('isAuth', true);
                  localStorage.setItem('token', data.token);
                  localStorage.setItem('email', data.email);
                  // Routes the logged in user to the proper dashboard based on their catagort in the DB
                  history.push('/Dashboard');
                });
          } else {
            // If not sucessful
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch((err) => {
          // Improper email / password handler
          console.error(err);
          setOpenErr(true);
        });
  };
  return (
    <div className="login">
      <Link className="login_logo-link" to="/">
        <img src={ehacksLogo} className="login_header_logo" alt="logo" />
      </Link>

      <div className="login-window">
        <div className="login-row">
          <div className="login-box">
            <div className="login-content">
              <h1 className="login-header">
                Hacker Log in
              </h1>
              <form className="Login-form">
                <div className="Login-form-content">
                  <div className="Login_field">
                    <p className="login-text">
                      Email
                    </p>
                    <input className="Login_field_1" type="text" name="email" placeholder="Input your email" onChange={handleEmailChange} value={email}/>
                  </div>
                  <div className="Login_field">
                    <p className="login-text">
                      Password
                    </p>
                    <input className="Login_field_1" type="password" name="password" placeholder="Input your password" onChange={handleTextChange} value={password}></input>
                    <div className="Login_forgot_container">
                      <a href="/forgotPassword" className="Login_forgot">Forgot password?</a>
                    </div>
                  </div>
                </div>
                <div className="Login__btn_container">
                  <button className="login-button" type="submit" value="Login" onClick={handleSubmit}>Login</button>
                </div>
              </form>
            </div>
          </div>
          <div className="register-box">
            <div className="register-content">
              <h1 className="register-header">
                Not yet registered with eHacks?
              </h1>
              <a href="/register" className="register_link">
                <div className="register_btn_container">
                  <button className="register-button" type="button" value="Sign up to hack with us">
                    Sign up to hack with us
                    <img src={sparkle} className="sparkle_logo" alt="logo" />
                  </button>
                </div>
              </a>
              <div className="register__links">
                <div className="login__social_media_links ">
                  <a className="login__social_media_link" href="https://www.instagram.com/ehacksevents/">
                    <img className="login__social_media_img" alt="Instagram logo" src={instagramLogo}/>
                  </a>
                  <a className="login__social_media_link" href="https://www.facebook.com/ehacksevents">
                    <img className="login__social_media_img" alt="Facebook logo" src={facebookLogo}/>
                  </a>
                  <a className="login__social_media_link" href="https://www.linkedin.com/company/ehacks-events/">
                    <img className="login__social_media_img" alt="LinkedIn logo" src={linkedinLogo}/>
                  </a>
                </div>
                <p className="register-email">
                  Got questions? Contact us at <a className="register-email-link" href="mailto:ehacksevents@gmail.com">ehacksevents@gmail.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Snackbar
        open={openErr}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Invalid login credentials"
        action={action}
      />
    </div>
  );
};

export default Login;
