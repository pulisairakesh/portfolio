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
                    <p className="services-title">Web<br />Developer</p>
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
                                    Web page and app development
                                </p>
                            </li>
                            <li className="services-modal-service">
                                <HiOutlineCheckCircle className="services-modal-icon" />
                                <p className="services-modal-info">
                                    Integrate creative colloboration
                                </p>
                            </li>
        
                        </ul>
                    </div>
                </div>
            </div>
            <div className="services-content">
                <div>
                    <HiOutlineClipboardList className="services-icon" />
                    <p className="services-title">Frontend<br />Developer</p>
                </div>
                <span className="services-button" onClick={() => toggleTab2(1)}>
                    View More
                    <HiOutlineArrowSmRight className="services-button-icon" />
                </span>
                <div className={toggleState2 === 1 ? "services-modal active-modal" : "services-modal"}>
                    <div className="services-modal-content">
                        <HiX onClick={() => toggleTab2(0)} className="services-modal-close" />
                        <p className="services-modal-title">Developer</p>
                        <p className="services-modal-description">
                            Hands on experience in Front end development providing quality work.
                        </p>
                        <ul className="services-modal-services">
                            <li className="services-modal-service">
                                <HiOutlineCheckCircle className="services-modal-icon" />
                                <p className="services-modal-info">
                                    Front end Apps, SPA's, responsive UI's.
                                </p>
                            </li>
                            <li className="services-modal-service">
                                <HiOutlineCheckCircle className="services-modal-icon" />
                                <p className="services-modal-info">
                                    Interactive websites.
                                </p>
                            </li>
        
                        </ul>
                    </div>
                </div>
            </div>
            <div className="services-content">
                <div>
                    <HiOutlineClipboardList className="services-icon" />
                    <p className="services-title">Backend<br />Developer</p>
                </div>
                <span className="services-button" onClick={() => toggleTab3(1)}>
                    View More
                    <HiOutlineArrowSmRight className="services-button-icon" />
                </span>
                <div className={toggleState3 === 1 ? "services-modal active-modal" : "services-modal"}>
                    <div className="services-modal-content">
                        <HiX onClick={() => toggleTab3(0)} className="services-modal-close" />
                        <p className="services-modal-title">Developer</p>
                        <p className="services-modal-description">
                            can provide scalable backend services.
                        </p>
                        <ul className="services-modal-services">
                            <li className="services-modal-service">
                                <HiOutlineCheckCircle className="services-modal-icon" />
                                <p className="services-modal-info">
                                    backend and cloud services.
                                </p>
                            </li>
                            <li className="services-modal-service">
                                <HiOutlineCheckCircle className="services-modal-icon" />
                                <p className="services-modal-info">
                                    scalable abackend servers applications.
                                </p>
                            </li>
                            <li className="services-modal-service">
                                <HiOutlineCheckCircle className="services-modal-icon" />
                                <p className="services-modal-info">
                                    deployment and maintainance.
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