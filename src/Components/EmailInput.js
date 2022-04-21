// The component with an input field for users to add their email addresses to the mailing list
import React from 'react';
import '../Styles/EmailInput.scss';
import arrow from '../Assets/right-arrow.png';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


export default function EmailInput() {
  const [open, setOpen] = React.useState(false);
  const [openErr, setOpenErr] = React.useState(false);
  const [openEmailErr, setOpenEmailErr] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    setOpenErr(false);
    setOpenEmailErr(false);
  };


  // When the user enters their email address and presses the submit button, a post request is made
  // to an endpoint in our rest api which adds that email address to a list in MongoDB
  // eslint-disable-next-line
  const addEmail = (e) => {// e is the event
    e.preventDefault();
    const email = document.getElementById('email_input').value;
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email)) {
      axios.post(`${process.env.REACT_APP_URL}/emails`, {email: (document.getElementById('email_input').value)})
          .then((response) => {
            if (response.status == 200) {
              setOpen(true);
            }
          }).catch(() => {
            setOpenErr(true);
          });
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

  return (
    <div className="input-box">
      <form>
        <label className="label">
          <input type="email" placeholder="your@email.com" className="input" size="50" id="email_input" />
          <button className="email-submit" onClick={addEmail}>
            <img src={arrow} alt="Submit button for email form" className="arrow-img" />
          </button>
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message="Successfully Added Email"
            action={action}
          />
          <Snackbar
            open={openErr}
            autoHideDuration={6000}
            onClose={handleClose}
            message="Error Adding Email"
            action={action}
          />
          <Snackbar
            open={openEmailErr}
            autoHideDuration={6000}
            onClose={handleClose}
            message="Please Enter a Valid Email"
            action={action}
          />
        </label>
      </form>
    </div>
  );
};

