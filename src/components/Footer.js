import React from 'react';
import { Link } from 'react-router-dom';
import '../Styling/Footer.css'; 

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-menu">
                    <h3>Menu</h3>
                    <ul>
                    <li><Link to="/movies">Movies</Link></li>
                        <li><Link to="/tvs">TV</Link></li>
                        <li><Link to="/">Home</Link></li>
                    </ul>
                </div>
                <div className="social-media">
                    <h3>Follow Us</h3>
                    <ul>
                        <li><Link to="https://facebook.com">Facebook</Link></li>
                        <li><Link to="https://twitter.com">Twitter</Link></li>
                        <li><Link to="https://instagram.com">Instagram</Link></li>
                        <li><Link to="https://linkedin.com">LinkedIn</Link></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>The binge store. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;