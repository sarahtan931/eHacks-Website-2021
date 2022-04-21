import {React, useState, useEffect} from 'react';
import '../Styles/Dashboard.scss';
import RightArrow from '../Assets/dashboard-right-arrow.png';
import LeftArrow from '../Assets/color-right-arrow.png';
import Airplane from '../Assets/paperairplane.png';
import Trail from '../Assets/plane-trail.svg';
import RedAirplane from '../Assets/red-airplane.png';
import GreenAirplane from '../Assets/green-airplane.png';
import ehacksLogo from '../Assets/ehacks_logo.png';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import {ShimmerBadge} from 'react-shimmer-effects';
import Itinerary from '../Assets/eHacks-Itinerary.pdf';

// const urlLocation = `${window.location.hostname}`;

// Dashboard where you can change views 
export default function Dashboard() {
  const history = useHistory();
  const [view, setView] = useState('welcome');
  const [userObj, setUserObj] = useState({});
  const [loading, setLoading] = useState(false);
  const [userStatus, setUserStatus] = useState('');

  // API call to retrieve user's name and application status 
  useEffect(() => {
    // Set loading to true by default 
    setLoading(true);
    // Check authorization 
    authCheck();
  }, [setUserObj]);

  // Check for authorization of user 
  function authCheck() {
    // Get auth from local storage 
    const auth = localStorage.getItem('isAuth');
    // If auth then proceed to allowing user access 
    if (auth == 'true') {
      // Retrieve inputted email from local storage 
      const email = encodeURIComponent(localStorage.getItem('email'));
      // Retrieve JWT 
      const jwt = localStorage.getItem('token');
      // GET user data
      axios.get(`${process.env.REACT_APP_URL}/dashboard/?email=${email}`, {
        headers: {
          'Content-type': 'application/json',
          'Authorization': jwt,
        },
      }).then((response) => {
        let isSubmitted = response.data.isSubmitted;
        if (isSubmitted == 'false' || isSubmitted == 'true') {
          isSubmitted = JSON.parse(isSubmitted);
        } else {
          isSubmitted = 'Approved';
        }
        // Set user data state
        setUserObj(response.data);
        setHeaderText(response.data);
        // Remove loading 
        setLoading(false);
      }).catch((err) => {
        // Handle errors
        if (err) {
          // Return to error page 
          history.push('*');
        }
      });
    } else {
      // If auth false then also return to error page 
      history.push('*');
    }
  }

  function setHeaderText(user) {
    if (user.isAccepted && !user.isDeclined) {
      setUserStatus('Accepted');
    } else if (!user.isAccepted && user.isDeclined) {
      setUserStatus('Waitlisted');
    } else if (user.isConfirmationPending) {
      setUserStatus('Accepted');
    } else if (user.isSubmitted) {
      setUserStatus('Submitted');
    } else if (!user.isSubmitted) {
      setUserStatus('Not Submitted');
    }
  }

  // Handle onClick for routing by changing states 
  function handler() {
    if (view === 'welcome') {
      setView('hacker-onboarding');
    } else {
      setView('welcome');
    }
  }

  // Logout 
  const logout = (event) => {
    event.preventDefault();
    localStorage.clear();
    history.push('/');
  };


  // Need to make a clickable flex box 
  function LogoutButton() {
    return (
      <div className="logout-button">
        <button className="button-container" id="logout-button" onClick={logout}>
          <img className="left-arrow-image" alt="Left Arrow" src={LeftArrow} />
          <p className="logout-button-text">Log Out</p>
        </button>
      </div>
    );
  }

  // Status button that can be implemented later 
  function StatusButton(props) {
    return (
      <div className="status-button-container" id="status-button" onClick={props.onClick}>
        <p className="status-button-text">{props.status}</p>
        <img alt="Right arrow" src={RightArrow} className="right-arrow-image" />
      </div>
    );
  }


  // Resource point component for the resource section 
  function ResourcePoints(props) {
    return (
      <div className="resources-container">
        <div className="resources-container-content">
          <img src={props.color == 'green' ? GreenAirplane : RedAirplane} className="resource-point" />
          <p className="resource-text">{props.resource}</p>
        </div>
        <a className="resource-link" href={props.linkAddress}>{props.link}</a>
      </div>
    );
  }

  // Resource dashboard for onboarding 
  function OnboardingResourcesView() {
    return (
      <div className="onboard-resource-view-container">
        <h1 className="onboarding-title">Onboarding Resources</h1>
        <ResourcePoints color="green" resource="Join our Discord Channel: " link="Click Here" linkAddress="https://discord.com/invite/YRjYfJqc" />
        <ResourcePoints color="green" resource="Read through the Participation Package: " link="Click Here" linkAddress={Itinerary} />
        <ResourcePoints color="green" resource="Teams List: " link="Click Here" linkAddress="https://docs.google.com/spreadsheets/d/1X_Uth2edgDks_rknpsGZXrOk7dcn_cvy9cCdG8IACzA/edit#gid=1360811296" />
        <div className="buttons-container">
          <LogoutButton />
          <StatusButton onClick={handler} status="Hacker Status" />
        </div>
      </div>
    );
  }

  function checkApplicationStatusHandler() {
    if (userObj.isSubmitted && userObj.isAccepted) {
      return (
        <StatusButton onClick={handler} status="Hacker Onboarding" />
      );
      return null;
    } else if (userObj.isSubmitted) {
      return null;
    } else {
      return (
        <a href="/ApplicationBasicInfo" className="status-button-container">
          <div className="dashboard-application-button" id="status-button">
            <p className="status-button-text">Go To Application</p>
            <img alt="Right arrow" src={RightArrow} className="right-arrow-image" />
          </div>
        </a>);
    }
  }

  // Welcome view 
  function WelcomeView(props) {
    return (
      <div className="welcome-view-container">
        <h1 className="dashboard-message" id="welcome-message"> Welcome, {loading ? <ShimmerBadge width={130} /> : `${props.name}!`}</h1>
        <div className="application-status-container">
          <h3 className="dashboard-message" id="application-status">Your Application Status: </h3>
          <h3 className="application-status">{loading ? <ShimmerBadge width={130} /> : userStatus}</h3>
        </div>

        <div className="buttons-container">
          <LogoutButton />
          {
            checkApplicationStatusHandler()
          }
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="dashboard-background">
        <div className="dashboard-logo-container">
          <a className="dashboard__logo-link" href="/" alt="eHacks Logo to go to homepage">
            <img src={ehacksLogo} className="dashboard__page_header_logo" alt="logo" />
          </a>
        </div>

        <div className="dashboard-container">
          <div className="dashboard-header">
            <h1 className="dashboard-title">eHacks 2022 Hacker Dashboard</h1>
            <div className="dashboard-header-image-container">
              <img className="dashboard-header-image" id="trail" src={Trail} alt="Paper airplane trail" />
              <img className="dashboard-header-image" id="plane" src={Airplane} alt="Paper airplane flying" />
            </div>
          </div>


          <div className="view-container">
            {
              view === 'welcome' ? <WelcomeView name={userObj.name} /> : <OnboardingResourcesView />
            }
          </div>
        </div>
      </div>
    </>
  );
}
