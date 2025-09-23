import { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";

function FilmsPage(){

    const[searchResults, setSearchResults] = useState([]);

    const handleSearch = async (query) => {
        if(query.trim() === ""){
            setResults([]);
            return;
        }
        try{
            const response = await axios.get("http://localhost:5000/searchFilm", {
                params:{query},
            });
            setSearchResults(response.data);
            console.log("Search results: ", response.data);
        }
        catch(error){
            console.error("Error fetching search results: ", error);
        }
    };

    return (
        <div>
            <SearchBar placeholder="Enter a Film, Actor, or Genre..."
            onSearch={handleSearch}
            results={searchResults}/>
        </div>
    )

}

export default FilmsPage;