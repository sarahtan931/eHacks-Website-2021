// This is the part of the application with a question and additional components such as long answer questions or file attachments

import React, {Component} from 'react';
import '../Styles/ApplicationIsland.scss';
import {withRouter} from 'react-router-dom';

const wordLimit = 200;

class ApplicationIsland extends Component {
  constructor(props) {
    super(props);
    this.history;
    this.state = {
      loading: true,
      island: '',
      email: localStorage.getItem('email'),
      numWordsLeft: wordLimit};

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

    if (property == 'island') {
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
    const url = `${process.env.REACT_APP_URL}/applications/getpage7/${email}`;
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
                  island: data?.island ?? '', 
                  loading: false,
                }, () => {
                  if (this.props.onChange) {
                    this.props.onChange(this.state);
                  }
                });

                const wordCount = this.countWords(this.state.island);

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
      <div className="ApplicationIsland">

        {/* The question where the user tells us what they would bring to a deserted island */}

        {/* If the page is still loading */}
        {this.state.loading && (<p className="ApplicationIsland__loading">Loading...</p>)}

        {/* If the page is done loading */}
        {!this.state.loading && 
          <div className="ApplicationIsland__form">
            <div className="ApplicationIsland__question">
              {/* The question that is being asked */}
              <p className="ApplicationIsland__question_num">Question 6: </p>
              <p className="ApplicationIsland__question_text">If you could bring three things to a deserted island what would they be and why?</p>

              {/* An input field where the user types their response */}
              <textarea className="ApplicationIsland__field" name="island" onChange={this.handleChange} value={this.state.island} ></textarea>
              <p className="ApplicationIsland__word_count">Words Left: <span className="ApplicationIsland__num_words">{this.state.numWordsLeft}</span></p>

            </div>

          </div>
        }

      </div>
    );
  }
};

export default withRouter(ApplicationIsland);


