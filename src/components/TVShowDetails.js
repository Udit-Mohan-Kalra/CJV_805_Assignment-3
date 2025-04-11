import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../Styling/MovieAndTVDetails.css';
import Footer from './Footer';
import Header from './Header';

const TVShowDetails = () => {
    // Destructures the id from the URL using the useParams hook
    const { id } = useParams(); // Extracting the TV show ID from the URL parameter.
    const [TVShow, setTVShow] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // useEffect hook to fetch the TV show data when the component first renders or when id changes.
    useEffect(() => {
        // Check if user is logged in
        const user = localStorage.getItem('user');
        setIsLoggedIn(!!user);

        const fetchTVShow = async () => {
            try {
                const response = await fetch(`https://cjv-805-assignment-3.onrender.com/media/${id}`);
                const data = await response.json();
                setTVShow(data); // Updating the TVShow state with the fetched data
                setLoading(false);
            } catch (error) {
                console.error('Error fetching TV show:', error);
                setLoading(false);
            }
        };

        fetchTVShow();
    }, [id]);

    const handleRent = () => {
        if (!isLoggedIn) {
            alert('Please login first to rent this TV show');
            return;
        }
        alert(`TV Show rented for ${TVShow.rentPrice}`);
    };

    const handleBuy = () => {
        if (!isLoggedIn) {
            alert('Please login first to purchase this TV show');
            return;
        }
        alert(`TV Show purchased for ${TVShow.purchasePrice}`);
    };

    if (loading) return <div>Loading...</div>; //Show loading when the data is still loading.

    return (
        <div className="main">
            <Header />

            {/* Set the largePoster as the background */}
            <div
                className="details-container"
                style={{
                    backgroundImage: `url(${TVShow.largePoster})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '100vh'
                }}
            >
                <div className="content-overlay">
                    <div className="details-container">
                        <h2 className="detail-title">{TVShow.name}</h2>
                        <img src={TVShow.smallPoster} alt={TVShow.name} className="poster-thumbnail" />
                        <div className="price-buttons">
                            <button className="price-button rent" onClick={handleRent}>
                                Rent for ${TVShow.rentPrice}
                            </button>
                            <button className="price-button buy" onClick={handleBuy}>
                                Buy for ${TVShow.purchasePrice}
                            </button>
                        </div>
                        <p className="content-description">{TVShow.synopsis}</p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default TVShowDetails;