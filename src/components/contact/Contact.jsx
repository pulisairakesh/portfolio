import React, { useRef, useState, createRef } from 'react';
import "./contact.css";
import { HiOutlineMail, HiOutlineArrowSmRight } from "react-icons/hi";
import emailjs from '@emailjs/browser';
import ReCAPTCHA from "react-google-recaptcha";
import DOMPurify from 'dompurify';

const Contact = () => {
    const form = useRef();
    const recaptchaRef = createRef();
    const [status, setStatus] = useState(null);
    const [alertMessage, setAlertMessage] = useState("");
    const [formErrors, setFormErrors] = useState({
        name: "",
        email: "",
        message: ""
    });
    
    // Configure DOMPurify to be extremely strict
    DOMPurify.setConfig({
        ALLOWED_TAGS: [], // No HTML tags allowed
        ALLOWED_ATTR: [], // No attributes allowed
        KEEP_CONTENT: true, // Keep the text content
        RETURN_DOM: false, // Return a string
    });

    // Enhanced XSS detection patterns
    const xssPatterns = [
        /<.*script.*>/i,
        /<.*\son\w+.*=.*>/i,
        /<.*style.*=.*\bexpression\b.*>/i,
        /<.*href.*=.*javascript:.*>/i,
        /<.*iframe.*>/i,
        /<.*object.*>/i,
        /<.*embed.*>/i
    ];

    // Function to check for XSS patterns
    const containsXSS = (input) => {
        if (!input || input.trim() === '') return false;
        return xssPatterns.some(pattern => pattern.test(input));
    };

    // Sanitize input
    const sanitizeInput = (input) => {
        if (!input) return "";
        // Strip all HTML completely
        return DOMPurify.sanitize(input, {
            ALLOWED_TAGS: [],
            ALLOWED_ATTR: []
        }).trim();
    };

    const validateName = (name) => {
        if (!name || name.trim().length < 2 || name.length > 50) {
            return "Name must be between 2 and 50 characters";
        }
        if (containsXSS(name)) {
            return "Name contains invalid characters or potential script";
        }
        return "";
    };

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!email || !emailRegex.test(email)) {
            return "Please enter a valid email address";
        }
        if (containsXSS(email)) {
            return "Email contains invalid characters or potential script";
        }
        return "";
    };

    const validateMessage = (message) => {
        if (containsXSS(message)) {
            return "Message contains invalid characters or potential script";
        }
        return "";
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        // Real-time sanitization of input
        const sanitizedValue = sanitizeInput(value);
        
        // Validate and set any errors
        let error = "";
        switch(name) {
            case 'from_name':
                error = validateName(sanitizedValue);
                setFormErrors(prev => ({ ...prev, name: error }));
                break;
            case 'reply_to':
                error = validateEmail(sanitizedValue);
                setFormErrors(prev => ({ ...prev, email: error }));
                break;
            case 'message':
                error = validateMessage(sanitizedValue);
                setFormErrors(prev => ({ ...prev, message: error }));
                break;
            default:
                break;
        }
    };

    const sendEmail = (e) => {
        e.preventDefault();
        
        // Get form data for validation
        const formData = new FormData(form.current);
        const formName = sanitizeInput(formData.get('from_name'));
        const formEmail = sanitizeInput(formData.get('reply_to'));
        const formMessage = sanitizeInput(formData.get('message'));
        
        // Validate all fields
        const nameError = validateName(formName);
        const emailError = validateEmail(formEmail);
        const messageError = validateMessage(formMessage);
        
        setFormErrors({
            name: nameError,
            email: emailError,
            message: messageError
        });
        
        // If any validation errors, don't proceed
        if (nameError || emailError || messageError) {
            setAlertMessage("Please fix the errors in the form");
            setStatus(false);
            return;
        }
        
        // Check reCAPTCHA
        const token = recaptchaRef.current.getValue();
        if (!token) {
            setAlertMessage("Please complete the reCAPTCHA verification");
            setStatus(false);
            return;
        }
        
        // Honeypot check
        const honeypotChecked = form.current.bot_check.checked;
        if (honeypotChecked) {
            setAlertMessage("Your submission was not successful. Please try again.");
            setStatus(false);
            return;
        }
        
        // Important: Update the form values with sanitized content before submission
        form.current.from_name.value = formName;
        form.current.reply_to.value = formEmail;
        form.current.message.value = formMessage;
        
        // Send the sanitized form directly
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
            form.current.reset();
            recaptchaRef.current.reset();
            setFormErrors({ name: "", email: "", message: "" });
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
                                className={`contact-form-input ${formErrors.name ? "error-input" : ""}`} 
                                placeholder="Type your name" 
                                onChange={handleInputChange}
                                maxLength={50}
                                required 
                            />
                            {formErrors.name && <div className="error-text">{formErrors.name}</div>}
                        </div>
                        
                        <div className="contact-form-div">
                            <label className="contact-form-tag">Email</label>
                            <input 
                                type="email" 
                                name="reply_to" 
                                className={`contact-form-input ${formErrors.email ? "error-input" : ""}`} 
                                placeholder="Type your email" 
                                onChange={handleInputChange}
                                maxLength={100}
                                required 
                            />
                            {formErrors.email && <div className="error-text">{formErrors.email}</div>}
                        </div>
                        
                        <div className="contact-form-div contact-form-area">
                            <label className="contact-form-tag">Project</label>
                            <textarea 
                                name="message" 
                                cols="30" 
                                rows="10" 
                                className={`contact-form-input ${formErrors.message ? "error-input" : ""}`} 
                                placeholder="Provide some project details..." 
                                onChange={handleInputChange}
                                maxLength={1000}
                                required
                            ></textarea>
                            {formErrors.message && <div className="error-text">{formErrors.message}</div>}
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