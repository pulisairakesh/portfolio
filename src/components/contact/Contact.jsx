import React, { useRef } from 'react';
import "./contact.css";
import { HiOutlineMail, HiOutlineArrowSmRight } from "react-icons/hi"
import emailjs from '@emailjs/browser';

const Contact = () => {
    const form = useRef();
    
    const sendEmail = (e) => {
        e.preventDefault();
        console.log(form.current)
        emailjs.sendForm('service_pbrqber', 'template_yq3bgx5', form.current, 'eXqU5sD7F_TPp2BQf')
        .then((result) => {
            console.log(result.text);
            alert("Message sent successfully!");
        }, (error) => {
            console.log(error.text);
            alert("Failed to send the message, please try again later.");
        });

        e.target.reset();
    };
  
    return (
    <section className="contact" id="contact">
        <h2 className="section-title">Let's Connect</h2>
        <span className="section-subtitle">Contact Me</span>

        <div className="contact-container">
            <div className="contact-content">
                <h3 className="contact-title">Talk to me</h3>
                
                <div className="contact-info">
                    <div className="contact-card">
                        <HiOutlineMail className="contact-card-icon" />
                        
                        <h3 className="contact-card-title">Email</h3>
                        <span className="contact-card-data">pulisairakesh2157@gmail.com</span>
                        
                        <a href="mailto:pulisairakesh2157@gmail.com" className="contact-button">
                            Write Me{" "} 
                            <HiOutlineArrowSmRight className="contact-button-icon" />
                        </a>
                    </div>
                </div>
            </div>

            <div className="contact-content">
                <h3 className="contact-title">What's the project?</h3>

                <form ref={form} onSubmit={sendEmail} className="contact-form">
                    <div className="contact-form-div">
                        <label className="contact-form-tag">Name</label>
                        <input type="text" name="from_name" className="contact-form-input" placeholder="Type your name" />
                    </div>

                    <div className="contact-form-div">
                        <label className="contact-form-tag">Email</label>
                        <input type="email" name="reply_to" className="contact-form-input" placeholder="Type your email" />
                    </div>

                    <div className="contact-form-div contact-form-area">
                        <label className="contact-form-tag">Project</label>
                        <textarea name="message" cols="30" rows="10" className="contact-form-input" placeholder="Provide some project details..."></textarea>
                    </div>

                    <button href="#contact" className="button btcn">
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    </section>
  );
}

export default Contact;