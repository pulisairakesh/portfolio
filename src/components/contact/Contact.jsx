import React, { useRef, useState, createRef } from 'react';
import "./contact.css";
import { HiOutlineMail, HiOutlineArrowSmRight } from "react-icons/hi";
import emailjs from '@emailjs/browser';
import ReCAPTCHA from "react-google-recaptcha";

const Contact = () => {
    const form = useRef();
    const recaptchaRef = createRef();
    const [status, setStatus] = useState(null);
    const [alertMessage, setAlertMessage] = useState("");

    const sendEmail = (e) => {
        e.preventDefault();
        
        // Get reCAPTCHA token
        const token = recaptchaRef.current.getValue();
        
        // Honeypot check - if checkbox is checked, it's likely a bot
        const honeypotChecked = form.current.bot_check.checked;
        if (honeypotChecked) {
            console.log("Spam detected");
            setAlertMessage("Your submission was not successful. Please try again.");
            setStatus(false);
            return;
        }
        
        // Form validation with reCAPTCHA
        if (!token) {
            setAlertMessage("Please complete the reCAPTCHA verification");
            setStatus(false);
            return;
        }
        
        // Proceed with email sending
        emailjs.sendForm(
            'service_l0yanyv', 
            'template_zhmjde9', 
            form.current, 
            'AEdG7o_wOq1b_2plk'
        )
        .then((result) => {
            console.log(result.text);
            setAlertMessage("Message sent successfully!");
            setStatus(true);
            e.target.reset();
            recaptchaRef.current.reset();
        }, (error) => {
            console.log(error.text);
            setAlertMessage("Failed to send the message, please try again later.");
            setStatus(false);
        });
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
                            <span className="contact-card-data">sairakesh2157@gmail.com</span>
                            
                            <a href="mailto:sairakesh2157@gmail.com" className="contact-button">
                                Write Me{" "}
                                <HiOutlineArrowSmRight className="contact-button-icon" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="contact-content">
                    <h3 className="contact-title">What's the project?</h3>
                    
                    {status !== null && (
                        <div className={`alert ${status ? "success" : "error"}`}>
                            {alertMessage}
                        </div>
                    )}
                    
                    <form ref={form} onSubmit={sendEmail} className="contact-form">
                        <div className="contact-form-div">
                            <label className="contact-form-tag">Name</label>
                            <input 
                                type="text" 
                                name="from_name" 
                                className="contact-form-input" 
                                placeholder="Type your name" 
                                required 
                            />
                        </div>
                        
                        <div className="contact-form-div">
                            <label className="contact-form-tag">Email</label>
                            <input 
                                type="email" 
                                name="reply_to" 
                                className="contact-form-input" 
                                placeholder="Type your email" 
                                required 
                            />
                        </div>
                        
                        <div className="contact-form-div contact-form-area">
                            <label className="contact-form-tag">Project</label>
                            <textarea 
                                name="message" 
                                cols="30" 
                                rows="10" 
                                className="contact-form-input" 
                                placeholder="Provide some project details..." 
                                required
                            ></textarea>
                        </div>
                        
                        {/* Honeypot field - invisible checkbox */}
                        <div className="honeypot-field" aria-hidden="true">
                            <input 
                                type="checkbox" 
                                name="bot_check" 
                                tabIndex="-1"
                                style={{
                                    opacity: 0,
                                    position: 'absolute',
                                    top: '-9999px',
                                    left: '-9999px',
                                    height: '1px',
                                    width: '1px',
                                    pointerEvents: 'none'
                                }}
                            />
                        </div>
                        
                        {/* reCAPTCHA component */}
                        <div className="recaptcha-container">
                            <ReCAPTCHA
                                ref={recaptchaRef}
                                sitekey="6LcHm9wqAAAAAP9X2kqHWAp9v6yKrAijGnT8WVzj"
                                onChange={() => setStatus(null)}
                            />
                        </div>
                        
                        <button type="submit" className="button btcn">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Contact;