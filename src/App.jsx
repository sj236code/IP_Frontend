import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import LandingPage from './pages/LandingPage.jsx'
import axios from "axios"

function App() {

  const fetchTopFilms = async() => {
    const response = await axios.get("http://localhost:5000/topFilms");
    console.log(response.data);
  }

  useEffect(()=> {
    fetchTopFilms()
  },[])

  return (
    <div className="app-general">
      <Header/> <hr></hr>
      <div>
        <br></br>
        <LandingPage />
        <br></br>
        Hello World
        <br></br>
      </div>
      <Footer/>
    </div>
  )
}

export default App
