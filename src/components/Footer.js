import React from "react";
import { SlEnvolope, SlPhone, SlLocationPin } from "react-icons/sl";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <h4>The Furniture Co.</h4>
        <div className="footer-info">
        <div className="footer-card">
          <SlEnvolope />
          <p>info@furniture.com</p>
        </div>
        <div className="footer-card">
          <SlPhone />
          <p>+372 666499977</p>
        </div>
        <div className="footer-card">
          <SlLocationPin />
          <p>Tallinn, Estonia</p>
        </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
