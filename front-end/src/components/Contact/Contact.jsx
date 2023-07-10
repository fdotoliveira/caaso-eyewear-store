import React from "react";
import { useState } from "react";
import "./Contact.scss";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from "@mui/icons-material/Google";
import PinterestIcon from "@mui/icons-material/Pinterest";

const Contact = () => {
  const [email, setEmail] = useState("");

  const handleJoinUs = () => {
    setEmail("");
  };

  return (
    <div className="contact">
      <div className="wrapper">
        <span>BE IN TOUCH WITH US:</span>
        <div className="mail">
          
          <input
            type="text"
            placeholder="EMAIL ADDRESS"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleJoinUs}>JOIN US</button>
        </div>
        <div className="icons">
          <a href="https://www.facebook.com/" target="_blank">
            <FacebookIcon className="custom-icon" />
          </a>
          <a href="https://www.instagram.com/" target="_blank">
            <InstagramIcon className="custom-icon" />
          </a>
          <a href="https://www.twitter.com/" target="_blank">
            <TwitterIcon className="custom-icon" />
          </a>
          <a href="https://www.google.com/" target="_blank">
            <GoogleIcon className="custom-icon" />
          </a>
          <a href="https://www.pinterest.com/" target="_blank">
            <PinterestIcon className="custom-icon" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;