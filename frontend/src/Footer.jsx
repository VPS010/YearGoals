import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="social-media">
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter />
        </a>
        <a href="https://www.instagram.com/vinay.vibes/" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
        <a href="https://www.linkedin.com/in/vpsenapati/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin />
        </a>
        <a href="https://github.com/VPS010" target="_blank" rel="noopener noreferrer">
        <FaGithub />
        </a>
      </div>
      <div className="copyright">
        &copy; 2025 Made with <span className="heart">❤️</span> by Vinay
      </div>
    </footer>
  );
};

export default Footer;