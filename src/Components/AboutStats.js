import React from 'react';
import '../Styles/AboutStats.scss';

export default function AboutStats(props) {
  return (
    <div className="about-stats">
      <div className="about-img-box">  
        <img src={props.img} alt="" className="about-stats-img"/>
      </div>
      <div className="about-stats-num">{props.stat}</div>
      <div className="about-stats-desc">{props.desc}</div>
    </div>
  );
};


