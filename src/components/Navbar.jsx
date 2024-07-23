import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/material/Avatar';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import '../styles/Navbar.css';

function Navbar({ onSubmit, onCategoryChange = () => {} }) {  
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:5000/logout', {}, { withCredentials: true });
      if (response.status === 200) {
        localStorage.removeItem('isAuthenticated');
        setIsAuthenticated(false);
        navigate('/');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleCategoryClick = (categoryId) => {
    navigate(`/productsList/${categoryId}`); // Navigate to category route
};


  const onSearchSubmit = (e) => {
    e.preventDefault();
    onSubmit(input);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <div className="wrapper">
        <div className="logoWrapper">
          <a href="/" className="logoText">
            <h1>YumYam</h1>
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
                  placeholder="Search 2M+ recipes"
                  onChange={(e) => setInput(e.target.value)}
                  value={input}
                />
                <button className="iconButton" type="submit">
                  <SearchIcon />
                </button>
              </form>
            </div>
          </div>
          <div className="profileWrapper">
            {isAuthenticated ? (
              <div className="logoutWrapper">
                <button onClick={handleLogout}>Logout</button>
              </div>
            ) : (
              <div className="loginWrapper">
                <a href="/">
                  <div className="profileIcon">
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{ width: 32, height: 32 }} />
                  </div>
                  <div className="profileName">
                    <p>Junaid</p>
                  </div>
                </a>
              </div>
            )}
          </div>
          <div className="menuWrapper">
            <div className="menuOption">
              <Link to="/orders">orders</Link>
            </div>
            <div className="menuOption">
              <Link to="/cart"><ShoppingCartOutlinedIcon/></Link>
            </div>
          </div>
        </div>
        <div className={`dropdownMenu ${isMenuOpen ? 'open' : ''}`}>
          <div className="menuIcon" onClick={toggleMenu}>
            <MenuRoundedIcon />
          </div>
          <div className="searchWrapper">
            <div className="searchBarWrapper">
              <form onSubmit={onSearchSubmit}>
                <input
                  className="searchInput"
                  type="text"
                  placeholder="Search 2M+ recipes"
                  onChange={(e) => setInput(e.target.value)}
                  value={input}
                />
                <button className="iconButton" type="submit">
                  <SearchIcon />
                </button>
              </form>
            </div>
          </div>
          <div className="profileWrapper">
            {isAuthenticated ? (
              <div className="logoutWrapper">
                <button onClick={handleLogout}>Logout</button>
              </div>
            ) : (
              <div className="loginWrapper">
                <a href="/">
                  <div className="profileIcon">
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{ width: 32, height: 32 }} />
                  </div>
                  <div className="profileName">
                    <p>Junaid</p>
                  </div>
                </a>
              </div>
            )}
          </div>
          <div className="menuWrapper">
            <div className="menuOption">
              <Link to="/orders">orders</Link>
            </div>
            <div className="menuOption">
              <Link to="/cart"><ShoppingCartOutlinedIcon/></Link>
            </div>
          </div>
        </div>
      </div>
      <div className="categoryBar">
        <div className="categoryOption" onClick={() => handleCategoryClick(4209)}>Sneakers</div>
        <div className="categoryOption" onClick={() => handleCategoryClick(6456)}>Women Sneakers</div>
        <div className="categoryOption" onClick={() => handleCategoryClick(4210)}>Accessories</div>
        <div className="categoryOption" onClick={() => handleCategoryClick(9718)}>Men</div>
        <div className="categoryOption" onClick={() => handleCategoryClick(51501)}>Women</div>
        <div className="categoryOption" onClick={() => handleCategoryClick(28365)}>Women</div>
        <div className="categoryOption" onClick={() => handleCategoryClick(2611)}>Women Converse</div>
        <div className="categoryOption" onClick={() => handleCategoryClick(29928)}>Women Cotton</div>
        <div className="categoryOption" onClick={() => handleCategoryClick(29783)}>Women Crocs</div>
        <div className="categoryOption" onClick={() => handleCategoryClick(51084)}>Women Daska</div>
        <div className="categoryOption" onClick={() => handleCategoryClick(25001)}>Women Hair Accessories</div>
        <div className="categoryOption" onClick={() => handleCategoryClick(26364)}>Women Dickies</div>
        <div className="categoryOption" onClick={() => handleCategoryClick(25001)}>Women</div>
        <div className="categoryOption" onClick={() => handleCategoryClick(18423)}>Work Wear</div>
        <div className="categoryOption" onClick={() => handleCategoryClick(13233)}>Swim Wear</div>
        <div className="categoryOption" onClick={() => handleCategoryClick(28727)}>Track Suit</div>
      </div>
    </>
  );
}

export default Navbar;
