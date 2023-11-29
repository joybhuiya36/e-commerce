import React from "react";
import { FaShippingFast } from "react-icons/fa";
import { RiSecurePaymentFill } from "react-icons/ri";
import { TbTruckReturn } from "react-icons/tb";
import { MdOutlineSupportAgent } from "react-icons/md";
import "./service.style.scss";

const Service = () => {
  return (
    <div className="services">
      <div className="service">
        <div className="icon">
          <FaShippingFast />
        </div>
        <div className="text">
          <h4>Free Shipping</h4>
          <p>Order Over $100</p>
        </div>
      </div>
      <div className="service">
        <div className="icon">
          <RiSecurePaymentFill />
        </div>
        <div className="text">
          <h4>Secure Payment</h4>
          <p>100% Secure Payment</p>
        </div>
      </div>
      <div className="service">
        <div className="icon">
          <TbTruckReturn />
        </div>
        <div className="text">
          <h4>Easy Returns</h4>
          <p>7 Days Returns</p>
        </div>
      </div>
      <div className="service">
        <div className="icon">
          <MdOutlineSupportAgent />
        </div>
        <div className="text">
          <h4>24/7 Support</h4>
          <p>Call Us Anytime</p>
        </div>
      </div>
    </div>
  );
};

export default Service;
