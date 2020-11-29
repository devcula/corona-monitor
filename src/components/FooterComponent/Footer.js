import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram,
    faTwitter,
    faGithub,
    faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faMapMarkerAlt, faPhone, faEnvelope, faHeart } from '@fortawesome/free-solid-svg-icons';

const Footer = ({updated}) => {
    let updatedInMins = Math.floor((new Date().getTime() - updated) / 60000);
    return (
        <div style={{marginTop: '20px'}}>
            <footer className="footer-distributed shadow-5">
                <div className="footer-left">
                    <h3>Corona <span>Monitor</span></h3>
                    <p className="footer-links">
                        Data last updated: {isNaN(updatedInMins) ? "Not available" : `${updatedInMins} mins ago`}
                    </p>
                    <p className="footer-company-name">
                        MIT Licensed
                    </p>
                    <p className="footer-company-name">Copyright &copy; 2020 Abhishek Prasad</p>
                </div>
                <div className="footer-center">
                    <div>
                        <FontAwesomeIcon className="faIcon" icon={faMapMarkerAlt} />
                        <p>Pune, India</p>
                    </div>
                    <div>
                        <FontAwesomeIcon className="faIcon" icon={faPhone} />
                        <p>+91 6362947321</p>
                    </div>
                    <div>
                        <FontAwesomeIcon className="faIcon faEnvelope" icon={faEnvelope} />
                        <p><a href="mailto:devcula@outlook.com">devcula@outlook.com</a></p>
                    </div>
                </div>
                <div className="footer-right">
                    <p className="footer-company-about">
                        <span>About the website</span>
                        Made in time of need, this application was developed for community use. Made with <FontAwesomeIcon icon={faHeart} title="ReactJS" /> using <strong>ReactJS</strong>.
                    </p>
                    <div className="footer-icons">
                        <a href="https://github.com/devcula" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faGithub} title="Github" /></a>
                        <a href="https://in.linkedin.com/in/devcula" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedin} title="Linkedin" /></a>
                        <a href="https://twitter.com/devcula" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTwitter} title="Twitter" /></a>
                        <a href="https://www.instagram.com/devcula" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} title="Instagram" /></a>

                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer;