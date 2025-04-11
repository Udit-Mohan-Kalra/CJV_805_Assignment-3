import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styling/FeaturedSection.css';

const FeaturedMovies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch('https://cjv-805-assignment-3.onrender.com/media/featured-movies?featured=true');
                const data = await response.json();
                setMovies(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching featured movies:', error);
                setLoading(false);
            }
        };
    
        fetchMovies();
    }, []);

    const handleMovieClick = (id) => {
        navigate(`/movies/${id}`);
    };

    if (loading) return <div>Loading...</div>;

    //To scroll the rail left.
    const scrollLeft = () => {
        const container = document.getElementById('featured-movies-container');
        container.scrollBy({ left: -200, behavior: 'smooth' });
    };

    //To scroll the rail right.
    const scrollRight = () => {
        const container = document.getElementById('featured-movies-container');
        container.scrollBy({ left: 200, behavior: 'smooth' });
    };


    return (
        <div className="featured-section">
            <h2 className="featured-title"> Featured Movies</h2>
            <div className="scroll-container">
                <div className="featured-scroll" id="featured-movies-container">
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
                <button className="scroll-button left" onClick={scrollLeft}>&lt;</button>
                <button className="scroll-button right" onClick={scrollRight}>&gt;</button>
            </div>
        </div>
    );
};

export default FeaturedMovies;