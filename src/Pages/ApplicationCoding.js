// This is the part of the application with a question and additional components such as long answer questions or file attachments

import React, {Component} from 'react';
import '../Styles/ApplicationCoding.scss';
import {withRouter} from 'react-router-dom';

const selectedColor = '#7673ff';
const notSelectedColor = '#E1E0FF';

class ApplicationCoding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      page: 2,
      codingExperience: undefined,
      yesBtnColor: notSelectedColor,
      noBtnColor: notSelectedColor,
      email: localStorage.getItem('email'),
    };
    this.returnedData = {};
    this.selectYes = this.selectYes.bind(this);
    this.selectNo = this.selectNo.bind(this);
    this.hoverYes = this.hoverYes.bind(this);
    this.hoverNo = this.hoverNo.bind(this);
    this.leaveHoverYes = this.leaveHoverYes.bind(this);
    this.leaveHoverNo = this.leaveHoverNo.bind(this);
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
                if (data.codingExperience === true) {
                  this.selectYes();
                } else if (data.codingExperience === false) {
                  this.selectNo();
                }
                this.setState({
                  page: this.state.page,
                  codingExperience: this.state.codingExperience,
                  email: this.state.email,
                  loading: false,
                });
              },
          );
    }
  };

  // When the user selects 'yes', updates colors
  selectYes() {
    this.setState({yesBtnColor: selectedColor});
    this.setState({noBtnColor: notSelectedColor});
    this.setState({codingExperience: true}, () => {
      this.props.onChange({
        page: this.state.page,
        codingExperience: this.state.codingExperience,
        email: this.state.email,
      });
    });
  };

  // When the user selects 'no', updates colors
  selectNo() {
    this.setState({yesBtnColor: notSelectedColor});
    this.setState({noBtnColor: selectedColor});
    this.setState({codingExperience: false}, () => {
      this.props.onChange({
        page: this.state.page,
        codingExperience: this.state.codingExperience,
        email: this.state.email,
      });
    });
  };

  // When the user hovers over the yes button, updates colors
  hoverYes() {
    this.setState({yesBtnColor: selectedColor});
    if (this.state.codingExperience === false) {
      this.setState({noBtnColor: selectedColor});
    } else {
      this.setState({noBtnColor: notSelectedColor});
    }
  }

  // When the user hovers over the no button, updates colors
  hoverNo() {
    this.setState({noBtnColor: selectedColor});
    if (this.state.codingExperience === true) {
      this.setState({yesBtnColor: selectedColor});
    } else {
      this.setState({yesBtnColor: notSelectedColor});
    }
  }

  // When the user's mouse leaves the yes button, updates colors
  leaveHoverYes() {
    if (this.state.codingExperience === true) {
      this.setState({yesBtnColor: selectedColor});
      this.setState({noBtnColor: notSelectedColor});
    } else if (this.state.codingExperience === false) {
      this.setState({yesBtnColor: notSelectedColor});
      this.setState({noBtnColor: selectedColor});
    } else {
      this.setState({yesBtnColor: notSelectedColor});
      this.setState({noBtnColor: notSelectedColor});
    }
  }

  // When the user's mouse leaves the no button, updates colors
  leaveHoverNo() {
    if (this.state.codingExperience === false) {
      this.setState({yesBtnColor: notSelectedColor});
      this.setState({noBtnColor: selectedColor});
    } else if (this.state.codingExperience === true) {
      this.setState({yesBtnColor: selectedColor});
      this.setState({noBtnColor: notSelectedColor});
    } else {
      this.setState({yesBtnColor: notSelectedColor});
      this.setState({noBtnColor: notSelectedColor});
    }
  }

  render() {
    return (
      <div className="ApplicationCoding">

        {/* The question where the user tells us whether or not they have coding experience */}

        {/* If the page is still loading */}
        {this.state.loading && (<p className="ApplicationCoding__loading">Loading...</p>)}

        {/* If the page is done loading */}
        {!this.state.loading && 

        <div className="ApplicationCoding__form">
          {/* The question that is being asked */}
          <div className="ApplicationCoding__question">
            <p className="ApplicationCoding__question_num">Question 1:</p>
            <p className="ApplicationCoding__question_text">Do you have coding experience? eHacks strongly emphasizes a 1:1 ratio of technical and non-technical participants. Your answer to this question will not affect your chances of getting accepted.</p>

          </div>

          {/* The two buttons the user can select from, which are 'yes' and 'no' */}
          <div className="ApplicationCoding__options">
            <button onMouseEnter={this.hoverYes} onMouseLeave={this.leaveHoverYes} onClick={this.selectYes} style={{backgroundColor: this.state.yesBtnColor}} className="ApplicationCoding__yes_btn"><p className="ApplicationCoding__yes_btn_txt">Yes</p></button>
            <button onMouseEnter={this.hoverNo} onMouseLeave={this.leaveHoverNo} onClick={this.selectNo} style={{backgroundColor: this.state.noBtnColor}} className="ApplicationCoding__no_btn"><p className="ApplicationCoding__no_btn_txt">No</p></button>
          </div>

        </div>
        }

      </div>
    );
  }
};

export default withRouter(ApplicationCoding);

