import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../Styling/NavBar.css"

const NavBar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem('user');
        setIsLoggedIn(!!user);
    }, []);

    return (
        <nav className="nav">
            
            <div className="nav-container">
                <div className="content-links">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/movies" className="nav-link">Movies</Link>
                    <Link to="/tvs" className="nav-link">TV</Link>
                </div>
                <div className="nav-links">
                    {isLoggedIn ? (
                        <>
                            <Link to="/dashboard" className="nav-link profile-link">My Dashboard</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-link">Login</Link>
                            <Link to="/signup" className="nav-link">Signup</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;