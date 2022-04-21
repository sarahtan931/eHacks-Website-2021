import React from 'react';
import '../Styles/About.scss';
import AboutStats from '../Components/AboutStats';
// import Calendar from '../Assets/calendar.png';
// import Settings from '../Assets/settings.png';
import Trophy from '../Assets/trophy.png';
import User from '../Assets/user.png';
import Carousel from '../Components/Carousel';
import Hands from '../Assets/hands.png';
import Gears from '../Assets/gears.png';
import Files from '../Assets/files.png';
import light from '../Assets/bulb.png';
import Balloon from '../Assets/balloon.png';

const About = () => {
  return (
    <div className="About Section" id = "about_scroll_point">
      <div className="about-content">
        <div className="about-desc-background">
          <div className="about-header-box">
            <img src={light} className="light-img"></img>
            <h1 className="about-header"> So, what is eHacks?</h1>
          </div>
          <p className="about-desc">
          eHacks, formerly EnactusHacks, is a nonprofit
           organization dedicated to
          youth education and enrichment. Our mission is
           to provide
          interdisciplinary learning experiences that empower 
          students to solve
          pressing social issues through technical innovation.
           Past issues
          included COVID-19 education and relief, supporting
           underrepresented groups,
          eco-living, and mental health initiatives. Registration No. 1304158-1.
          </p>
        </div>
        <div className="about-carousel">
          <h1 className="carousel-header">
            What makes eHacks different?
          </h1>
          <Carousel></Carousel>
        </div>
        <div className="about-glance">
          <h1 className="glance-header">
            This year&apos;s event at a glance
          </h1>
          <div className="glance-boxes">
            <AboutStats img={Trophy} stat="$3,000" desc="in prizes"></AboutStats>
            <AboutStats img={User} stat="200" desc="participants"></AboutStats>
            <AboutStats img={Gears} stat="8+" desc="workshops"></AboutStats>
            <AboutStats img={Hands} stat="20+" desc="partners"></AboutStats>
            <AboutStats img={Files} stat="40+" desc="projects built"></AboutStats>
            <div className="hide-desktop">
              <AboutStats img={Balloon} stat="24" desc="hours of fun!"></AboutStats>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
