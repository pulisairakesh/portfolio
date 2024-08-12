import React from "react";
import { HiCheckBadge } from "react-icons/hi2";

const Frontend = () => {
    return (
        <div className="skills-content">
            <p className="skills-title">Frontend</p>
            <div className="skills-box">
                <div className="skills-group">
                    <div className="skills-data">
                        <HiCheckBadge />
                        <div>
                            <p className="skills-name">HTML</p>
                        </div>
                    </div>
                    <div className="skills-data">
                        <HiCheckBadge />
                        <div>
                            <p className="skills-name">CSS/SASS</p>
                        </div>
                    </div>
                    <div className="skills-data">
                        <HiCheckBadge />
                        <div>
                            <p className="skills-name">Bootstrap</p>
                        </div>
                    </div>
                    <div className="skills-data">
                        <HiCheckBadge />
                        <div>
                            <p className="skills-name">Angular</p>
                        </div>
                    </div>
                    <div className="skills-data">
                        <HiCheckBadge />
                        <div>
                            <p className="skills-name">Figma</p>
                        </div>
                    </div>
                </div>
                <div className="skills-group">
                    <div className="skills-data">
                        <HiCheckBadge />
                        <div>
                            <p className="skills-name">JavaScript</p>
                        </div>
                    </div>
                    <div className="skills-data">
                        <HiCheckBadge />
                        <div>
                            <p className="skills-name">Typescript</p>
                        </div>
                    </div>
                    <div className="skills-data">
                        <HiCheckBadge />
                        <div>
                            <p className="skills-name">React</p>
                        </div>
                    </div>
                    <div className="skills-data">
                        <HiCheckBadge />
                        <div>
                            <p className="skills-name">Gui's</p>
                        </div>
                    </div>
                    <div className="skills-data">
                        <HiCheckBadge />
                        <div>
                            <p className="skills-name">Rxjs/Redux</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Frontend;