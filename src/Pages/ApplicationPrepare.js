// This is the part of the application with a question and additional components such as long answer questions or file attachments

import React, {Component} from 'react';
import '../Styles/ApplicationPrepare.scss';
import {withRouter} from 'react-router-dom';

const selectedColor = '#7673FF';
const notSelectedColor = '#E1E0FF';

class ApplicationPrepare extends Component {
  constructor(props) {
    super(props);
    this.history;
    this.state = {
      loading: true,
      page: 4,
      prepare: 0,
      option1: notSelectedColor,
      option2: notSelectedColor,
      option3: notSelectedColor,
      option4: notSelectedColor,
      option5: notSelectedColor,
      email: localStorage.getItem('email'),
      lastOption: undefined,
    };

    this.updateChange = this.updateChange.bind(this);
    this.optionPressed = this.optionPressed.bind(this);
    this.hoverOption = this.hoverOption.bind(this);
    this.leaveHoverOption = this.leaveHoverOption.bind(this);
    this.selectOption = this.selectOption.bind(this);
  }


  componentDidMount() {
    const email = encodeURIComponent(localStorage.getItem('email'));
    const authToken = localStorage.getItem('token');
    const url = `${process.env.REACT_APP_URL}/applications/getpage4/${email}`;
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
                const optionName = 'option' + data.prepare;
                this.selectOption(optionName, data.prepare);

                this.setState({
                  page: this.state.page,
                  prepare: data.prepare,
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

  // Changes the state of this question, paramter 'interest' is new interest number(1-5)
  updateChange(p) {
    this.setState({
      page: this.state.page,
      prepare: p,
      email: this.state.email,
    }, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state);
      }
    });
  }

  // When the user presses one of the buttons on the scale, paramter 'e' is event that called this function
  optionPressed(e) {
    const selectedOption = e.target.id;
    const optionNum = parseInt(selectedOption.substring(6));

    this.selectOption(selectedOption, optionNum);
  }

  // This selects one of the options on the scale, parameters 'selectedOption' is option text name and 'optionNum' is option number
  selectOption(selectedOption, optionNum) {
    this.setState({[selectedOption]: selectedColor}, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state);
      }
    });

    const lastOptionNum = this.state.lastOption;
    const optionPrefix = 'option';
    
    if (lastOptionNum !== undefined) {
      if (lastOptionNum !== optionNum) {
        const lastOptionName = optionPrefix.concat(lastOptionNum);
        this.setState({[lastOptionName]: notSelectedColor}, () => {
          if (this.props.onChange) {
            this.props.onChange(this.state);
          }
        });
      }
    }

    this.setState({lastOption: optionNum}, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state);
      }
    });
    this.updateChange(optionNum);
  }

  // When the user hovers over one of the option buttons, parameter 'e' is event that called this function
  hoverOption(e) {
    const selectedOption = e.target.name;
    this.setState({[selectedOption]: selectedColor}, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state);
      }
    });
  }

  // When the user's mouse leavs one of the option buttons, parameter 'e' is event that called this function
  leaveHoverOption(e) {
    const selectedOption = e.target.name;
    const optionNum = parseInt(selectedOption.substring(6));

    if (this.state.prepare !== optionNum) {
      this.setState({[selectedOption]: notSelectedColor}, () => {
        if (this.props.onChange) {
          this.props.onChange(this.state);
        }
      });
    } else {
      this.setState({[selectedOption]: selectedColor}, () => {
        if (this.props.onChange) {
          this.props.onChange(this.state);
        }
      });
    }
  }


  render() {
    return (
      <div className="ApplicationPrepare">

        {/* The question where the user tells us how much they think school has prepared them for the workforce */}

        {/* If the page is still loading */}
        {this.state.loading && (<p className="ApplicationPrepare__loading">Loading...</p>)}

        {/* If the page is done loading */}
        {!this.state.loading && 

        <div className="ApplicationPrepare__form">
          {/* The question that is being asked */}
          <div className="ApplicationPrepare__question">
            <p className="ApplicationPrepare__question_num">Question 3:</p>
            <p className="ApplicationPrepare__question_text">On a scale of 1 to 5 (with 5 being the highest), how well do you think school prepared you for the workforce?</p>

          </div>

          <div className="ApplicationPrepare__scale">
            {/* Left side of the scale */}
            <div className="ApplicationPrepare__left_text_div">
              <p className="ApplicationPrepare__left_text">Not At All</p>
            </div>

            {/* The option 1 */}
            <div className="ApplicationPrepare__option">
              <p className="ApplicationPrepare__option_num">1</p>
              <button style={{backgroundColor: this.state.option1}} id='option1' onMouseEnter={this.hoverOption} onMouseLeave={this.leaveHoverOption} onClick={this.optionPressed} className="ApplicationPrepare__option_btn"></button>
            </div>

            {/* The option 2 */}
            <div className="ApplicationPrepare__option">
              <p className="ApplicationPrepare__option_num">2</p>
              <button style={{backgroundColor: this.state.option2}} id='option2' onMouseEnter={this.hoverOption} onMouseLeave={this.leaveHoverOption} onClick={this.optionPressed} className="ApplicationPrepare__option_btn"></button>
            </div>

            {/* The option 3 */}
            <div className="ApplicationPrepare__option">
              <p className="ApplicationPrepare__option_num">3</p>
              <button style={{backgroundColor: this.state.option3}} id='option3' onMouseEnter={this.hoverOption} onMouseLeave={this.leaveHoverOption} onClick={this.optionPressed} className="ApplicationPrepare__option_btn"></button>
            </div>

            {/* The option 4 */}
            <div className="ApplicationPrepare__option">
              <p className="ApplicationPrepare__option_num">4</p>
              <button style={{backgroundColor: this.state.option4}} id='option4' onMouseEnter={this.hoverOption} onMouseLeave={this.leaveHoverOption} onClick={this.optionPressed} className="ApplicationPrepare__option_btn"></button>
            </div>

            {/* The option 5 */}
            <div className="ApplicationPrepare__option">
              <p className="ApplicationPrepare__option_num">5</p>
              <button style={{backgroundColor: this.state.option5}} id='option5' onMouseEnter={this.hoverOption} onMouseLeave={this.leaveHoverOption} onClick={this.optionPressed} className="ApplicationPrepare__option_btn"></button>
            </div>

            {/* Right side of the scale */}
            <div className="ApplicationPrepare__left_text_div">
              <p className="ApplicationPrepare__right_text">School Has Been Super Helpful!</p>
            </div>
          </div>

        </div>

        }
      </div>
    );
  }
};

export default withRouter(ApplicationPrepare);


