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
        RETURN_DOM_FRAGMENT: false,
        RETURN_DOM_IMPORT: false,
    });

    // Enhanced XSS detection patterns
    const xssPatterns = [
        /<.*script.*>/i,
        /<.*\son\w+.*=.*>/i,
        /<.*style.*=.*\bexpression\b.*>/i,
        /<.*href.*=.*javascript:.*>/i,
        /<.*href.*=.*data:.*>/i,
        /<.*href.*=.*vbscript:.*>/i,
        /<.*src.*=.*javascript:.*>/i,
        /<.*src.*=.*data:.*>/i,
        /<.*src.*=.*vbscript:.*>/i,
        /<.*srcset.*=.*javascript:.*>/i,
        /<.*formaction.*=.*javascript:.*>/i,
        /<.*action.*=.*javascript:.*>/i,
        /<.*iframe.*>/i,
        /<.*object.*>/i,
        /<.*embed.*>/i,
        /<.*applet.*>/i,
        /<.*meta.*>/i,
        /<.*svg.*onload.*>/i,
        /<.*svg.*<script.*>/i,
        /<.*img.*onerror.*>/i
    ];

    // Function to check for XSS patterns
    const containsXSS = (input) => {
        // Early return for empty inputs
        if (!input || input.trim() === '') return false;
        
        // Check against all patterns
        return xssPatterns.some(pattern => pattern.test(input));
    };

    // Sanitize and validate functions
    const sanitizeInput = (input) => {
        if (!input) return "";
        
        // First strip all HTML completely
        let sanitized = DOMPurify.sanitize(input, {
            ALLOWED_TAGS: [],
            ALLOWED_ATTR: []
        });
        
        // Then encode HTML special characters
        sanitized = sanitized
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
            
        return sanitized.trim();
    };

    const validateName = (name) => {
        if (!name || name.trim().length < 2 || name.length > 50) {
            return "Name must be between 2 and 50 characters";
        }
        
        // Check for potential XSS in name
        if (containsXSS(name)) {
            return "Name contains invalid characters or potential script";
        }
        
        return "";
    };

    const validateEmail = (email) => {
        // RFC 5322 compliant email regex
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!email || !emailRegex.test(email)) {
            return "Please enter a valid email address";
        }
        
        // Check for potential XSS in email
        if (containsXSS(email)) {
            return "Email contains invalid characters or potential script";
        }
        
        return "";
    };

    const validateMessage = (message) => {
        if (!message || message.trim().length < 10 || message.length > 1000) {
            return "Message must be between 10 and 1000 characters";
        }
        
        // Check for potential XSS in message
        if (containsXSS(message)) {
            return "Message contains invalid characters or potential script";
        }
        
        return "";
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        // Real-time sanitization of input
        const sanitizedValue = sanitizeInput(value);
        e.target.value = sanitizedValue;
        
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
        
        // Clone the form data and sanitize all inputs
        const formData = new FormData(form.current);
        const sanitizedFormData = new FormData();
        
        // Sanitize each field and check for XSS
        let hasXSS = false;
        
        for (const [key, value] of formData.entries()) {
            if (typeof value === 'string') {
                if (containsXSS(value)) {
                    hasXSS = true;
                    break;
                }
                
                const sanitizedValue = sanitizeInput(value);
                sanitizedFormData.append(key, sanitizedValue);
            } else {
                sanitizedFormData.append(key, value);
            }
        }
        
        // If XSS detected, block submission
        if (hasXSS) {
            setAlertMessage("Potential security threat detected. Please remove any code or script elements.");
            setStatus(false);
            return;
        }
        
        // Validate sanitized data
        const nameError = validateName(sanitizedFormData.get('from_name'));
        const emailError = validateEmail(sanitizedFormData.get('reply_to'));
        const messageError = validateMessage(sanitizedFormData.get('message'));
        
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
        
        // Honeypot check
        const honeypotChecked = form.current.bot_check.checked;
        if (honeypotChecked) {
            console.log("Spam detected");
            setAlertMessage("Your submission was not successful. Please try again.");
            setStatus(false);
            return;
        }
        
        // reCAPTCHA validation
        if (!token) {
            setAlertMessage("Please complete the reCAPTCHA verification");
            setStatus(false);
            return;
        }
        
        // Create a temporary form with sanitized data for EmailJS
        const tempForm = document.createElement('form');
        for (const [key, value] of sanitizedFormData.entries()) {
            const input = document.createElement('input');
            input.name = key;
            input.value = value;
            tempForm.appendChild(input);
        }
        
        // Proceed with email sending using sanitized data
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
                                onPaste={(e) => {
                                    e.preventDefault();
                                    const pastedText = sanitizeInput(e.clipboardData.getData('text'));
                                    e.target.value = pastedText;
                                    handleInputChange({
                                        target: { name: 'from_name', value: pastedText }
                                    });
                                }}
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
                                onPaste={(e) => {
                                    e.preventDefault();
                                    const pastedText = sanitizeInput(e.clipboardData.getData('text'));
                                    e.target.value = pastedText;
                                    handleInputChange({
                                        target: { name: 'reply_to', value: pastedText }
                                    });
                                }}
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
                                onPaste={(e) => {
                                    e.preventDefault();
                                    const pastedText = sanitizeInput(e.clipboardData.getData('text'));
                                    e.target.value = pastedText;
                                    handleInputChange({
                                        target: { name: 'message', value: pastedText }
                                    });
                                }}
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