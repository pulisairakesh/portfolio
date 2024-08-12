import "./projects.css";
import React from "react";
import { HiOutlineTerminal } from "react-icons/hi";

const Projects = ()=>{
    return(
        <div className="projects" id="projects">
            <div className="pro-container">
            <div className="pro-info">
                <div className="pro-title">Projects</div>
                <div className="x">
                <div className="pro-box">
                    <HiOutlineTerminal className="about-icon" />
                    <h3 className="about-title">Portofolio</h3>
                </div>
                <div className="pro-box">
                    <HiOutlineTerminal className="about-icon" />
                    <h3 className="about-title">Admin panel</h3>
                </div>
                <div className="pro-box">
                    <HiOutlineTerminal className="about-icon" />
                    <h3 className="about-title">Quiz application</h3>
                </div>
                <div className="pro-box">
                    <HiOutlineTerminal className="about-icon" />
                    <h3 className="about-title">Job Hunt application</h3>
                </div>
                <div className="pro-box">
                    <HiOutlineTerminal className="about-icon" />
                    <h3 className="about-title">event manager</h3>
                </div>
                <div className="pro-box">
                    <HiOutlineTerminal className="about-icon" />
                    <h3 className="about-title">Todo App Gui</h3>
                </div>
                <a href="https://github.com/RakeshPuli11?tab=repositories" target="_blank" className="button btnp">
                        More Projects on Github.
                </a>
            </div>
            </div>
            </div>
        </div>
    )
}
export default Projects