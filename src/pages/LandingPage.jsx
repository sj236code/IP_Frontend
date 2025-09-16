import { useEffect, useState } from "react";
import axios from "axios";

function LandingPage(){

    const[topFilms, setTopFilms] = useState([]);

    useEffect(()=> {
        const fetchTopFilms = async() => {
            const response = await axios.get("http://localhost:5000/topFilms");
            setTopFilms(response.data);
        };
        fetchTopFilms()
    },[])


    return(
        <div>
            <h1>Top 5 Rented Films:</h1><br></br>
            <ul>
                {topFilms.map((film) => (
                    <li key={film.film_id}>
                        {film.title}
                    </li>
                ))}
            </ul>
        </div>
        
    );

}

export default LandingPage