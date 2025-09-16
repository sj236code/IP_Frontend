import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import axios from "axios"

function App() {

  const fetchAPI = async() => {
    const response = await axios.get("http://localhost:5000/testdb");
    console.log(response.data.users);
  }

  useEffect(()=> {
    fetchAPI()
  },[])

  return (
    <div className="app-general">
      <Header/> 
      <div>
        Hello World
      </div>
      <Footer/>
    </div>
  )
}

export default App
