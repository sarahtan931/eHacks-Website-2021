import React from 'react';

const Link = (props) => {
  const inPage = props.inPage;

  if (inPage) {
    return (
      <span className="navbar__link">{props.text}</span>
    );
  } else {
    return (
      <img src={props.img_src}
        alt="instagram"
        className="navbar__insta navbar__social_media"/>
    );
  }
};

export default Link;
