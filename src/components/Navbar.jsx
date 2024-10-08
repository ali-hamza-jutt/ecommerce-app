import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserData, logout } from '../redux/userSlice';
import '../styles/Navbar.css';

function Navbar({ onSubmit, onCategoryChange = () => {} }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userData = useSelector(selectUserData);
    const [input, setInput] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

    useEffect(() => {
        console.log("Authentication status changed:", userData.isAuthenticated);
    }, [userData]);

    const handleCategoryClick = (categoryId) => {
        navigate(`/productsList/${categoryId}`);
    };

    const onSearchSubmit = (e) => {
        e.preventDefault();
        onSubmit(input);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleProfileMenu = () => {
        setIsProfileMenuOpen(!isProfileMenuOpen);
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    const redirectToLogin = () => {
        navigate('/login');
    };

    const handleCartClick = () => {
        if (userData.isAuthenticated) {
            navigate('/cart');
        } else {
            redirectToLogin();
        }
    };

    const handleOrdersClick = () => {
        if (userData.isAuthenticated) {
            navigate('/orders');
        } else {
            redirectToLogin();
        }
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMenuOpen(false);
                setIsProfileMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (isMenuOpen) {
            // Prevent horizontal scrolling when menu is open
            document.body.style.overflowX = 'hidden';
        } else {
            document.body.style.overflowX = 'auto';
        }
    }, [isMenuOpen]);

    return (
        <>
            <div className={`wrapper ${isMenuOpen ? 'menu-open' : ''}`}>
                <div className="logoWrapper">
                    <a href="/" className="logoText">
                        <h1>.Asos</h1>
                    </a>
                </div>
                <div className="menuIcon" onClick={toggleMenu}>
                    <MenuRoundedIcon />
                </div>
                <div className="desktopMenu">
                    <div className="searchWrapper">
                        <div className="searchBarWrapper">
                            <form onSubmit={onSearchSubmit}>
                                <input
                                    className="searchInput"
                                    type="text"
                                    placeholder="Search"
                                    onChange={(e) => setInput(e.target.value)}
                                    value={input}
                                />
                                <button className="iconButton" type="submit">
                                    <SearchIcon />
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="menuWrapper">
                        {userData.isAuthenticated ? (
                            <div className="logoutButton">
                                <button onClick={handleLogout}>Logout</button>
                            </div>
                        ) : (
                            <div className="loginWrapper">
                                <Link to="/login">
                                    <button>Login</button>
                                </Link>
                            </div>
                        )}
                        <div className="menuOption" onClick={handleOrdersClick}>
                            Orders
                        </div>
                        <div className="menuOption" onClick={handleCartClick}>
                            <ShoppingCartOutlinedIcon sx={{ fontSize: 36 }} />
                        </div>
                    </div>
                </div>
                <div className={`dropdownMenu ${isMenuOpen ? 'open' : ''}`}>
                    <div className="menuIcon" onClick={toggleMenu}>
                        <MenuRoundedIcon />
                    </div>
                    <div className="menuWrapper">
                        {userData.isAuthenticated ? (
                            <div className="logoutButton">
                                <button onClick={handleLogout}>Logout</button>
                            </div>
                        ) : (
                            <div className="loginWrapper">
                                <Link to="/login">
                                    <button>Login</button>
                                </Link>
                            </div>
                        )}
                        <div className="menuOption" onClick={handleOrdersClick}>
                            Orders
                        </div>
                        <div className="menuOption" onClick={handleCartClick}>
                            <ShoppingCartOutlinedIcon sx={{ fontSize: 36 }} />
                        </div>
                        <h2 className="categoryHeading" styles>Categories</h2>
                        <div className="categoryBar open">
                            <div className="categoryOption" onClick={() => handleCategoryClick(4210)}>
                                Accessories
                            </div>
                            <div className="categoryOption" onClick={() => handleCategoryClick(4209)}>
                                Sneakers
                            </div>
                            <div className="categoryOption" onClick={() => handleCategoryClick(18423)}>
                                Work Wear
                            </div>
                            <div className="categoryOption" onClick={() => handleCategoryClick(13233)}>
                                Swim Wear
                            </div>
                            <div className="categoryOption" onClick={() => handleCategoryClick(28727)}>
                                Track Suit
                            </div>
                            <div className="categoryOption" onClick={() => handleCategoryClick(28365)}>
                                Women
                            </div>
                            <div className="categoryOption" onClick={() => handleCategoryClick(51084)}>
                                Women Daska
                            </div>
                            <div className="categoryOption" onClick={() => handleCategoryClick(25001)}>
                                Women Hair
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="categoryBar-pc">
                <div className="categoryOption-pc" onClick={() => handleCategoryClick(4210)}>Accessories</div>
                <div className="categoryOption-pc" onClick={() => handleCategoryClick(4209)}>Sneakers</div>
                <div className="categoryOption-pc" onClick={() => handleCategoryClick(18423)}>Work Wear</div>
                <div className="categoryOption-pc" onClick={() => handleCategoryClick(13233)}>Swim Wear</div>
                <div className="categoryOption-pc" onClick={() => handleCategoryClick(28727)}>Track Suit</div>
                <div className="categoryOption-pc" onClick={() => handleCategoryClick(28365)}>Women</div>
                <div className="categoryOption-pc" onClick={() => handleCategoryClick(51084)}>Women Daska</div>
                <div className="categoryOption-pc" onClick={() => handleCategoryClick(25001)}>Women Hair</div>
            </div>
        </>
    );
}

export default Navbar;
