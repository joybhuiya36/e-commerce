// BookstoreAbout.js

import React from "react";
import "./aboutPage.style.scss";

const AboutPage = () => {
  return (
    <div className="bookstore-about">
      <h2>About Our Bookstore</h2>
      <p>
        Welcome to Bookaro, your one-stop destination for a wide variety of
        books. We are passionate about reading and committed to providing book
        lovers with a diverse selection of high-quality books.
      </p>
      <h2>Our Mission</h2>
      <p>
        Our mission is to inspire and encourage a love for reading by offering a
        curated collection of books that cater to different tastes and
        interests. We believe that books have the power to enrich lives and
        broaden perspectives.
      </p>

      <h2>What Sets Us Apart</h2>
      <p>
        At Bookaro, we pride ourselves on our commitment to customer
        satisfaction. Our team works hard to ensure that every customer has a
        positive experience, from browsing our online catalog to receiving their
        order. We also strive to support local authors and independent
        publishers, bringing unique and lesser-known titles to our customers.
      </p>
    </div>
  );
};

export default AboutPage;
