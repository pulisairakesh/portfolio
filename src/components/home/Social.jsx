import React from "react";
import { FiTwitter, FiGithub, FiLinkedin} from "react-icons/fi";

const Social = () => {
    return (
        <div className="home-social">
            <a href="https://x.com/RakehPuli" className="home-social-icon" target="_blank">
                <FiTwitter />
            </a>
            <a href="https://github.com/RakeshPuli11" className="home-social-icon" target="_blank">
                <FiGithub />
            </a>
            <a href="https://www.linkedin.com/in/rakesh-puli/" className="home-social-icon" target="_blank">
                <FiLinkedin />
            </a>
        </div> 
    ); 
}

export default Social;