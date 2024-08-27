import React from 'react';
import "./about.css";
import CV from "../../assets/resume.rakesh.puli.pdf";
import Info from "./Info";

const About = () => {
  return (
    <section className="about" id="about">
        <h2 className="section-title">About Me</h2>
        <span className="section-subtitle">A short introduction</span>
        <div className="abt-container">
            <div className="about-data">
                <Info />
                <p className="about-description">
                    I create web applications focusing on responsiveness and integration with api's.
                </p>
                <a download="" href={CV} className="button">
                    Download Resume.
                </a>
            </div>
        </div>
    </section>
  );
}

export default About;