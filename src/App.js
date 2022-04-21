import './App.css';
import React from 'react';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import About from './Pages/About';
import FAQ from './Pages/FAQ';
import Sponsors from './Pages/Sponsors';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Dashboard from './Pages/Dashboard';
import Page404 from './Pages/Page404';

// TODO: Add the sponsors section back.
// import Sponsors from './Pages/Sponsors';
import Footer from './Components/Footer';
import ApplicationBasicInfo from './Pages/ApplicationBasicInfo';
import ApplicationGain from './Pages/ApplicationGain';
import ApplicationCoding from './Pages/ApplicationCoding';
import ApplicationInterest from './Pages/ApplicationInterest';
import ApplicationIsland from './Pages/ApplicationIsland';
import ApplicationSkills from './Pages/ApplicationSkills';
import ApplicationEntrep from './Pages/ApplicationEntrep';
import ApplicationPrepare from './Pages/ApplicationPrepare';
import ApplicationResume from './Pages/ApplicationResume';
import Application from './Pages/Application';
import ApplicationReview from './Pages/ApplicationReview';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import ForgotPassword from './Pages/ForgotPassword';
import ChangePassword from './Pages/ChangePassword';

function App() {
  const pathName = window.location.pathname;

  if (pathName === '/learn') {
    window.location = 'https://drive.google.com/file/d/1Nxc4aB-LhYSvnd798N_EY2VfJRgB23he/view?usp=sharing';
    return null;
  } else if (pathName === '/apply') {
    window.location = 'https://docs.google.com/forms/d/e/1FAIpQLSfSflGS1dSp8s1J-LWQY4CzbjpD1M3F3PhFKeJRKxKWGJyG_g/viewform';
    return null;
  } else {
    return (
      <Router>
        <div className="App">
          <Switch>
            {/* The Home Page, which a user sees first */}
            <Route exact path="/">
              <div id="home_scroll_point"></div>
              <Navbar />
              <Home />
              <About />
              <Sponsors />
              <FAQ />
              <Footer />
            </Route>

            {/* The login component */}
            <Route exact path="/login">
              <Login></Login>
            </Route>

            {/* The forgot password component */}
            <Route exact path="/forgotPassword">
              <ForgotPassword></ForgotPassword>
            </Route>

            {/* The forgot password component */}
            <Route exact path="/reset/:email/:id">
              <ChangePassword></ChangePassword>
            </Route>
            
            {/* The register component */}
            <Route exact path="/register">
              <Register></Register>
            </Route>

  
            {/* The dashboard component */}
            <Route exact path="/dashboard">
              <Dashboard></Dashboard>
            </Route>

            {/* The part of the Application asking for user's basic info */}
            <Route exact path="/ApplicationBasicInfo">
              <Application content = {ApplicationBasicInfo} next={'/ApplicationResume'} prev={'/Dashboard'} page={1} progress={1}/>
            </Route>

            <Route exact path="/ApplicationResume">
              <Application content = {ApplicationResume} next={'/ApplicationCoding'} prev={'/ApplicationBasicInfo'} page={'resume'} progress={2}/>
            </Route>

            <Route exact path="/ApplicationCoding">
              <Application content = {ApplicationCoding} next={'/ApplicationEntrep'} prev={'/ApplicationResume'} page={2} progress={3}/>
            </Route>

            <Route exact path="/ApplicationEntrep">
              <Application content = {ApplicationEntrep} next={'/ApplicationPrepare'} prev={'/ApplicationCoding'} page={3} progress={4}/>
            </Route>
            
            <Route exact path="/ApplicationPrepare">
              <Application content = {ApplicationPrepare} next={'/ApplicationGain'} prev={'/ApplicationEntrep'} page={4} progress={5}/>
            </Route>

            <Route exact path="/ApplicationGain">
              <Application content = {ApplicationGain} next={'/ApplicationInterest'} prev={'/ApplicationPrepare'} page={5} progress={6}/>
            </Route>

            <Route exact path="/ApplicationInterest">
              <Application content = {ApplicationInterest} next={'/ApplicationIsland'} prev={'/ApplicationGain'} page={6} progress={7}/>
            </Route>

            <Route exact path="/ApplicationIsland">
              <Application content = {ApplicationIsland} next={'/ApplicationSkills'} prev={'/ApplicationInterest'} page={7} progress={8}/>
            </Route>

            <Route exact path="/ApplicationSkills">
              <Application content = {ApplicationSkills} prev={'/ApplicationIsland'} next={'/ApplicationReview'} page={'skills'} progress={9}/>
            </Route>

            <Route exact path="/ApplicationReview">
              <Application content = {ApplicationReview} prev={'/ApplicationSkills'} next={'/Dashboard'} page={'review'} progress={10}/>
            </Route>

            {/* 404 Page route */}
            <Route path="*">
              <Page404 />
            </Route>

          </Switch>

        </div>
      </Router>
    );
  }
}

export default App;
