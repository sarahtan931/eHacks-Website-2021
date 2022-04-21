// The component representing each question in the FAQ section, and each instance of this component represents a question and its answer
import React, {useState} from 'react';
import '../Styles/FAQQuestion.scss';

const FAQQuestion = (props) => {
  const question = props.question;
  const answer = props.answer;
  const answerArray = answer.split('<br>');// This array represents the paragraphs, each of which is separated by <br>


  const [answerOpen, setAnswerOpen] = useState(false);// Simply represents whether or not the answer for this question is open or not
  const [answerDisplay, setAnswerDisplay] = useState('none');// Whether or not the answer for this question is displayed
  const [openCloseIcon, setOpenCloseIcon] = useState('+');// The icon for the button used to open and close the answer for this question

  return (
    <div className="FAQQuestion">
      <a className="FAQQuestion__open_close_btn" onClick = {() => {
        if (answerOpen == false) {// If the answer is not shown, and the user wants to open it
          setAnswerOpen(true);
          setAnswerDisplay('inline');
          setOpenCloseIcon('-');
        } else {// If the answer is shown, and the user wants to close it
          setAnswerOpen(false);
          setAnswerDisplay('none');
          setOpenCloseIcon('+');
        }
      }}>
        <div className="FAQQuestion__initial_parts">
          <p className="FAQQuestion__question">{question}</p>
          <p className="FAQQuestion__open_close_text">{openCloseIcon}</p>
        </div>

        {answerArray.map((value, index) => {// Returns all of the paragraphs
          return <p key={index} style={{display: answerDisplay}} className="FAQQuestion__answer">{value}<br/></p>;
        })}


        <hr className="FAQQuestion__separatorLine"/>
      </a>
    </div>
  );
};

export default FAQQuestion;
