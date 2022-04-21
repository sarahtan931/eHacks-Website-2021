import React from 'react';
import '../Styles/ChangePassword.scss';
// import facebookLogo from '../Assets/facebook_logo.jpg';
// import instagramLogo from '../Assets/instagram_logo.jpg';
// import linkedinLogo from '../Assets/linkedin_logo.jpg';
// import PageLink from '../Components/PageLink';
import {useHistory, useParams} from 'react-router-dom';
import ehacksLogo from '../Assets/ehacks_logo.png';
// import sparkle from '../Assets/sparkles_27280.png';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const ForgotPassword = () => {
  const {id, email} = useParams();
  const history = useHistory();
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  // const [reset, setreset] = React.useState('');
  const [openErr, setOpenErr] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openProcessing, setOpenProcessing] = React.useState(false);
  const [openPasswordErr, setOpenPasswordErr] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenErr(false);
    setOpenSuccess(false);
    setOpenProcessing(false);
    setOpenPasswordErr(false);
  };

  const handlePasswordChange = (event) => { // setting email input
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => { // setting email input
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setOpenPasswordErr(true);
      return;
    }

    onSubmit({email: email, id: id, password: password});
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
    setOpenProcessing(true);

    console.log(email);
    console.log(id);

    fetch(`${process.env.REACT_APP_URL}/login/reset`, {
      // Creates a post call with the state info
      method: 'POST',
      body: JSON.stringify({email, id, password}),
      headers: {
        'Content-Type': 'application/json',
      },
    })
        .then((res) => {
          if (res.status === 200) {
            // If the response is successful
            setOpenProcessing(false);
            setOpenSuccess(true);
            setTimeout(() => {
              history.push('/login');
            }, 1000);
          } else {
            // If not successful
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch((err) => {
          // Improper email / reset handler
          console.error(err);
          setOpenProcessing(false);
          setOpenErr(true);
        });
  };
  return (
    <div className="reset">
      <a href="/" className="reset__header-logo-container">
        <img src={ehacksLogo} className="reset__header-logo" alt="logo" />
      </a>
      <div className="reset__window">
        <div className="reset__box">
          <div className="reset__content">
            <h1 className="reset__header">
                Set Password
            </h1>
            <p className="reset__text reset__text--block">
                Please enter your new password.
            </p>
            <form>
              <p className="reset__text">
                  Password
              </p>
              <div className="reset__field">
                <input className="reset__field-input" type="password" name="email" placeholder="Password" onChange={handlePasswordChange} value={password}/>
              </div>
              <p className="reset__text">
                Confirm Password
              </p>
              <div className="reset__field">
                <input className="reset__field-input" type="password" name="email" placeholder="Confirm Password" onChange={handleConfirmPasswordChange} value={confirmPassword}/>
              </div>
              <div className="reset__btn-container">
                <button className="reset__button" type="submit" value="reset" onClick={handleSubmit}>Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Snackbar
        open={openPasswordErr}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Passwords don't match!"
        action={action}
      />
      <Snackbar
        open={openProcessing}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Processing Request"
        action={action}
      />
      <Snackbar
        open={openErr}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Something went wrong"
        action={action}
      />
      <Snackbar
        open={openSuccess}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Success! Redirecting..."
        action={action}
      />
    </div>
  );
};

export default ForgotPassword;
