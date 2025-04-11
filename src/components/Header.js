import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Styling/Header.css';
import logo from '../assets/logo.png';
import NavBar from './NavBar';

const Header = () => {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    // useEffect hook to trigger search functionality whenever 'search' changes
    useEffect(() => {
        const searchWait = setTimeout(() => {
            if (search.trim().length > 0) {
                // Sending a search request to the backend API with the query parameter 'title'
                fetch(`https://cjv-805-assignment-3.onrender.com/media/search?title=${encodeURIComponent(search)}`)
                    .then((res) => res.json())
                    .then((data) => {
                        setResults(data);
                        setShowDropdown(true); // Showing the dropdown menu with search results
                    })
                    .catch((err) => {
                        setResults([]);
                    });
            } else {
                // If the search is empty, clears results and hide the dropdown
                setResults([]);
                setShowDropdown(false);
            }
        }, 200); // putting 200ms searchWait

        return () => clearTimeout(searchWait);
    }, [search]); // This effect runs every time 'search' is updated

    // Function to handle clicks on the search result
    const handleResultClick = (id, type) => {
        setTimeout(() => {
            setSearch(''); // Clears the search input after selecting a result
            setResults([]); // Clears the search results
            setShowDropdown(false); // Hides the dropdown after selection
            navigate(type === 'movie' ? `/movies/${id}` : `/tvs/${id}`); // Navigates to the selected movie or TV show page
        }, 0);
    };

    return (
        <div className="nav-container">
            <Link to="/" className="logo-link">
                <img src={logo} alt="The Binge Store Logo" className="logo" />
            </Link>

            <div className="search-wrapper">
                <input
                    type="text"
                    placeholder="Search movies or shows..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="search-input"
                    onFocus={() => search && results.length > 0 && setShowDropdown(true)} // Shows dropdown if results are present when input is focused
                />
                {showDropdown && results.length > 0 && (
                    <div className="search-dropdown">
                        {results.map((item) => (
                            <div
                                key={item.id}
                                className="search-result-item"
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => handleResultClick(item.id, item.type)}
                            >
                                <img src={item.smallPoster} alt={item.name} className="search-thumbnail" />
                                <span>{item.name}</span>
                                <span className="result-type">({item.type})</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <NavBar />
        </div>
    );
};

export default Header;