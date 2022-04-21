import React from 'react';
import '../Styles/Sponsors.scss';
import Alphashine from '../Assets/alphashine.png';
import HSBC from '../Assets/hsbc.png';
import Propel from '../Assets/propel.png';
import Engineering from '../Assets/engineering.png';
// import IBM from '../Assets/IBMLogo.png';
import Ivey from '../Assets/IveyLogo.png';
import SSC from '../Assets/SocialScience.png';
import EY from '../Assets/ey.png';
// import RBC from '../Assets/RBCLogo.png';
// import GlobalSpark from '../Assets/GlobalSpark.png';
// import SocialScience from '../Assets/SocialScience.png';

const Sponsors = () => {
  return (
    <div className="sponsors" id="sponsors_scroll_point">
      <h1 className="sponsors-header">
       Our Sponsors
      </h1>
      <div className="sponsors-background">
        <div className='sponsors-top-new'>
          <img src={SSC} alt="Social Sci Logo" className='ssc-image' />
          <img src={Alphashine} alt="Alphashine Logo" className='global-image' />
        </div>
        <div className="sponsors-top">
          <img src={HSBC} alt="HSBC Logo" className='rbc-image' />
          <img src={Ivey} alt="Ivey Logo" className='rbc-image' />
          <img src={EY} alt="EY Logo" className='ey-image' />
        </div>
        <div className="sponsors-bottom">
          <img src={Propel} alt="Morisette Institute Logo" className='ibm-image' />
          <img src={Engineering} alt="Western Engineering Logo" className='ss-image' />
  
        </div>
      </div>
      <div className="sponsors-background-mobile">
        <div className="mobile-top">
          <img src={HSBC} alt="HSBC Logo" className='ibm-mobile' />
          <img src={Ivey} alt="Ivey Logo" className='ivey-mobile' />
        </div>
        <div className='mobile-new'>
          <img src={SSC} alt="Social Sci Logo" className='global-mobile' />
        </div>
        <div className="mobile-mid">
        
          <img src={EY} alt="EY Logo" className='ey-image' />
          <img src={Alphashine} alt="Alphashine Logo" className='global-mobile' />
        </div>
        <div className="mobile-bottom">
          <img src={Propel} alt="Morisette Institute Logo" className='ibm-mobile' />
          <img src={Engineering} alt="Western Engineering Logo" className='ss-mobile' />
        </div>
      </div>
    </div>
  );
};

export default Sponsors;
