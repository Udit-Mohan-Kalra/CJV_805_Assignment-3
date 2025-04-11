import React, { useState, useEffect } from 'react';
import '../Styling/App.css'; 

const HeroSection = () => {
    const [banners, setBanners] = useState([]); // Store the list of banners
    const [currentIndex, setCurrentIndex] = useState(0); // Store the index of the current banner for slide show
    const [loading, setLoading] = useState(true);
    // useEffect hook to fetch banner data when the component is first rendered.
    useEffect(() => {
        const fetchBanners = async () => {
            const response = await fetch('https://cjv-805-assignment-3.onrender.com/media');
            const data = await response.json();
            setBanners(data);
            setLoading(false);
        };

        fetchBanners();
    }, []); // Empty array to run the effect only once when the component renders.

    useEffect(() => {
        const interval = setInterval(() => {
            if (banners.length > 0) {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length); // Changes the index to the next one, and loop back to the first banner when reaching the end.
            }
        }, 2000); // Changes slide every 2 seconds

        return () => clearInterval(interval); 
    }, [banners]); // This effect runs again when banner changes.

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length); // Moves to the next slide and loop back to the first one if at the end.
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length); // Moves to the previous slide and loop back to the last one if at the beginning.
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="hero-section">
            {/* Banner section changing based on the currentIndex */}
            <div className="banner" style={{ backgroundImage: `url(${banners[currentIndex].smallPoster})` }}>
            </div>
            <button className="prev-button" onClick={prevSlide}>❮</button> 
            <button className="next-button" onClick={nextSlide}>❯</button>
        </div>
    );
};

export default HeroSection;