// This is the part of the application with a question and additional components such as long answer questions or file attachments

import React, {Component} from 'react';
import '../Styles/ApplicationSkills.scss';
import skillX from '../Assets/skillX.png';
import {withRouter} from 'react-router-dom';

class ApplicationSkills extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      page: 'skills',
      skills: [],
      currSkill: '',
      email: localStorage.getItem('email'),
    };
    this.history;
    this.handleChange = this.handleChange.bind(this);
    this.skillChanged = this.skillChanged.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.addSkill = this.addSkill.bind(this);
    this.deleteSkill = this.deleteSkill.bind(this);
  }

  // When the text in the input field where the user enters their skills changes, parameter 'e' is the event
  skillChanged(e) {
    this.setState({
      currSkill: e.target.value,
    }, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state);
      }
    });
  };

  handleChange(event) {
    const property = event.target.name;
    this.setState({[property]: event.target.value}, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state);
      }
    });
  }
  
  componentDidMount() {
    const email = encodeURIComponent(localStorage.getItem('email'));
    const authToken = localStorage.getItem('token');
    if (!email || !localStorage.getItem('isAuth')) {
      localStorage.clear();
      this.props.history.push('*');
    } else {
      const url = `${process.env.REACT_APP_URL}/applications/getpage${this.state.page}/${email}`;
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
                const skillsToAdd = [];
                for (let i = 0; i < data.skills.length; i++) {
                  skillsToAdd.push({id: i, name: data.skills[i]});
                }

                this.setState({
                  page: this.state.page,
                  skills: skillsToAdd,
                }, () => {
                  if (this.props.onChange) {
                    this.props.onChange(this.state);
                  }
                });
              },
          );
    }
  };

  // When the user presses the Enter key, parameter 'e' is the event
  handleEnter(e) {
    if (e.key === 'Enter') {
      this.addSkill();
    }
  };

  // To add a skill to the list of skills, parameter 'e' is the event
  addSkill(e) {
    const skill = this.state.currSkill.replaceAll(',', '');

    if (skill !== '') {
      this.setState({
        skills: [...this.state.skills, {id: this.state.skills.length, name: skill}], 
        currSkill: ''}, () => {
        if (this.props.onChange) {
          this.props.onChange(this.state);
        }
      });
    }
  };

  // To delete a skill from the list of skills, parameter 'e' is the event
  deleteSkill(e) {
    const index = e.target.id;
    const skillsLen = this.state.skills?.length;
    const newSkills = [];

    let j = 0;

    for (let i = 0; i < skillsLen; i++) {
      if (i != index) {
        newSkills.push({id: j, name: this.state.skills[i].name});
        j++;
      }
    }
    this.setState({skills: newSkills}, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state);
      }
    });
  };

  render() {
    return (
      <div className="ApplicationSkills">

        {/* The question where the user lists their skills */}
        <div className="ApplicationSkills__window">

          <div className="ApplicationSkills__form">
            {/* The question that is being asked */}
            <div className="ApplicationSkills__question">
              <p className="ApplicationSkills__question_num">Last Question! </p>
              <p className="ApplicationSkills__question_text">Please list all your relevant skills in the tag box below (Use the &apos;Add&apos; button or the Enter key to add a skill)!</p>

            </div>

            {/* Where the user enters a skill */}
            <div className="ApplicationSkills__enter">
              <input type="text" className="ApplicationSkills__skills_field" placeholder="Type New Skills" 
                onKeyDown={this.handleEnter} onChange={this.skillChanged} value={this.state.currSkill}/>
              <button className="ApplicationSkills__skills_field_btn" onClick={this.addSkill}>Add</button>
            </div>

            {/* A list of the skills the user has entered */}
            <div className="ApplicationSkills__skills_list">
              {this.state.skills.map((skill) => (
                <div className="ApplicationSkills__skill_item ApplicationSkills__max-width" key={skill.id}>
                  <span className="ApplicationSkills__skill_text">{skill.name}</span>
                  <img className="ApplicationSkills__skill_del_btn" src={skillX} id={skill.id} onClick={this.deleteSkill}/>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    );
  }
};

export default withRouter(ApplicationSkills);
