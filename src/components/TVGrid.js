import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styling/MoviesAndTVShows.css';
import Footer from './Footer';
import Header from './Header';

const TVShowsGrid = () => {
    const [tvShows, setTvShows] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTVShows = async () => {
            try {
                const response = await fetch('https://cjv-805-assignment-3.onrender.com/media/only-tv-shows');
                const data = await response.json();
                setTvShows(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching TV shows:', error);
                setLoading(false);
            }
        };

        fetchTVShows();
    }, []);

    const handleShowClick = (id) => {
        navigate(`/tvs/${id}`);
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className='App'>
            <Header />
            <div className="featured-section">
                <h2 className="featured-title">All TV Shows</h2>
                <div className="movies-grid">
                    {tvShows.map(show => (
                        <div 
                            key={show.id} 
                            className="featured-card"
                            onClick={() => handleShowClick(show.id)}
                        >
                            <img src={show.smallPoster} alt={show.name} />
                            <h3>{show.name}</h3>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default TVShowsGrid;