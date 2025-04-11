import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styling/MoviesAndTVShows.css';
import Footer from './Footer';
import Header from './Header';

const MoviesGrid = () => {
    // State to hold the list of movies fetched from the API
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch('https://cjv-805-assignment-3.onrender.com/media/only-movies');
                const data = await response.json();
                setMovies(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching movies:', error);
                setLoading(false);
            }
        };

        fetchMovies();
    }, []); // Empty dependency array to ensure this effect runs only once, when the component renders.

    const handleMovieClick = (id) => {
        navigate(`/movies/${id}`);
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className='App'>
            <Header />
            <div className="featured-section">
                <h2 className="featured-title">All Movies</h2>
                <div className="movies-grid">
                    {movies.map(movie => (
                        <div 
                            key={movie.id} 
                            className="featured-card"
                            onClick={() => handleMovieClick(movie.id)}
                        >
                            <img src={movie.smallPoster} alt={movie.name} />
                            <h3>{movie.name}</h3>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default MoviesGrid;
