// This is the part of the application with a question and additional components such as long answer questions or file attachments

import React, {Component} from 'react';
import '../Styles/ApplicationResume.scss';
import {withRouter} from 'react-router-dom';

class ApplicationResume extends Component {
  constructor(props) {
    super(props);
    this.history;
    this.state = {
      loading: true,
      page: 'resume',
      resumelink: '',
      email: localStorage.getItem('email'),
    };
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
                let link = data?.resumelink ?? '';
                if (link == 0) {
                  link = '';
                }
                this.setState({
                  page: this.state.page,
                  resumelink: link,
                  email: this.state.email,
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
      <div className="ApplicationResume">

        {/* The question where the user enters a link to their resume */}
        <div className="ApplicationResume__window">

          <div className="ApplicationResume__form">
            {/* The question that is being asked */}
            <div className="ApplicationResume__question">
              <p className="ApplicationResume__question_num">Resume </p>
              <p className="ApplicationResume__question_text">Please attach a Google Drive link to your resume (<a href="https://docs.google.com/document/d/1-266c9dBXqOz5z0iIoddrcDnzAq8GtvkOzVNzzC-MkM/edit?usp=sharing" className='resume-instructions'>Instructions</a>
          )</p>
            </div>

            {/* The field where a user enters a link to their resume */}
            <input name='resumelink' type="text" className="ApplicationResume__link_field" placeholder="Link to Resume" onChange={this.handleChange} value={this.state.resumelink}/>
          </div>

        </div>
      </div>
    );
  };
}


export default withRouter(ApplicationResume);
