import React from 'react';
import "./skills.css";
import Frontend from './Frontend';
import Backend from './Backend';

const Skills = () => {
  return (
    <section className="skills" id="skills">
        <h2 className="section-title">Skills</h2>
        <div className="skills-container">
            <Frontend />
            <Backend /> 
        </div>
    </section>
  );
}

export default Skills;