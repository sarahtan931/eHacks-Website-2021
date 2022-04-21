// This is the part of the application with a question and additional components such as long answer questions or file attachments

import React, {Component} from 'react';
import '../Styles/ApplicationGain.scss';
import {withRouter} from 'react-router-dom';

const wordLimit = 200;

class ApplicationGain extends Component {
  constructor(props) {
    super(props);
    this.history;
    this.state = {
      loading: true,
      gain: '',
      numWordsLeft: wordLimit,
      email: localStorage.getItem('email')};

    this.handleChange = this.handleChange.bind(this);
    this.countWords = this.countWords.bind(this);
  }

  // When the text in the field changes, the word count is checked and updated as needed, parameter 'event' is event that called this function
  handleChange(event) {
    const property = event.target.name;
    this.setState({[property]: event.target.value}, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state);
      }
    });

    if (property == 'gain') {
      const wordCount = this.countWords(event.target.value);

      this.setState({numWordsLeft: (wordLimit - wordCount)}, () => {
        if (this.props.onChange) {
          this.props.onChange(this.state);
        }
      });
    }
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
    const url = `${process.env.REACT_APP_URL}/applications/getpage5/${email}`;
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
                  gain: data?.gain ?? '', 
                  loading: false,
                }, () => {
                  if (this.props.onChange) {
                    this.props.onChange(this.state);
                  }
                });
                
                const wordCount = this.countWords(this.state.gain);

                this.setState({numWordsLeft: (wordLimit - wordCount)}, () => {
                  if (this.props.onChange) {
                    this.props.onChange(this.state);
                  }
                });
              },
          );
    }
  };
  
  onChange(e) {
    const files = e.target.files;
    console.warn('data file', files);
  }

  render() {
    return (
      <div className="ApplicationGain">

        {/* The question where the user tells us what they want to gain from eHacks */}

        {/* If the page is still loading */}
        {this.state.loading && (<p className="ApplicationGain__loading">Loading...</p>)}

        {/* If the page is done loading */}
        {!this.state.loading && 

        <div className="ApplicationGain__form">
          <div className="ApplicationGain__question">
            {/* The question that is being asked */}
            <p className="ApplicationGain__question_num">Question 4: </p>
            <p className="ApplicationGain__question_text">What do you want to gain from this experience?</p>

            {/* An input field where the user types their response */}
            <textarea className="ApplicationGain__field" name="gain" onChange={this.handleChange} value={this.state.gain}></textarea>
            <p className="ApplicationGain__word_count">Words Left: <span className="ApplicationGain__num_words">{this.state.numWordsLeft}</span></p>

          </div>

        </div>

        }

      </div>
    );
  }
};


export default withRouter(ApplicationGain);


