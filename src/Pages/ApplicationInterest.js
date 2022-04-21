// This is the part of the application with a question and additional components such as long answer questions or file attachments
import React, {Component} from 'react';
import '../Styles/ApplicationInterest.scss';
import {withRouter} from 'react-router-dom';

const wordLimit = 200;

class ApplicationInterest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      interest: '',
      email: localStorage.getItem('email'),
      numWordsLeft: wordLimit};
      
    this.history;
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

    if (property == 'interest') {
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
    const url = `${process.env.REACT_APP_URL}/applications/getpage6/${email}`;
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
                  interest: data?.interest ?? '', 
                  loading: false,
                }, () => {
                  if (this.props.onChange) {
                    this.props.onChange(this.state);
                  }
                });

                const wordCount = this.countWords(this.state.interest);

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
      <div className="ApplicationInterest">

        {/* The question where the user tells us about a technical product or service they're interested in */}

        {/* If the page is still loading */}
        {this.state.loading && (<p className="ApplicationInterest__loading">Loading...</p>)}

        {/* If the page is done loading */}
        {!this.state.loading && 

        <div className="ApplicationInterest__form">
          <div className="ApplicationInterest__question">
            {/* The question that is being asked */}
            <p className="ApplicationInterest__question_num">Question 5: </p>
            <p className="ApplicationInterest__question_text">Tell us about a technical product or service that you are interested in. Why are you interested in it?</p>

            {/* An input field where the user types their response */}
            <textarea className="ApplicationInterest__field" name="interest" onChange={this.handleChange} value={this.state.interest} ></textarea>
            <p className="ApplicationInterest__word_count">Words Left: <span className="ApplicationInterest__num_words">{this.state.numWordsLeft}</span></p>

          </div>

        </div>
        }

      </div>
    );
  }
};

export default withRouter(ApplicationInterest);


