import React from 'react';
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
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Movies</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </nav>
        </header>
    );

}

export default Header