// The navbar component that allows the user to navigate within the site and
// to other links
import React, {useState} from 'react';
import '../Styles/Navbar.scss';
import ehacksLogo from '../Assets/ehacks_logo.png';
import facebookLogo from '../Assets/facebook_logo.jpg';
import instagramLogo from '../Assets/instagram_logo.jpg';
import linkedinLogo from '../Assets/linkedin_logo.jpg';
import mobileCloseBtn from '../Assets/mobile_close_btn.png';
import mobileOptionBtn from '../Assets/mobile_option_btn.png';
import PageLink from './PageLink';
import {useModal} from 'react-hooks-use-modal';
import SponsorPopup from '../Pages/SponsorPopup';
const bpLargest = 550;


const Navbar = () => {
  // These states will be used in the transition between opening and closing the links using mobile_option_btn
  const [optionBtnImg, setOptionBtnImg] = useState(mobileOptionBtn); // The image of the button to open/close the links in mobile
  const [navbarColor, setNavbarColor] = useState('transparent');// The background color of the navbar
  const [mobileLinksBackground, setMobileLinksBackground] =
    useState('transparent');// The background color of everything that appears once we press mobile_option_btn to open the links in mobile
  const [mobileLinkTransp, setMobileLinkTransp] = useState('0');// The transparency of everything that appears once we press mobile_option_btn to open the links in mobile
  const [mobileOptionBtnDisabled, setMobileOptionBtnDisabled] = useState(false);// Whether or not the mobile_option_btn is disabled
  const [open, setOpen] = useState(false);// Whether or not the links have been opened in mobile
  const [Modal, openModal, closeModal] = useModal('root', {
    preventScroll: true,
    closeOnOverlayClick: true,
  });

  window.onresize = removeMobileNavbar;
  // When we open the option button in mobile and then resize
  // the screen back to desktop, this function closes the mobile option button
  function removeMobileNavbar() {
    if (window.innerWidth > bpLargest && optionBtnImg == mobileCloseBtn) {
      document.getElementById('navbar__mobile_option_btn').click();
    }
  }

  // The JSX
  return (
    <div className="navbar__background">
      <nav className="navbar" style={{backgroundColor: navbarColor}}>
        {/* The eHacks logo and links to other parts of the page(desktop only) */}
        <div className="navbar__logo_and_links">
          <a className="navbar__logo-link" href="#home_scroll_point">
            <img src={ehacksLogo} className="navbar__logo" alt="logo" />
          </a>
          <div className="navbar__in_page_links">
            <a href="#home_scroll_point" className="navbar__link">
              <PageLink mobile={false} socialMedia = {false} img = {instagramLogo} linkName = "Home"/>
            </a>
            <a href="#about_scroll_point" className="navbar__link">
              <PageLink mobile={false} socialMedia = {false} img = {instagramLogo} linkName = "About"/>
            </a>
            <a href="#sponsors_scroll_point" className="navbar__link">
              <PageLink mobile={false} socialMedia = {false} img = {instagramLogo} linkName = "Sponsors"/>
            </a>
            <a href="#faq_scroll_point" className="navbar__link">
              <PageLink mobile={false} socialMedia = {false} img = {instagramLogo} linkName = "FAQ"/>
            </a>
          </div>
        </div>

        {/* The links to the social media pages(desktop only) */}
        <div className="navbar__social_media_icons">
          <a className="navbar__link navbar__link--margin" href="/login">
            <PageLink mobile={false} socialMedia = {false} img = {instagramLogo} linkName = "Login/Register"/>
          </a>
          <a onClick={openModal} className="navbar__link navbar__link--margin">
            <PageLink mobile={false} socialMedia = {false} img = {instagramLogo} linkName = "Sponsor Us"/>
          </a>
          <a href="https://www.instagram.com/ehacksevents/">
            <PageLink mobile={false} socialMedia = {true} img = {instagramLogo} linkName = "FAQ" link = "/#About_scroll_point"/>
          </a>
          <a href="https://www.facebook.com/ehacksevents">
            <PageLink mobile={false} socialMedia = {true} img = {facebookLogo} linkName = "FAQ" link = "/#About_scroll_point"/>
          </a>
          <a href="https://www.linkedin.com/company/ehacks-events/">
            <PageLink mobile={false} socialMedia = {true} img = {linkedinLogo} linkName = "FAQ" link = "/#About_scroll_point"/>
          </a>
        </div>

        {/* mobile options button to open and close links(mobile only) */}
        <a id="navbar__mobile_option_btn"
          className="navbar__mobile_option_btn" onClick={() => {
            console.log(window.innerHeight);
            // Makes sure the user can't click this button while
            // a transition between being open and closed happens
            if (mobileOptionBtnDisabled == false) {
              // If the options list is opened, and we want to close the links
              if (open) {
                setMobileOptionBtnDisabled(true);
                setNavbarColor('transparent');
                setOptionBtnImg(mobileOptionBtn);
                setMobileLinksBackground('transparent');
                setMobileLinkTransp(0);
                
                // Waits until the transition finishes before we enable the button & change positioning back to sticky
                setTimeout(() => {
                  setMobileOptionBtnDisabled(false);
                }, 701);

                // Waits until everything in this if statement finishes before we remove navbar__mobile
                setTimeout(() => setOpen(false), 702);
              } else { // If button is 3 lines, and we want to open the links
                setOpen(true);

                // ensures everything here happens after 'setOpen(true);' occurs
                setTimeout(() => {
                  setMobileOptionBtnDisabled(true);
                  setNavbarColor('#8566A3');
                  setOptionBtnImg(mobileCloseBtn);
                  setMobileLinksBackground('#8566A3');
                  setMobileLinkTransp(1);
                }, 10);

                // Waits until the transition finishes before we enable the button
                setTimeout(() => setMobileOptionBtnDisabled(false), 710);
              }
            }
          }
          }>
          <img className="navbar__mobile_option_btn_img" src={optionBtnImg} alt="mobile option button"/>
        </a>

        {/* The links to other parts of the page(mobile only) */}
        {open &&
          <div className="navbar__mobile"
            style = {{backgroundColor: mobileLinksBackground,
              height: window.innerHeight}}>
            <div className="navbar__in_page_links_mobile" style={{opacity: mobileLinkTransp}}>
              <a href="#home_scroll_point" className="navbar__link" onClick = {() => document.getElementById('navbar__mobile_option_btn').click()}>
                <PageLink mobile={true} socialMedia = {false} img = {instagramLogo} linkName = "Home"/>
              </a>
              <a href="#about_scroll_point" className="navbar__link" onClick = {() => document.getElementById('navbar__mobile_option_btn').click()}>
                <PageLink mobile={true} socialMedia = {false} img = {instagramLogo} linkName = "About"/>
              </a>
              <a href="#sponsors_scroll_point" className="navbar__link" onClick = {() => document.getElementById('navbar__mobile_option_btn').click()}>
                <PageLink mobile={true} socialMedia = {false} img = {instagramLogo} linkName = "Sponsors"/>
              </a>
              <a href="#faq_scroll_point" className="navbar__link" onClick = {() => document.getElementById('navbar__mobile_option_btn').click()}>
                <PageLink mobile={true} socialMedia = {false} img = {instagramLogo} linkName = "FAQ"/>
              </a>
              {

              }

              <a href="/login" className="navbar__link" onClick = {() => document.getElementById('navbar__mobile_option_btn').click()}>
                <PageLink mobile={true} socialMedia = {false} img = {instagramLogo} linkName = "Login/Register"/>
              </a>
              <a className="navbar__link" onClick = {() => {
                document.getElementById('navbar__mobile_option_btn').click();
                setTimeout(() => {
                  openModal();
                }, 500);
              }}
              >
                <PageLink mobile={true} socialMedia = {false} img = {instagramLogo} linkName = "Sponsor Us"/>
              </a>
            </div>

            {/* The social media links (mobile only) */}
            <div className="navbar__social_media_icons_mobile"
              style={{opacity: mobileLinkTransp}}>

              <a href="https://www.instagram.com/ehacksevents/">
                <PageLink mobile={true} socialMedia = {true} img = {instagramLogo} linkName = "FAQ" link = "/#About_scroll_point"/>
              </a>
              <a href="https://www.facebook.com/ehacksevents">
                <PageLink mobile={true} socialMedia = {true} img = {facebookLogo} linkName = "FAQ" link = "/#About_scroll_point"/>
              </a>
              <a href="https://www.linkedin.com/company/ehacks-events/">
                <PageLink mobile={true} socialMedia = {true} img = {linkedinLogo} linkName = "FAQ" link = "/#About_scroll_point"/>
              </a>
            </div>
          </div>
        }
      </nav>
      <Modal>
        <div>
          <SponsorPopup onClick={closeModal}/>
        </div>
      </Modal>
    </div>
  );
};

export default Navbar;
