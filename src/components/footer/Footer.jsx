import React from 'react';
import "./footer.css";
import { FiTwitter, FiGithub, FiLinkedin } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="footer">
        <div className="f-container">
            <h1 className="footer-title">Rakesh Puli</h1>
            <ul className="footer-list">
                <li>
                    <a href="#about" className="footer-link">About</a>
                </li>
                <li>
                    <a href="#projects" className="footer-link">Projects</a>
                </li>
                <li>
                    <a href="#services" className="footer-link">Services</a>
                </li>
            </ul>
            <div className="footer-social">
                <a href="https://x.com/RakehPuli" className="home-social-icon" target="_blank" rel="noreferrer">
                    <FiTwitter />
                </a>
                <a href="https://github.com/Rakeshpuli11" className="home-social-icon" target="_blank" rel="noreferrer">
                    <FiGithub />
                </a>
                <a href="https://www.linkedin.com/in/rakesh-puli/" className="home-social-icon" target="_blank" rel="noreferrer" >
                    <FiLinkedin />
                </a>    
            </div>
        </div>
    </footer>
  );
}

export default Footer;