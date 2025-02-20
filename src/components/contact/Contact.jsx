import React, { useRef, useState, createRef } from 'react';
import "./contact.css";
import { HiOutlineMail, HiOutlineArrowSmRight } from "react-icons/hi";
import emailjs from '@emailjs/browser';
import ReCAPTCHA from "react-google-recaptcha";
import DOMPurify from 'dompurify'; // Import DOMPurify for sanitization

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

    // Input validation functions
    const validateName = (name) => {
        // Allow letters, spaces, and common name characters
        const nameRegex = /^[a-zA-Z0-9 '.,-]{2,50}$/;
        if (!nameRegex.test(name)) {
            return "Please enter a valid name (2-50 characters)";
        }
        return "";
    };

    const validateEmail = (email) => {
        // RFC 5322 compliant email regex
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!emailRegex.test(email)) {
            return "Please enter a valid email address";
        }
        return "";
    };

    const validateMessage = (message) => {
        if (message.trim().length < 5 || message.length > 1000) {
            return "Message must be between 5 and 1000 characters";
        }
        
        // Check for potentially malicious patterns
        const suspiciousPatterns = [
            /<script/i,
            /javascript:/i,
            /on\w+=/i,
            /data:/i,
            /vbscript:/i,
            /expression\(/i
        ];
        
        for (const pattern of suspiciousPatterns) {
            if (pattern.test(message)) {
                return "Please remove code or script elements from your message";
            }
        }
        
        return "";
    };

    // Sanitize input before submission
    const sanitizeFormData = (formData) => {
        const sanitized = {};
        for (const [key, value] of formData.entries()) {
            if (typeof value === 'string') {
                // Use DOMPurify to sanitize string inputs
                sanitized[key] = DOMPurify.sanitize(value.trim(), {
                    ALLOWED_TAGS: [], // No HTML tags allowed
                    ALLOWED_ATTR: [] // No attributes allowed
                });
            } else {
                sanitized[key] = value;
            }
        }
        return sanitized;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let error = "";
        
        switch(name) {
            case 'from_name':
                error = validateName(value);
                setFormErrors(prev => ({ ...prev, name: error }));
                break;
            case 'reply_to':
                error = validateEmail(value);
                setFormErrors(prev => ({ ...prev, email: error }));
                break;
            case 'message':
                error = validateMessage(value);
                setFormErrors(prev => ({ ...prev, message: error }));
                break;
            default:
                break;
        }
    };

    const sendEmail = (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form.current);
        
        // Validate all inputs
        const nameError = validateName(formData.get('from_name'));
        const emailError = validateEmail(formData.get('reply_to'));
        const messageError = validateMessage(formData.get('message'));
        
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
        
        // Sanitize form data
        const sanitizedData = sanitizeFormData(formData);
        
        // Create a temporary form with sanitized data for EmailJS
        const tempForm = document.createElement('form');
        for (const key in sanitizedData) {
            const input = document.createElement('input');
            input.name = key;
            input.value = sanitizedData[key];
            tempForm.appendChild(input);
        }
        
        // Proceed with email sending
        emailjs.sendForm(
            'service_l0yanyv', 
            'template_zhmjde9', 
            tempForm, 
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