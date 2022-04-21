// This is the part of the application asking for basic info

import React, {Component} from 'react';
import ehacksLogo from '../Assets/ehacks_logo.png';
import '../Styles/ApplicationBackground.scss';
import forwardArrow from '../Assets/forwardArrow.png';
import backArrow from '../Assets/backArrow.png';

export default class ApplicationBackground extends Component {
  render() {
    return (
      <div className="ApplicationBasicInfo">

        {/* The navbar at the very top of the page */}
        <a className="ApplicationBasicInfo__logo-link" href="#home_scroll_point">
          <img src={ehacksLogo} className="ApplicationBasicInfo__page_header_logo" alt="logo" />
        </a>

        {/* The form where the user enters basic info for the application, such as name, email address, etc. */}
        <div className="ApplicationBasicInfo__window">

          {/* The header for the form, with the title and an eHacks logo */}
          <div className="ApplicationBasicInfo__form_header">
            <img src={ehacksLogo} className="ApplicationBasicInfo__form_header_logo" alt="logo" />
            <p className="ApplicationBasicInfo__title">eHacks 2022 Application</p>
          </div>

        
          <div className="ApplicationBasicInfo__form_buttons">
            {/* The back button */}
            <div className="ApplicationBasicInfo__form_btns_col1">
              <a href="/Dashboard">
                <button className="ApplicationBasicInfo__back_btn"><p className="ApplicationBasicInfo__back_btn_txt"><img className="ApplicationBasicInfo__back_arrow" src={backArrow} alt='arrow'/>Back</p></button>
              </a>
            </div>

            {/* The Progress Bar */}

            {/* The next and save buttons */}
            <div className="ApplicationBasicInfo__form_btns_col1">
              <button className="ApplicationBasicInfo__save_btn"><p className="ApplicationBasicInfo__save_btn_txt">Save Progress</p></button>
              <a href="/ApplicationOther">
                <button className="ApplicationBasicInfo__next_btn"><p className="ApplicationBasicInfo__next_btn_txt">Next<img className="ApplicationBasicInfo__next_arrow" src={forwardArrow} alt='arrow'/></p></button>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
