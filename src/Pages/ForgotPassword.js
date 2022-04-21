import React from 'react';
import '../Styles/ForgotPassword.scss';
// import facebookLogo from '../Assets/facebook_logo.jpg';
// import instagramLogo from '../Assets/instagram_logo.jpg';
// import linkedinLogo from '../Assets/linkedin_logo.jpg';
// import PageLink from '../Components/PageLink';
import {useHistory} from 'react-router-dom';
import ehacksLogo from '../Assets/ehacks_logo.png';
// import sparkle from '../Assets/sparkles_27280.png';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const ForgotPassword = () => {
  const history = useHistory();
  const [email, setEmail] = React.useState('');
  // const [password, setPassword] = React.useState('');
  const [openErr, setOpenErr] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openProcessing, setOpenProcessing] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenErr(false);
    setOpenSuccess(false);
    setOpenProcessing(false);
  };
  //
  const handleEmailChange = (event) => { // setting email input
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({email: email});
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
    fetch(`${process.env.REACT_APP_URL}/login/forgot`, {
      // Creates a post call with the state info
      method: 'POST',
      body: JSON.stringify({email}),
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
          // Improper email / password handler
          console.error(err);
          setOpenProcessing(false);
          setOpenErr(true);
        });
  };
  return (
    <div className="password">
      <a href="/" className="password__header-logo-container">
        <img src={ehacksLogo} className="password__header-logo" alt="logo" />
      </a>
      <div className="password__window">
        <div className="password__box">
          <div className="password__content">
            <h1 className="password__header">
              Forgot Password
            </h1>
            <p className="password__text password__text--block">
              Please enter your email associated with the account and we’ll send you a link to reset your password.
            </p>
            <form>
              <p className="password__text">
                Email
              </p>
              <div className="password__field">
                <input className="password__field-input" type="text" name="email" placeholder="Input your email" onChange={handleEmailChange} value={email}/>
              </div>
              <div className="password__btn-container">
                <button className='Return_btn'><a className='Return_link' href="/Login">Back</a></button>
                <button className="password__button" type="submit" value="password" onClick={handleSubmit}>Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
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
