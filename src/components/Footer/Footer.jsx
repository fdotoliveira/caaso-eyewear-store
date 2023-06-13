import React from "react";
import "./Footer.scss";
import { Link } from "react-router-dom";
import Contact from "../Contact/Contact";

const Footer = () => {
  return (
    <div className="footer">
      <Contact />
      <div className="top">
        <div className="item">
          <h1>Categories</h1>
          <Link className ="link" to="/products/1">Eyeglasses</Link>
          <Link className ="link" to="/products/2">Sunglasses</Link>
          <Link className ="link" to="/products/3">Accessories</Link>
        </div>
        <div className="item">
          <h1>About</h1>
          <span>
            At CAASO Eyewear, we offer a wide selection of sunglasses, prescription glasses, and fashion accessories. 
            Our goal is to provide an exceptional shopping experience where you can find the perfect eyewear to complement your style. 
            We work with renowned brands and prioritize quality and authenticity. 
            Enjoy a simple and secure purchasing process on our user-friendly website. Explore our collection and express your unique style with CAASO Eyewear.
          </span>
        </div>
        <div className="item">
          <h1>Contact</h1>
          <span>
           CAASO Eyewear Store is an eyewear company that offers high-quality and stylish products. To get in touch, you can call the number (99) 9999-9999, 
           send an email to info@caasoeyewear.com, find us on social media as @caasoeyewearstore, or visit our physical store at 400 Av. Trab. São Carlense, Parque Arnold Schimidt, São Carlos. 
           We are ready to assist with your inquiries and provide excellent customer service.
          </span>
        </div>
      </div>
      <div className="bottom">
        <div className="left">
          <span className="logo">CAASO Eyewear</span>
          <span className="copyright">
            © Copyright 2023. All Rights Reserved
          </span>
        </div>
        <div className="right">
          <img src="/img/payment.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Footer;