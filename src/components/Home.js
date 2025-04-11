import React from 'react';
import HeroSection from './HeroSection';
import FeaturedMovies from './FeaturedMovies'; // Importing the FeaturedMovies component
import FeaturedTVShows from './FeaturedTVShows';
import Header from './Header';
import Footer from './Footer';
import '../Styling/Home.css'

const HomePage = () => {
    return (
        <div className='Home'>
            <Header/>
            <HeroSection />
            <FeaturedMovies /> 
            <FeaturedTVShows/>
            <div className='image-container'>
                <img src="YS.jpg" alt="Content" className='image'/>
            </div>
            <Footer/>
        </div>
    );
};

export default HomePage;