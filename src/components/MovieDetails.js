import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Importing useParams to get the ID from the URL and useNavigate for navigation
import '../Styling/MovieAndTVDetails.css'; 
import Footer from './Footer';
import Header from './Header';

const MovieDetails = () => {
    const { id } = useParams(); // Getting the ID from the URL
    const [movie, setMovie] = useState(null); // State to store the movie details once fetched
    const [loading, setLoading] = useState(true); // State to manage the loading state (while data is being fetched)
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to check if the user is logged in.

    // useEffect Hook runs the fetchMovie function when the component first renders or when the id changes.
    useEffect(() => {
        // Check if user is logged in
        const user = localStorage.getItem('user');
        setIsLoggedIn(!!user);

        const fetchMovie = async () => {
            try {
                const response = await fetch(`https://cjv-805-assignment-3.onrender.com/media/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch movie');
                }
                const data = await response.json();
                setMovie(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching movie:', error);
                setLoading(false);
            }
        };
    
        fetchMovie();
    }, [id]); // Re-runs the effect when the 'id' from the URL changes.
    

    const handleRent = () => {
        if (!isLoggedIn) {
            alert('Please login first to rent this movie');
            return;
        }
        alert(`Movie rented for $${movie.rentPrice}`);
    };

    const handleBuy = () => {
        if (!isLoggedIn) {
            alert('Please login first to purchase this movie');
            return;
        }
        alert(`Movie purchased for $${movie.purchasePrice}`);
    };

    //Gets displayed if the data is still loading.
    if (loading) return <div>Loading...</div>;

    return (
        <div className='main'>
            <Header />
                {/* Setting the largePoster in the background */}
                <div 
                    className="details-container"
                    style={{
                        backgroundImage: `url(${movie.largePoster})`, 
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '100vh',  // Makes it take up the full viewport height                    
                    }}
                >
                <div className="content-overlay">
                    <h2 className="detail-title">{movie.name}</h2>
                    <img src={movie.smallPoster} alt={movie.name} />
                    <div className="price-buttons">
                        <button 
                            className="price-button rent"
                            onClick={handleRent}
                        >
                            Rent for ${movie.rentPrice}
                        </button>
                        <button 
                            className="price-button buy"
                            onClick={handleBuy}
                        >
                            Buy for ${movie.purchasePrice}
                        </button>
                    </div>
                        <p className='content-description'>{movie.synopsis}</p> 
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default MovieDetails;