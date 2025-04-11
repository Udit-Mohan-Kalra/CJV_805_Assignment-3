import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Use of Routes for navigation
import HomePage from './Home';
import Login from './Login'; 
import Signup from './Signup';
import MoviesGrid from './MoviesGrid';
import MovieDetails from './MovieDetails';
import TVShowDetails from './TVShowDetails';
import TVGrid from './TVGrid';
import UserDashboard from './UserDashboard'; // Importing the UserDashboard component

const App = () => {
    return (
        <Router> {/*Wrapping all the routes within the Router component to enable routing*/}
            <Routes> {/*Defining routes inside the Routes component to match the correct path*/}
                <Route path="/" element={<HomePage />} /> 
                <Route path="/login" element={<Login />} /> 
                <Route path="/signup" element={<Signup />} />
                <Route path="/movies" element={<MoviesGrid />} /> 
                <Route path="/tvs" element={<TVGrid />} /> 
                <Route path="/movies/:id" element={<MovieDetails />} /> 
                <Route path="/tvs/:id" element={<TVShowDetails />} /> 
                <Route path="/dashboard" element={<UserDashboard />} />
            </Routes>
        </Router>
    );
};

export default App;
