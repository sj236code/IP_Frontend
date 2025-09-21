import { useEffect, useState } from "react";
import axios from "axios";
import FilmCard from "../components/FilmCard";

function LandingPage(){

    const[topFilms, setTopFilms] = useState([]); // Top 5 Rented Films
    const[userSelectedFilm, setUserSelectedFilm] = useState(null); // Track User Selected Film

    const[topActors, setTopActors] = useState([]); // Top 5 Rented Films
    const[userSelectedActor, setUserSelectedActor] = useState(null); // Track User Selected Film

    // Fetch Top 5 Films
    useEffect(()=> {
        const fetchTopFilms = async() => {
            const response = await axios.get("http://localhost:5000/topFilms");
            setTopFilms(response.data);
        };
        fetchTopFilms()
    },[])

    //Fetch Top 5 Actors
    useEffect(()=> {
        const fetchTopActors = async() => {
            const response = await axios.get("http://localhost:5000/topActors");
            setTopActors(response.data);
        };
        fetchTopActors()
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
            <h1>Top 5 Actors:</h1>
            {topActors.map((actor,index) => (
                <div key={actor.actor_id}>
                    <h2>{actor.first_name} {actor.last_name}</h2>
                    <p>Films in store: {actor.film_count}</p>
                    <h3>Top 5 Rented Films: </h3>
                        <ul>
                            {actor.top_films.map((film) => (
                                <li key={film.film_id}>
                                    {film.title} - rented {film.rental_count} times
                                </li>
                            ))}
                        </ul>
                </div>
            ))}
        </div>
    );

}

export default LandingPage