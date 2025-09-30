import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import LandingPage from './pages/LandingPage.jsx'
import FilmsPage from './pages/FilmsPage.jsx'
import CustomerPage from './pages/CustomerPage.jsx'
import axios from "axios"

function App() {

  return (
    <Router>
      <div className="bg-dark text-light min-vh-100 py-5">
        <div className="app-general">
          <Header/> <hr />
          <div>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/films" element={<FilmsPage />} />
              <Route path="/customer" element={<CustomerPage />} />
            </Routes>
          </div>
          <Footer/>
        </div>
      </div>
      
    </Router>
  )
}

export default App
