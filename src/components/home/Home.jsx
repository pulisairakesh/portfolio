import "./home.css";
import Social from "./Social";
import Data from "./Data";
import React from "react";
import Scroll from "./Scroll";

const Home = () =>{
    return(
        <section id="#home">
        <div  className="ho-container">
            <Social/>
            <Data/>
            <div className="home-img"></div>
        </div>
        <Scroll/>
        </section>
    );
}
export default Home;