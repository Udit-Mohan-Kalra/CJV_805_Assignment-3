import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styling/FeaturedSection.css';

const FeaturedTVShows = () => {
    const [tvShows, setTvShows] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTVShows = async () => {
            try {
                const response = await fetch('https://cjv-805-assignment-3.onrender.com/media/featured-tv-shows?featured=true');
                const data = await response.json();
                setTvShows(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching featured TV shows:', error);
                setLoading(false);
            }
        };

        fetchTVShows();
    }, []);

    const handleShowClick = (id) => {
        navigate(`/tvs/${id}`);
    };

    const scrollLeft = () => {
        const container = document.getElementById('featured-tvshows-container');
        container.scrollBy({ left: -200, behavior: 'smooth' });
    };

    const scrollRight = () => {
        const container = document.getElementById('featured-tvshows-container');
        container.scrollBy({ left: 200, behavior: 'smooth' });
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="featured-section">
            <h2 className="featured-title">Featured TV Shows</h2>
            <div className="scroll-container">
                <div className="featured-scroll" id="featured-tvshows-container">
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
                <button className="scroll-button left" onClick={scrollLeft}>&lt;</button>
                <button className="scroll-button right" onClick={scrollRight}>&gt;</button>
            </div>
        </div>
    );
};

export default FeaturedTVShows;