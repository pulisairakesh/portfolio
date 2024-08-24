import React, { useState } from "react";
import './header.css';
import { HiOutlineHome, HiOutlineUser, HiOutlineBadgeCheck, HiOutlineClipboardList, HiOutlinePhotograph, HiOutlineMail, HiX, HiOutlineMenu } from "react-icons/hi";

const Header = () => {
    window.addEventListener("scroll", function () {
        const header = document.querySelector(".header");
        if(this.scrollY >= 80) header.classList.add("scroll-header");
        else header.classList.remove("scroll-header");
    });
   
    const [Toggle, showMenu] = useState(false);
    const [activeNav, setActiveNav] = useState("#home");

    // Function to handle link clicks and close the menu
    const handleNavClick = (id) => {
        setActiveNav(id);
        showMenu(false); // Close the menu by setting Toggle to false
    };

    return( 
        <header className="header">
            <nav className="nav h-container">
                <a href="index.html" className="nav-logo">Portfolio</a>
                <div className={ Toggle ? "nav-menu show-menu" : "nav-menu"}>
                    <ul className="nav-list">
                        <li className="nav-item">
                            <a href="#home" onClick={() => handleNavClick("#home")} 
                            className={activeNav === "#home" ? "nav-link active-link" : "nav-link"}>
                                <HiOutlineHome className="nav-icon"/>Home
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#about" onClick={() => handleNavClick("#about")} 
                            className={activeNav === "#about" ? "nav-link active-link" : "nav-link"}>
                                <HiOutlineUser className="nav-icon"/>About
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#skills" onClick={() => handleNavClick("#skills")} 
                            className={activeNav === "#skills" ? "nav-link active-link" : "nav-link"}>
                                <HiOutlineBadgeCheck className="nav-icon"/>Skills
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#services" onClick={() => handleNavClick("#services")} 
                            className={activeNav === "#services" ? "nav-link active-link" : "nav-link"}>
                                <HiOutlineClipboardList className="nav-icon"/>Services
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#projects" onClick={() => handleNavClick("#projects")} 
                            className={activeNav === "#projects" ? "nav-link active-link" : "nav-link"}>
                                <HiOutlinePhotograph className="nav-icon"/>Projects
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#contact" onClick={() => handleNavClick("#contact")} 
                            className={activeNav === "#contact" ? "nav-link active-link" : "nav-link"}>
                                <HiOutlineMail className="nav-icon"/>Contact
                            </a>
                        </li>
                    </ul>
                    <HiX className="nav-close" onClick={() => showMenu(false)} />
                </div>
                <div className="nav-toggle" onClick={() => showMenu(!Toggle)}>
                    <HiOutlineMenu />
                </div>
            </nav>
        </header>
    )
}

export default Header;