import React from "react";
import { HiCheckBadge } from "react-icons/hi2";

const Backend = () => {
    return(
        <div className="skills-content">
        <p className="skills-title">Security / Programming</p>
        <div className="skills-box">
            <div className="skills-group">
                <div className="skills-data">
                    <HiCheckBadge />
                    <div>
                        <p className="skills-name">Linux</p>
                    </div>
                </div>
                <div className="skills-data">
                    <HiCheckBadge />
                    <div>
                        <p className="skills-name">Node.js</p>
                    </div>
                </div>
                <div className="skills-data">
                    <HiCheckBadge />
                    <div>
                        <p className="skills-name">Java</p>
                    </div>
                </div>
         
            
                <div className="skills-data">
                    <HiCheckBadge />
                    <div>
                        <p className="skills-name">python</p>
                    </div>
                </div>
            </div>
            <div className="skills-group">
                    <div className="skills-data">
                                      <HiCheckBadge />
                                      <div>
                                          <p className="skills-name">Authentication</p>
                                      </div>
                                  </div>
                <div className="skills-data">
                    <HiCheckBadge />
                    <div>
                        <p className="skills-name">OS/Scripting</p>
                    </div>
                </div>
                <div className="skills-data">
                    <HiCheckBadge />
                    <div>
                        <p className="skills-name">Git</p>
                    </div>
                </div>
                <div className="skills-data">
                    <HiCheckBadge />
                    <div>
                        <p className="skills-name">MongoDB</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Backend;