// This component represents a link to either another section of the landing page or a social media page
import React from 'react';
import '../Styles/PageLink.scss';

const pageLink = (props) => {
  const socialMedia = props.socialMedia;
  const img = props.img; // Only used if socialMedia is true
  const linkName = props.linkName; // Only used if socialMedia is false
  // const link = props.link;
  const mobile = props.mobile;

  return ( 
    <div className="PageLink">
      {/* If the link is to a social media page in mobile */}
      {(socialMedia && mobile) &&
        <div className="PageLink__social_media_background_mobile">
          <img src={img}
            alt="instagram"
            className="PageLink__social_media"/>
        </div>
      }

      {/* If the link is to a social media page in desktop */}
      {(socialMedia && !mobile) &&
        <div className="PageLink__social_media_background">
          <img src={img}
            alt="instagram"
            className="PageLink__social_media"/>
        </div>
      }
      
      {/* If the link is to another part of the page in mobile */}
      {(!socialMedia && mobile) &&
        <div className="PageLink__in_page_link_mobile">
          <span className="PageLink__in_page_link_text_mobile">{linkName}</span>
        </div>
      }

      {/* If the link is to another part of the page in desktop */}
      {(!socialMedia && !mobile) &&
        <div className="PageLink__in_page_link">
          <span className="PageLink__in_page_link_text">{linkName}</span>
        </div>
      }
        
    </div>
  );
};
 
export default pageLink;

// Facebook: https://www.facebook.com/ehacksevents
// IG: https://www.instagram.com/ehacksevents/
// LinkedIn: https://www.linkedin.com/company/ehacks-events/
