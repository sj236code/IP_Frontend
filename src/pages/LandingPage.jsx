import { useEffect, useState } from "react";
import axios from "axios";
import FilmCard from "../components/FilmCard";

function LandingPage(){

    const[topFilms, setTopFilms] = useState([]); // Top 5 Rented Films
    const[userSelectedFilm, setUserSelectedFilm] = useState(null); // Track User Selected Film

    // Connect to Flask server
    useEffect(()=> {
        const fetchTopFilms = async() => {
            const response = await axios.get("http://localhost:5000/topFilms");
            setTopFilms(response.data);
        };
        fetchTopFilms()
    },[])

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
            <h1>Top 5 Rented Films:</h1>
            {topFilms.map((film, index) => (
                <FilmCard
                key={film.film_id}
                rank={index + 1}
                title={film.title}
                category={film.category}
                rented={film.rented}
                />
            ))}
        </div>
    );

}

export default LandingPage