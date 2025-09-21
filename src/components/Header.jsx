import React from 'react';
import { Link } from "react-router-dom";
import '../App.css';
import filmCamera from '../assets/film_camera.png';

function Header(){

    return (
        <header className='header'>
            <div className="logo">
                <img src={filmCamera} className="logo-img" />
                <h1>Movipedia</h1>
            </div>
            <nav>
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/films">Movies</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
            </nav>
        </header>
    );

}

export default Header