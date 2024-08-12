import React, { useState } from "react";
import "./qualification.css";
import { HiOutlineAcademicCap, HiOutlineBriefcase, HiOutlineCalendar } from "react-icons/hi";

const Qualification = () => {
    const [toggleState, setToggleState] = useState(1)

    const toggleTab = (index) => {
        setToggleState(index);
    };
  
    return (
    <section className="qualification">
        <h2 className="section-title">Qualification</h2>
        <span className="section-subtitle">My Journey</span>

        <div className="qualification-container">
            <div className="qualification-tabs">
                <div className={toggleState === 1 ? "qualification-button qualification-active" 
                    : "qualification-button"} onClick={() => toggleTab(1)}>
                    <HiOutlineAcademicCap className="qualification-icon" />
                    Education
                </div>
                <div className={toggleState === 2 ? "qualification-button qualification-active" 
                    : "qualification-button"} onClick={() => toggleTab(2)}>
                    <HiOutlineBriefcase className="qualification-icon" />
                    Experience
                </div>
            </div>

            <div className="qualification-sections">
                <div className={toggleState === 1 ? "qualification-content qualification-content-active"
                    : "qualification-content"}>
                    <div className="qualification-data">
                        <div>
                            <h3 className="qualification-title">Bachelor's</h3>
                            <span className="qualification-subtitle">Malla Reddy Engineering College</span>
                            <div className="qualification-calendar">
                                <HiOutlineCalendar className="qualification-calendar-icon" />
                                2020-2024
                            </div>
                        </div>
                        <div>
                            <span className="qualification-rounder"></span>
                            <span className="qualification-line"></span>
                        </div>
                    </div>
                    <div className="qualification-data">
                        <div></div>
                        <div>
                            <span className="qualification-rounder"></span>
                            <span className="qualification-line"></span>
                        </div>
                        <div>
                            <h3 className="qualification-title">Intermediate(PCM)</h3>
                            <span className="qualification-subtitle">Narayana Jr. College</span>
                            <div className="qualification-calendar">
                                <HiOutlineCalendar className="qualification-calendar-icon" />
                                2018-2020
                            </div>
                        </div>
                    </div>
                    <div className="qualification-data">
                        <div>
                            <h3 className="qualification-title">Schooling(SSC)</h3>
                            <span className="qualification-subtitle">Sri Vani Vidhya Nikethan High School</span>
                            <div className="qualification-calendar">
                                <HiOutlineCalendar className="qualification-calendar-icon" />
                                2006-2018
                            </div>
                        </div>
                        <div>
                            <span className="qualification-rounder"></span>
                            <span className="qualification-line"></span>
                        </div>
                    </div>
                </div>
                <div className={toggleState === 2 ? "qualification-content qualification-content-active"
                    : "qualification-content"}>
                    <div className="qualification-data">
                        <div>
                            <h3 className="qualification-title">Full Stack Intern</h3>
                            <span className="qualification-subtitle">MEAN Stack</span>
                            <div className="qualification-calendar">
                                <HiOutlineCalendar className="qualification-calendar-icon" />
                                May 7 - Aug 7
                            </div>
                        </div>
                        <div>
                            <span className="qualification-rounder"></span>
                            <span className="qualification-line"></span>
                        </div>
                    </div>
                    <div className="qualification-data">
                        <div></div>
                        <div>
                            <span className="qualification-rounder"></span>
                            <span className="qualification-line"></span>
                        </div>
                        <div>
                            <h3 className="qualification-title">Team lead</h3>
                            <span className="qualification-subtitle">IOTEssence</span>
                            <div className="qualification-calendar">
                                <HiOutlineCalendar className="qualification-calendar-icon" />
                                2023
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section> 
  );
}

export default Qualification;