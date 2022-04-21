// This is the part of the application asking for basic info
import '../Styles/ApplicationReview.scss';
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

const InvalidColor = '#FCD8DA';
const redFont = '#FF0000';
const errorString = 'Error - please fill in field';
const errorStringShort = 'Error';

class ApplicationReview extends Component {
  constructor(props) {
    super(props);
    this.history;
    this.state = {
      loading: true,
      page: 'review',
      name: '',
      email: localStorage.getItem('email'),
      year: '',
      school: '',
      program: '',
      address: '',
      codingExperience: false,
      entrepreneurshipInterest: 0,
      schoolForWorkforce: 0,
      gain: '',
      technicalProduct: '',
      desertedIsland: '',
      resume: '',
      skills: '',
      submitDisabled: false, // This property will indicate whether all of the input is valid

      yearColor: '',
      schoolColor: '',
      programColor: '',
      addressColor: '',
      codingExperienceColor: '',
      entrepreneurshipInterestColor: '',
      schoolForWorkforceColor: '',
      gainColor: '',
      technicalProductColor: '',
      desertedIslandColor: '',
      resumeColor: '',
      skillsColor: '',

      yearTextColor: '',
      schoolTextColor: '',
      programTextColor: '',
      addressTextColor: '',
      codingExperienceTextColor: '',
      entrepreneurshipInterestTextColor: '',
      schoolForWorkforceTextColor: '',
      gainTextColor: '',
      technicalProductTextColor: '',
      desertedIslandTextColor: '',
      resumeTextColor: '',
      skillsTextColor: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.countWords = this.countWords.bind(this);
  }

  // Counts the number of words in the string parameter 'input'
  countWords(input) {
    const text = input.split(' ');
    let wordCount = 0;
    for (let i = 0; i < text.length; i++) {
      if (text[i] !== ' ' && text[i] !== '') {
        wordCount++;
      }
    }
    return wordCount;
  }

  componentDidMount() {
    const email = encodeURIComponent(localStorage.getItem('email'));
    const authToken = localStorage.getItem('token');
    const url = `${process.env.REACT_APP_URL}}/applications/review/${email}`;

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
                let coding = '';
                let skills = '';

                if (data.application.CodingExperience === true) {
                  coding = 'Yes';
                } else if (data.application.CodingExperience === false) {
                  coding = 'No';
                }

                if (data.application.Skills.length !== 0) {
                  skills = data.application.Skills.join(', ');
                }

                this.setState({
                // name: data?.name ?? '', 
                  name: (data?.name != '')? data?.name : errorString,
                  email: localStorage.getItem('email'),
                  year: (data?.application?.Year != '' ) ? data?.application?.Year : errorString,
                  school: (data?.application?.School != '' )? data?.application?.School: errorString,
                  program: (data?.application?.Program != '')? data?.application?.Program: errorString,
                  address: (data?.application?.MailingAddress != '')? data?.application?.MailingAddress: errorString,
                  codingExperience: (coding != '')? coding: errorStringShort,
                  entrepreneurshipInterest: (data?.application?.EntrepreneurshipInterest)? data?.application?.EntrepreneurshipInterest: errorStringShort,
                  schoolForWorkforce: (data?.application?.SchoolForWorkforce)?data?.application?.SchoolForWorkforce: errorStringShort,
                  gain: (data?.application?.Gain != '')? data?.application?.Gain:errorString,
                  technicalProduct: (data?.application?.TechnicalProductOrService != '')? data?.application?.TechnicalProductOrService: errorString,
                  desertedIsland: (data?.application?.DesertedIsland != '')? data?.application?.DesertedIsland : errorString,
                  resume: (data?.application?.ResumeLink != '') ? data?.application?.ResumeLink: errorString,
                  skills: (skills != '')? skills: errorString,
                  loading: false,

                }, () => {
                  if (this.props.onChange) {
                    this.props.onChange(this.state);
                  }
                });

                const requiredTextFields = ['year', 'school', 'program', 'address', 'resume', 'gain', 'technicalProduct', 'desertedIsland', 'codingExperience'];
                const requiredNumFields = ['entrepreneurshipInterest', 'schoolForWorkforce'];

                const numReqTxtFields = requiredTextFields.length;
                const numReqNumFields = requiredNumFields.length;

                // Checks to see if any of the text fields are empty, and for those that are, their colors change to red
                for (let i = 0; i < numReqTxtFields; i++) {
                  let property = null;
                  let colorProp = null;
                  let colorTextProp = null;
                  if (this.state[requiredTextFields[i]] === '' || this.state[requiredTextFields[i]] === errorString || this.state[requiredTextFields[i]] === errorStringShort) {
                    property = requiredTextFields[i];
                    colorProp = property + 'Color';
                    colorTextProp = property + 'TextColor';
                    this.setState({
                      [colorProp]: InvalidColor,
                      [colorTextProp]: redFont,
                      submitDisabled: true}, () => {
                      if (this.props.onChange) {
                        this.props.onChange(this.state);
                      }
                    });
                  }
                }

                // Checks to see if any of the scale questions have no option selected, and for those that do, their colors change to red
                for (let i = 0; i < numReqNumFields; i++) {
                  let property = null;
                  let colorProp = null;
                  let colorTextProp = null;
                  if (this.state[requiredNumFields[i]] < 1 || this.state[requiredNumFields[i]] > 5 || this.state[requiredNumFields[i]] === errorStringShort) {
                    property = requiredNumFields[i];
                    colorProp = property + 'Color';
                    colorTextProp = property + 'TextColor';
                    this.setState({
                      [colorProp]: InvalidColor, 
                      [colorTextProp]: redFont,
                      submitDisabled: true}, () => {
                      if (this.props.onChange) {
                        this.props.onChange(this.state);
                      }
                    });
                  }
                }
              
                // Checks if the number of skills is empty
                if (this.state.skills.length == 0 || this.state.skills == errorString) {
                  this.setState({
                    skillsColor: InvalidColor, 
                    submitDisabled: true}, () => {
                    if (this.props.onChange) {
                      this.props.onChange(this.state);
                    }
                  });
                }

                const shortAnsFields = ['gain', 'technicalProduct', 'desertedIsland'];
                const numShortAnsFields = shortAnsFields.length;

                // Checks if any of the short answer questions have gone over their word limits, and for those that did, their colors change to red
                for (let i = 0; i < numShortAnsFields; i++ ) {
                  let property = null;
                  let colorProp = null;
                  let colorTextProp = null;
                  if (this.countWords(this.state[shortAnsFields[i]]) > 200) {
                    property = shortAnsFields[i];
                    colorProp = property + 'Color';
                    colorTextProp = property + 'TextColor';
                    this.setState({
                      [colorProp]: InvalidColor, 
                      [colorTextProp]: redFont,
                      submitDisabled: true}, () => {
                      if (this.props.onChange) {
                        this.props.onChange(this.state);
                      }
                    });
                  }
                }
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
      <div className="ApplicationReview">

        {/* The question where the user enters basic info for the application, such as name, email address, etc. */}

        {/* If the page is still loading */}
        {this.state.loading && (<p className="applicationReviewLoading">Loading...</p>)}

        {/* If the page is done loading */}
        {!this.state.loading && (

          <div className="applicationReviewWhole">
            <div className="applicationReviewSection">
              <h3 className="applicationReviewLabel applicationReviewTitle">Your Application at a glance</h3>
              <p className='question-text'>Please take the time to review your responses and fill any missing information before pressing submit. After submitting, you will not be able to edit your application.</p>
            </div>
            <div className="applicationReviewBody-1">

              {/* The school year field */}
              <div className="applicationReviewSection">
                <p className="applicationReviewLabel">Current School Year:</p>
                <p style={{backgroundColor: this.state.yearColor, color: this.state.yearTextColor}} className="applicationReviewValue">{this.state.year}</p>
              </div>

              {/* The program field */}
              <div className="applicationReviewSection">
                <p className="applicationReviewLabel">Program:</p>
                <p style={{backgroundColor: this.state.programColor, color: this.state.programTextColor}} className="applicationReviewValue">{this.state.program}</p>
              </div>

              {/* The resume field */}
              <div className="applicationReviewSection">
                <p className="applicationReviewLabel">Resume Link:</p>
                <p style={{backgroundColor: this.state.resumeColor, color: this.state.resumeTextColor}} className="applicationReviewValue">{this.state.resume}</p>
              </div>

              {/* The school field */}
              <div className="applicationReviewSection">
                <h3 className="applicationReviewLabel">School/University:</h3>
                <p style={{backgroundColor: this.state.schoolColor, color: this.state.schoolTextColor}} className="applicationReviewValue">{this.state.school}</p>
              </div>
            </div>
            <div className="applicationReviewSection">
              <h3 className="applicationReviewLabel">Mailing Address:</h3>
              <p style={{backgroundColor: this.state.addressColor, color: this.state.addressTextColor}} className="applicationReviewValue">{this.state.address}</p>
            </div>
            <div className="applicationReviewBody-2">

              {/* The coding field */}
              <div className="applicationReviewSection">
                <h3 className="applicationReviewLabel reviewLongLabel">Question 1:</h3>
                <p className='question-text'>Do you have coding experience? eHacks strongly emphasizes a 1:1 ratio of technical 
                  and non-technical participants. Your answer to this question will not affect your chances
                   of getting accepted.</p>
                <div style={{backgroundColor: this.state.codingExperienceColor, color: this.state.codingExperienceTextColor}} className="applicationReviewValue reviewShortValue">
                  <p className='answer-text'>  {this.state.codingExperience}</p>
                </div>
              </div>

              {/* The entrepreneurship field */}
              <div className="applicationReviewSection">
                <h3 className="applicationReviewLabel reviewLongLabel">Question 2:</h3>
                <p className='question-text'>On a scale of 1 to 5 (with 5 being the highest), how interested are you in pursuing entrepreneurship as a career path?</p>
                <div style={{backgroundColor: this.state.entrepreneurshipInterestColor, color: this.state.entrepreneurshipInterestTextColor}} className="applicationReviewValue reviewShortValue">
                  <p className='answer-text'>  {this.state.entrepreneurshipInterest?.toString()}</p>
                </div>
              </div>


              {/* The coding field */}
              <div className="applicationReviewSection">
                <h3 className="applicationReviewLabel reviewLongLabel">Question 3:</h3>
                <p className='question-text'>On a scale of 1 to 5 (with 5 being the highest), how well do you think school prepared you for the workforce?</p>
                <div style={{backgroundColor: this.state.schoolForWorkforceColor, color: this.state.schoolForWorkforceTextColor}} className="applicationReviewValue reviewShortValue">
                  <p className='answer-text'>  {this.state.schoolForWorkforce?.toString()}</p>
                </div>
              </div>

              {/* The gain  field */}
              <div className="applicationReviewSection">
                <h3 className="applicationReviewLabel reviewLongLabel">Question 4:</h3>
                <p className='question-text'>
                What do you want to gain from this experience?</p>
                <p style={{backgroundColor: this.state.gainColor, color: this.state.gainTextColor}} className="applicationReviewValue reviewLongValue">{this.state.gain}</p>
              </div>

              {/* The product field */}
              <div className="applicationReviewSection">
                <h3 className="applicationReviewLabel reviewLongLabel">Question 5:</h3>
                <p className='question-text'>Tell us about a technical product or service that you are interested in. Why are you interested in it?</p>
                <p style={{backgroundColor: this.state.technicalProductColor, color: this.state.technicalProductTextColor}} className="applicationReviewValue reviewLongValue">{this.state.technicalProduct}</p>
              </div>

              {/* The deserted island field*/}
              <div className="applicationReviewSection">
                <h3 className="applicationReviewLabel reviewLongLabel">Question 6:</h3>
                <p className='question-text'>
                If you could bring three things to a deserted island what would they be and why?
                </p>
                <p style={{backgroundColor: this.state.desertedIslandColor, color: this.state.desertedIslandTextColor}} className="applicationReviewValue reviewLongValue">{this.state.desertedIsland}</p>
              </div>
              
              {/* The skills field*/}
              <div className="applicationReviewSection">
                <h3 className="applicationReviewLabel reviewLongLabel">Last Question:</h3>
                <p className='question-text'>
                Please list all your relevant skills
                </p>

                { this.state.skills === errorString ? <p style={{backgroundColor: this.state.skillsColor, color: redFont}} className="applicationReviewValue reviewLongValue">{this.state.skills}</p> :
                    <div className="ApplicationSkills__container">
                      {this.state.skills.split(',').map((skill) => (
                        <div className="ApplicationSkills__skill_item" key={skill}>
                          <span className="skill-text">{skill}</span>
                        </div>))}
                    </div>
                }
              </div>
            </div>
          </div>)

        }
      </div>
    );
  }
}

export default withRouter(ApplicationReview);

