import './Hector.css';
import React from "react";

function About() {
  return (
    <div className="about-us-container">
      <section className="aboutus">
        <div className="container">
          <div className="row">
            <div className="col-md-4 my-auto">
              <h4>About Us</h4>
            </div>
            <div className="col-md-8 my-auto">
              <h6 className="float-end">. . . . . . </h6>
            </div> 
          </div>
        </div>
      </section>
      {/*<------------------------------------*/}

      <section className="section bg-light border-botton">
        <div className="container">
          <h5 className="main-heading"> Our Company</h5>
          <div className="underline"></div>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy Lorem
            Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy Lorem Ipsum is
            simply dummy text of the printing and typesetting industry. Lorem
            Ipsum has been the industry's standard dummy Lorem Ipsum is simply
            dummy text of the printing and typesetting industry. Lorem Ipsum has
            been the industry's standard dummy
          </p>
        </div>
      </section>
      {/* Compant Vision, mission and values */}
      <section className="section bg-light border-top">
        <div className="container">
          <div className="row">
            <div className="col-md-12 mb-4 text-center">
              <h3 className="main-heading"> Vision, Mission and Values</h3>
              <div className="underline mx-auto"></div>
            </div>
            <div className="col-md-4 text-center">
              <h6>Our Vision</h6>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been
              </p>
            </div>
            <div className="col-md-4 text-center">
              <h6>Our Mission</h6>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been
              </p>
            </div>
            <div className="col-md-4 text-center">
              <h6>Our Core Values</h6>
              <p>
                LLorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum has been
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default About;