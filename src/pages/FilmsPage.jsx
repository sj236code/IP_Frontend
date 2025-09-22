import { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";

function FilmsPage(){

    const[searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const fetchSearchResults = async() => {
            const response = await axios.get("http://localhost:5000/searchFilm");
            setSearchResults(response.data);
        }
        fetchSearchResults()
    },[])

    return (
        <div>
            <SearchBar placeholder="Enter a Name..." data={searchResults}/>
        </div>
    )

}

export default FilmsPage;