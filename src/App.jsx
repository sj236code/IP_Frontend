import { useState, useEffect } from 'react'
import './App.css'
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
    <>
      <div> Test
      </div>
    </>
  )
}

export default App
