import React from 'react';
import { HiOutlineDesktopComputer, HiOutlineTerminal, HiOutlineSparkles } from "react-icons/hi";

const Info = () => {
  return (
    <div className="about-info">
        <div className="about-box">
            <HiOutlineDesktopComputer className="about-icon" />
            <h3 className="about-title">Experience</h3>
            <span className="about-subtitle">3 months</span>
        </div>
        <div className="about-box">
            <HiOutlineTerminal className="about-icon" />
            <h3 className="about-title">Completed</h3>
            <span className="about-subtitle">5+ Projects</span>
        </div>
        <div className="about-box">
            <HiOutlineSparkles className="about-icon" />
            <h3 className="about-title">Support</h3>
            <span className="about-subtitle">Online 24/7</span>
        </div>
    </div>
  );
}

export default Info;