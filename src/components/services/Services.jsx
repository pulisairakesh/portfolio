import React, { useState } from 'react';
import './services.css';
import { HiOutlineClipboardList, HiOutlineArrowSmRight, HiOutlineCheckCircle, HiX } from 'react-icons/hi';

const Services = () => {
    const [toggleState1, setToggleState1] = useState(0);
    const [toggleState2, setToggleState2] = useState(0);
    const [toggleState3, setToggleState3] = useState(0);


    const toggleTab1 = (index) => {
        setToggleState1(index);
    };
    const toggleTab2 = (index) => {
        setToggleState2(index);
    };
    const toggleTab3 = (index) => {
        setToggleState3(index);
    };
    return (
    <section className="services" id="services">
        <h2 className="section-title">Services</h2>
        <span className="section-subtitle">Create + Collaborate</span>
    
        <div className="services-container">
            <div className="services-content">
                <div>
                    <HiOutlineClipboardList className="services-icon" />
                    <p className="services-title">Web App<br />Developer</p>
                </div>
                <span className="services-button" onClick={() => toggleTab1(1)}>
                    View More
                    <HiOutlineArrowSmRight className="services-button-icon" />
                </span>
                <div className={toggleState1 === 1 ? "services-modal active-modal" : "services-modal"}>
                    <div className="services-modal-content">
                        <HiX onClick={() => toggleTab1(0)} className="services-modal-close" />
                        <p className="services-modal-title">Developer</p>
                        <p className="services-modal-description">
                            Over 3 months of experience in web development providing quality work.
                        </p>
                        <ul className="services-modal-services">
                            <li className="services-modal-service">
                                <HiOutlineCheckCircle className="services-modal-icon" />
                                <p className="services-modal-info">
                                    Web app development through secure coding.
                                </p>
                            </li>
                            <li className="services-modal-service">
                                <HiOutlineCheckCircle className="services-modal-icon" />
                                <p className="services-modal-info">
                                    Database Management.
                                </p>
                            </li>
        
                        </ul>
                    </div>
                </div>
            </div>
            <div className="services-content">
                <div>
                    <HiOutlineClipboardList className="services-icon" />
                    <p className="services-title">Application<br />Security</p>
                </div>
                <span className="services-button" onClick={() => toggleTab2(1)}>
                    View More
                    <HiOutlineArrowSmRight className="services-button-icon" />
                </span>
                <div className={toggleState2 === 1 ? "services-modal active-modal" : "services-modal"}>
                    <div className="services-modal-content">
                        <HiX onClick={() => toggleTab2(0)} className="services-modal-close" />
                        <p className="services-modal-title">App Sec Analysis</p>
                        <p className="services-modal-description">
                            Finding Web App Vulnerabilities
                        </p>
                        <ul className="services-modal-services">
                            <li className="services-modal-service">
                                <HiOutlineCheckCircle className="services-modal-icon" />
                                <p className="services-modal-info">
                                    Vulnerability Scanning.
                                </p>
                            </li>
                            <li className="services-modal-service">
                                <HiOutlineCheckCircle className="services-modal-icon" />
                                <p className="services-modal-info">
                                    Penetration Testing.
                                </p>
                            </li>
        
                        </ul>
                    </div>
                </div>
            </div>
            <div className="services-content">
                <div>
                    <HiOutlineClipboardList className="services-icon" />
                    <p className="services-title">Agile Skills<br /></p>
                </div>
                <span className="services-button" onClick={() => toggleTab3(1)}>
                    View More
                    <HiOutlineArrowSmRight className="services-button-icon" />
                </span>
                <div className={toggleState3 === 1 ? "services-modal active-modal" : "services-modal"}>
                    <div className="services-modal-content">
                        <HiX onClick={() => toggleTab3(0)} className="services-modal-close" />
                        <p className="services-modal-title">Adaptability & Collaboration through Agile Methodology</p>
                        <p className="services-modal-description">
                            
                        </p>
                        <ul className="services-modal-services">
                            <li className="services-modal-service">
                                <HiOutlineCheckCircle className="services-modal-icon" />
                                <p className="services-modal-info">
                                    Ability to learn and adapt.
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        
    </section>
  );
}

export default Services;