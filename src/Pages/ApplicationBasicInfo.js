// This is the part of the application asking for basic info

import React, {Component} from 'react';
import '../Styles/ApplicationBasicInfo.scss';
import {withRouter} from 'react-router-dom';

class ApplicationBasicInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      page: 1,
      // name: '',
      year: '',
      school: '', 
      program: '', 
      address: '',
      email: localStorage.getItem('email')};
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const email = encodeURIComponent(localStorage.getItem('email'));
    const authToken = localStorage.getItem('token');
    const url = `${process.env.REACT_APP_URL}/applications/getpage${this.state.page}/${email}`;
    if (!email || !localStorage.getItem('isAuth')) {
      localStorage.clear();
      this.props.history.push('*');
    } else {
      fetch(url, {
      // Creates a post call with the state info
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authToken, 
        },
      })
          .then((response) => response.json()).then(
              (data) => {
                this.setState({
                // name: data?.name ?? '', 
                  year: data?.year ?? '',
                  school: data?.school ?? '', 
                  program: data?.program ?? '', 
                  address: data?.address ?? '',
                  loading: false,
                }, () => {
                  if (this.props.onChange) {
                    this.props.onChange(this.state);
                  }
                });
              },
          );
    }
  };

  // Updates this component's state when data in input fields change, parameter 'event' is event that called this function
  handleChange(event) {
    const property = event.target.name;
    this.setState({[property]: event.target.value}, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state);
      }
    });
  }
  

  render() {
    return (
      <div className="ApplicationBasicInfo">

        {/* The question where the user enters basic info for the application, such as name, email address, etc. */}

        {/* If the page is still loading */}
        {this.state.loading && (<p className="ApplicationBasicInfo__loading">Loading...</p>)}

        {/* If the page is done loading */}
        {!this.state.loading && 
          <form className="ApplicationBasicInfo__form">

            <div className="ApplicationBasicInfo__form_col1">
            
              {/* The school year field */}
              <div className="ApplicationBasicInfo__form_section">
                <label className="ApplicationBasicInfo__form_label">Current School Year:</label><br/>
                <input className = "ApplicationBasicInfo__form_input" type="text" name="year" onChange={this.handleChange} value={this.state.year}/>
                <p className='ApplicationBasicInfo__example'>E.g. 2nd</p>
              </div>

              {/* The mailing address field */}
              <div className="ApplicationBasicInfo__form_section">
                <label className="ApplicationBasicInfo__form_label">Mailing Address:</label><br/>
                <input className = "ApplicationBasicInfo__form_input" type="text" name="address" onChange={this.handleChange} value={this.state.address}/>
                <p className='ApplicationBasicInfo__example'>E.g. 45 Maple Rd., London, ON Canada M7E 1Y6</p>
              </div>
          

            </div>
          
            <div className="ApplicationBasicInfo__form_col2">
              {/* The school field */}
              <div className="ApplicationBasicInfo__form_section">
                <label className="ApplicationBasicInfo__form_label">School/University:</label><br/>
                <input className = "ApplicationBasicInfo__form_input" type="text" name="school" onChange={this.handleChange} value={this.state.school}/>
                <p className='ApplicationBasicInfo__example'>E.g. Western University</p>
              </div>

              {/* The program field */}
              <div className="ApplicationBasicInfo__form_section">
                <label className="ApplicationBasicInfo__form_label">Program:</label><br/>
                <input className = "ApplicationBasicInfo__form_input" type="text" name="program" onChange={this.handleChange} value={this.state.program}/>
                <p className='ApplicationBasicInfo__example'>E.g. Computer Science</p>
              </div>

            </div>
          </form>

        } 
      </div>
    );
  }
}

export default withRouter(ApplicationBasicInfo);

