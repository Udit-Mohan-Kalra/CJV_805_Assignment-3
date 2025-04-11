import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styling/LoginSignup.css';
import Footer from './Footer';
import Header from './Header';

const Signup = () => {
    const [fname, setfname] = useState('');
    const [lname, setlname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Preparing the data to send in the POST request
        const userData = {
            firstName: fname,
            lastName: lname,
            email: email,
            password: password
        };

        try {
            console.log('Sending registration request...');
            // Sending POST request to the backend
            const response = await fetch('https://cjv-805-assignment-3.onrender.com/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            console.log('Response status:', response.status);
            
            // Getting the response text first
            const responseText = await response.text();

            // Parsing as JSON 
            let data;
            try {
                data = JSON.parse(responseText);
            } catch (e) {
                data = responseText;
            }

            // Handle the response based on status
            if (response.ok) {
                alert('Registration successful! Please log in to continue.');
                navigate('/login');
            } else {
                alert(data || 'An error occurred during registration. Please try again.');
            }
        } catch (error) {
            console.error('Registration error:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="page-container">
            <Header />
            <div className="login-wrapper">
                <div className="login-container">
                    <h2>Sign Up</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>First Name* :</label>
                            <input type="text" value={fname} onChange={(e) => setfname(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label>Last Name* :</label>
                            <input type="text" value={lname} onChange={(e) => setlname(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label>Email* :</label>
                            <input type="email" value={email} onChange={(e) => setemail(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label>Password* :</label>
                            <input type="password" value={password} onChange={(e) => setpassword(e.target.value)} required />
                        </div>
                        <div>
                            <button className="button" type="submit">Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Signup;