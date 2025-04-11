import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import '../Styling/UserDashboard.css';

const UserDashboard = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);  // to track the loading state
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
            } catch (error) {
                console.error('Error parsing user data:', error);
                // In case of a parse error, force user to login again.
                localStorage.removeItem('user');
                navigate('/login');
            }
        } else {
            // If there is no user data in the localStorage, redirecting the user to login.
            navigate('/login');
        }

        // Setting the loading to false once user is processed
        setLoading(false);
    }, [navigate]);

    const handleLogout = () => {
        // Remove user data and redirect to login
        localStorage.removeItem('user');
        navigate('/login');
    };

    // If still loading or no user found, show loading state
    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (!user) {
        // Redirect back to login if user doesn't exist
        return <div>No user data found. Redirecting...</div>;
    }

    return (
        <div>
            <Header />
            <div className="dashboard-container">
                <div className="profile-card">
                    <div className="profile-header">
                        <h2>My Dashboard</h2>
                    </div>
                    <div className="profile-content">
                        <div className="profile-field">
                            <span className="field-label">First Name:</span>
                            <span className="field-value">{user.firstName}</span>
                        </div>
                        <div className="profile-field">
                            <span className="field-label">Last Name:</span>
                            <span className="field-value">{user.lastName}</span>
                        </div>
                        <div className="profile-field">
                            <span className="field-label">Email:</span>
                            <span className="field-value">{user.email}</span>
                        </div>
                    </div>
                    <div className="profile-actions">
                        <button onClick={handleLogout} className="logout-button">Logout</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default UserDashboard;