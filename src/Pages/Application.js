// This is the part of the application asking for basic info
import React, {Component} from 'react';
import ehacksLogo from '../Assets/ehacks_logo.png';
import '../Styles/Application.scss';
import forwardArrow from '../Assets/forwardArrow.png';
import backArrow from '../Assets/backArrow.png';
import {Link} from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {withRouter} from 'react-router-dom';

const numPages = 10;

class Application extends Component {
  constructor(props) {
    super(props);
    this.formInput;
    this.history;
    this.state = {
      open: false,
      openErr: false,
      openNotValid: false,
      errText: 'Error Saving',
      centerContent: false,
      submitDisabled: false,
      disableSave: false,
    };
    this.action = (
      <React.Fragment>
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={() => this.handleClose()}
        >
          <CloseIcon fontSize="Medium" />
        </IconButton>
      </React.Fragment>
    );

    this.eventhandler = this.eventhandler.bind(this);
    this.saveData = this.saveData.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.submitApplication = this.submitApplication.bind(this);
  }


  handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({
      open: false, 
      openErr: false, 
      openNotValid: false}, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state);
      }
    });
  };

  eventhandler(data) {
    this.formInput = JSON.parse(JSON.stringify(data));

    if (this.props.page === 'review') {
      // If the review page component tells us that it has invalid input
      if (this.formInput.submitDisabled === true) {
        this.setState({submitDisabled: true}, () => {
          if (this.props.onChange) {
            this.props.onChange(this.state);
          }
        });
      } else { // If the review page component tells us that it does not have invalid input
        this.setState({submitDisabled: false}, () => {
          if (this.props.onChange) {
            this.props.onChange(this.state);
          }
        });
      }
    }
  }

  // Saves data that user types in for current application question, parameter 'event' is event that called this function
  saveData(event) {
    this.setState({disableSave: true});

    setTimeout(() => {
      this.setState({disableSave: false});
    }, 3000);
    const id = event.target.id;
    const authToken = localStorage.getItem('token');
    if (this.props.page == 'review') {
      this.setState({open: true});
    } else {
      fetch(`${process.env.REACT_APP_URL}/applications/setpage${this.props.page}`, {

        // Creates a post call with the state info
      
        method: 'POST',
        body: JSON.stringify(this.formInput),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authToken, 
        },
      })
          .then((res) => {
            if (res.status != 200) {
              const error = new Error(res.statusText);
              throw error;
            }
          }).then((x) => {
            this.setState({open: true}, () => {
              if (this.props.onChange) {
                this.props.onChange(this.state);
              }
            });

            if (id == 'next') {
              this.props.history.push(this.props.next);
            } else if (id == 'back') {
              this.props.history.push(this.props.prev);
            } else {
            }
          })
          .catch((err) => {
            if (err?.message != null && err?.message != undefined) {
              this.setState({errText: err.message, openErr: true}, () => {
                if (this.props.onChange) {
                  this.props.onChange(this.state);
                }
              });
            } else {
              this.setState({openErr: true}, () => {
                if (this.props.onChange) {
                  this.props.onChange(this.state);
                }
              });
            }
          });
    }
  };

  mockSave(event) {
    this.setState({open: true});
  }

  submitApplication(event) {
    // If we're on the review page and all input fields are valid, the code for submitting the application is executed
    if (this.state.submitDisabled == false) {
      // event.preventDefault();
      const authToken = localStorage.getItem('token');
      fetch(`${process.env.REACT_APP_URL}/applications/submit`, {
        // Creates a post call with the state info
        method: 'POST',
        body: JSON.stringify(this.formInput),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authToken, 
        },
      })
          .then((res) => {
            if (res.status != 200) {
              const error = new Error(res.statusText);
              throw error;
            }
          }).then((x) => {
            this.setState({open: true}, () => {
              if (this.props.onChange) {
                this.props.onChange(this.state);
              }
            });
            this.props.history.push(this.props.next);
          })
          .catch((err) => {
            if (err?.message != null && err?.message != undefined) {
              this.setState({errText: err.message, openErr: true}, () => {
                if (this.props.onChange) {
                  this.props.onChange(this.state);
                }
              });
            } else {
              this.setState({openErr: true}, () => {
                if (this.props.onChange) {
                  this.props.onChange(this.state);
                }
              });
            }
            // event.preventDefault();
          });
    } else {
      this.setState({errText: 'Please fill out all fields', openErr: true});
    }
  }

  render() {
    const Content = this.props.content;

    let nextRoute = undefined;

    // Disables the link if we're on the review page and there is invalid input
    if (this.props.page == 'review') {
      if (this.state.submitDisabled == true) {
        nextRoute = '/ApplicationReview';
      } else {
        nextRoute = this.props.next;
      } 
    } else {
      nextRoute = this.props.next;
    }
    const previousRoute = this.props.prev;
    

    return (
      <div className="Application">

        {/* The navbar at the very top of the page */}
        <div className="Application__logo-container">
          <a className="Application__logo-link" href="/">
            <img src={ehacksLogo} className="Application__page_header_logo" alt="logo" />
          </a>
        </div>

        {/* The window containing the application question and space for the user to respond */}
        <div className="Application__window">

          {/* The header for the form, with the title and an eHacks logo */}
          <div className="Application__form_header">
            <img src={ehacksLogo} className="Application__form_header_logo" alt="logo" />
            <p className="Application__title">eHacks 2022 Application</p>
          </div>

          {/* This changes, depending on what page the user is on in the application */}
          <div className={`Application__Content`}>
            <Content className='Application__content-container' onChange={this.eventhandler} />
          </div>

          <div className="Application__form_buttons">
            {/* The back button */}
            <div className="Application__form_btns_col1">
              { this.state.disableSave && <Link to={previousRoute} id = 'back' className = 'Application__back_link'>
                <button disabled={true} className="Application__back_btn"><p className="Application__back_btn_txt"><img className="Application__back_arrow" src={backArrow} alt='arrow'/>Back</p></button>
              </Link>}
              { !this.state.disableSave && <Link to={previousRoute} id = 'back' onClick={this.saveData} className = 'Application__back_link'>
                <button className="Application__back_btn"><p className="Application__back_btn_txt"><img className="Application__back_arrow" src={backArrow} alt='arrow'/>Back</p></button>
              </Link>}
            </div>

            {/* Progress Bar */}
            <div className="Application__progress Application__progress--desktop">
              <progress className="Application__progress_bar" value={this.props.progress/numPages * 100} max="100"> 32% </progress>
              <p className="Application__progress_page">Page: {this.props.progress} / {numPages}</p>
            </div>

            {/* The next and save buttons */}
            <div className="Application__form_btns_col2">
              { this.state.disableSave && <button className="Application__save_btn" disabled={true}><p className="Application__save_btn_txt">Save Progress</p></button>}
              { !this.state.disableSave && <button className="Application__save_btn" onClick={this.saveData}><p className="Application__save_btn_txt">Save Progress</p></button>}

              { this.props.page == 'review' && <Link to={nextRoute} id = 'submit' onClick={this.submitApplication} className = 'Application__submit_link'><button className={this.state.submitDisabled ? 'Application__next_btn Application__disabled_btn' : 'Application__next_btn'}><p className="Application__next_btn_txt">Submit<img className="Application__next_arrow" src={forwardArrow} alt='arrow'/></p></button>  </Link> }
              { this.props.page != 'review' && this.state.disableSave && <Link to={nextRoute} id = 'next' className = 'Application__next_link'><button disabled={true} className="Application__next_btn"><p className="Application__next_btn_txt">Next<img className="Application__next_arrow" src={forwardArrow} alt='arrow'/></p></button>  </Link> }
              { this.props.page != 'review' && !this.state.disableSave && <Link to={nextRoute} id = 'next' onClick={this.saveData} className = 'Application__next_link'><button disabled={true} className="Application__next_btn"><p className="Application__next_btn_txt">Next<img className="Application__next_arrow" src={forwardArrow} alt='arrow'/></p></button>  </Link> }
          
            </div>
          </div>

          {/* Progress Bar */}
          <div className="Application__progress-container">
            <div className="Application__progress Application__progress--mobile">
              <progress className="Application__progress_bar" value={this.props.progress/numPages * 100} max="100"> 32% </progress>
              <p className="Application__progress_page">Page: {this.props.progress} / {numPages}</p>
            </div>
          </div>
        </div>
        <Snackbar
          open={this.state.open}
          autoHideDuration={6000}
          onClose={() => this.handleClose()}
          message="Successfully Saved"
          action={this.action}
        />
        <Snackbar
          open={this.state.openErr}
          autoHideDuration={6000}
          onClose={() => this.handleClose()}
          message={this.state.errText}
          action={this.action}
        />
        <Snackbar
          open={this.state.openNotValid}
          autoHideDuration={6000}
          message="Please Fill Out All Input Fields"
          action={this.action}
        />
      </div>
    );
  }
}

export default withRouter(Application);

