// the sticky notes for the carousel component
import React from 'react';
import '../Styles/StickyNote.scss';

export default function StickyNote(props) {
  return (
    <div className={props.class}>
      <div className="sticky__content">
        <div className="sticky__text">
          {props.content}
        </div>
        <div className="sticky__title-container">
          <p className="sticky__title">
            {props.title}
          </p>
        </div>
      </div>
    </div>
  );
};


