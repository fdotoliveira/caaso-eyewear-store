import React from "react";
import "./Contact.scss";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from "@mui/icons-material/Google";
import PinterestIcon from "@mui/icons-material/Pinterest";

const Contact = () => {
  return (
    <div className="contact">
      <div className="wrapper">
        <span>BE IN TOUCH WITH US:</span>
        <div className="mail">
          <input type="text" placeholder="EMAIL ADDRESS" />
          <button>JOIN US</button>
        </div>
        <div className="icons">
          <a href="https://www.facebook.com/" target="_blank">
            <FacebookIcon />
          </a>
          <a href="https://www.instagram.com/" target="_blank">
            <InstagramIcon />
          </a>
          <a href="https://www.twitter.com/" target="_blank">
            <TwitterIcon />
          </a>
          <a href="https://www.google.com/" target="_blank">
            <GoogleIcon />
          </a>
          <a href="https://www.pinterest.com/" target="_blank">
            <PinterestIcon />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;