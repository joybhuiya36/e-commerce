import React from "react";
import "./footer.style.scss";

const Footer = () => {
  return (
    <div className="footer">
      <div>
        <h3>Our Locations</h3>
        <p>Bangladesh</p>
        <p>India</p>
        <p>USA</p>
        <p>Japan</p>
        <p>Canada</p>
      </div>
      <div>
        <h3>Quick Links</h3>
        <p>Home</p>
        <p>Books</p>
        <p>Reviews</p>
        <p>Blogs</p>
      </div>
      <div>
        <h3>Information</h3>
        <p>About Us</p>
        <p>Privacy Policy</p>
        <p>Terms & Conditions</p>
        <p>Our Services</p>
        <p>Payment Method</p>
      </div>
      <div>
        <h3>Contact Us</h3>
        <p>+123-456-7890</p>
        <p>support@bookaro.com</p>
      </div>
    </div>
  );
};

export default Footer;
