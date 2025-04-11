import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styling/LoginSignup.css'; 
import Footer from './Footer';
import Header from './Header';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://cjv-805-assignment-3.onrender.com/users/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
    
            const contentType = response.headers.get('content-type');
            const isJson = contentType && contentType.includes('application/json');
    
            const data = isJson ? await response.json() : null;
    
            if (response.ok) {
                // Save the full user data
                localStorage.setItem('user', JSON.stringify(data));
    
                alert('Welcome! Enjoy renting or buying movies and TV shows.');
                navigate('/dashboard');
            } else {
                alert('Invalid email or password.');
                
            }
        } catch (error) {
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="page-container">
            <Header />
            <div className="login-wrapper">
                <div className="login-container">
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Email* :</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label>Password* :</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <div>
                            <button className="button" type="submit">Login</button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Login;