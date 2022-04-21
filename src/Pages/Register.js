import React from 'react';
import '../Styles/Register.scss';
import {useHistory} from 'react-router-dom';
import ehacksLogo from '../Assets/ehacks_logo.png';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const Register = () => {
  const history = useHistory();
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordCheck, setPasswordCheck] = React.useState('');
  const [openErr, setOpenErr] = React.useState(false);
  const [openErrPasswordMatch, setOpenErrPasswordMatch] = React.useState(false);
  const [openErrEmail, setOpenErrEmail] = React.useState(false);
  const [openErrPassword, setOpenErrPassword] = React.useState(false);
  const [openErrName, setOpenErrName] = React.useState(false);
  const [openErrUser, setOpenErrUser] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenErr(false);
    setOpenErrPassword(false);
    setOpenErrPasswordMatch(false);
    setOpenErrName(false);
    setOpenErrUser(false);
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

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => { // setting email input 
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => { // setting text input 
    setPassword(event.target.value);
  };

  const handlePasswordCheck = (event) => {
    setPasswordCheck(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const rePass = /^(?=.*[a-zA-Z\d]).{5,20}[^\<\\\.\&\%\/\>\*\(\)\+\=\{\}\[\]\:\;\'\"\,\^]$/;
    const reName = /^.{1,256}[^\<\\\.\&\%\/\>\*\(\)\+\=\{\}\[\]\:\;\,\!\@\#\$\_\d]$/;
 
    if (!reName.test(firstName) && !reName.test(lastName)) {
      setOpenErrName(true);
    } else if (!rePass.test(password)) {
      setOpenErrPassword(true);
    } else if (!reEmail.test(email)) {
      setOpenErrEmail(true);
    } else {
      onSubmit({email: email, password: password});
    }
  };

  const onSubmit = (event) => {
    const fullName = `${firstName} ${lastName}`;
  
    fetch(`${process.env.REACT_APP_URL}/register/check/${email}`, {
      // Creates a post call with the state info
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
        .then((res) => res.json()).then(
            (data) => {
              if (!data.isUser) {
                // If the response is successful
                if (password === passwordCheck) {
                  fetch(`${process.env.REACT_APP_URL}/register`, {
                    // Creates a post call with the state info
                    method: 'POST',
                    body: JSON.stringify({email: email.toLowerCase(), password: password, name: fullName}),
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
                } else {
                  setOpenErrPasswordMatch(true);
                }
              } else {
                // If not sucessful
                setOpenErrUser(true);
              }
            }).catch((err) => {
          // Improper email / password handler
          console.error(err);
          setOpenErr(true);
        });  
  };
  return (
    <div>
      <a className="register_logo-link" href="/">
        <img src={ehacksLogo} className="register_header_logo" alt="logo" />
      </a>
      <div className="register-window">
        <div className="register_box">
          <div className="register_content">
            <h1 className="register_header">
                Hacker Sign Up
            </h1>
            <form className="Register__form">
              <h4 className="register-name-text">
                Name
              </h4>
              <div className="register_line_half">
                <input className="Register_field_1" type="text" name="first_name" placeholder="First Name" onChange={handleFirstNameChange} value={firstName}/>
                <input className="Register_field_2" type="text" name="last_name" placeholder="Last Name" onChange={handleLastNameChange} value={lastName}/>
              </div>
              <h4 className="register-name-text">
                Email
              </h4>
              <div className="register_line">
                <input className="Register_field" type="text" name="email" placeholder="Email" onChange={handleEmailChange} value={email}/>
              </div>
              <h4 className="register-name-text">
                Password
              </h4>
              <div className="register_line_half">
                <input className="Register_field_1" type="password" name="password" placeholder="Password" onChange={handlePasswordChange} value={password}></input>
                <input className="Register_field_2" type="password" name="password" placeholder="Confirm password" onChange={handlePasswordCheck} value={passwordCheck}></input>
              </div>
              <div className="Register__btn_container">
                <button className='Return_btn'><a className='Return_link' href="/Login">Back</a></button>
                <button className="Register_btn" type="submit" value="Register" onClick={handleSubmit}>Create Account</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Snackbar
        open={openErr}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Registration failed"
        action={action}
      />
      <Snackbar
        open={openErrUser}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Account already exists"
        action={action}
      />
      <Snackbar
        open={openErrPasswordMatch}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Passwords must match"
        action={action}
      />
      <Snackbar
        open={openErrEmail}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Invalid email"
        action={action}
      />
      <Snackbar
        open={openErrPassword}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Invalid Password. Must be 6-20 characters, can contain only alphanumerical characters and [!, @, #, $, _, -, ?]"
        action={action}
      />
      <Snackbar
        open={openErrName}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Invalid Name"
        action={action}
      />
    </div>
  );
};

export default Register;
