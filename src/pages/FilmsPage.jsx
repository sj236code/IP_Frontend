import { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import { Pagination } from "react-bootstrap";

function FilmsPage(){

    const[searchResults, setSearchResults] = useState([]);
    const[currentPage, setCurrentPage] = useState(1);
    const resultsPerPage = 10;

    const handleSearch = async (query) => {
        if(query.trim() === ""){
            setResults([]);
            setCurrentPage(1);
            return;
        }
        try{
            const response = await axios.get("http://localhost:5000/searchFilm", {
                params:{query},
            });
            setSearchResults(response.data);
            setCurrentPage(1);
            //console.log("Search results: ", response.data);
        }
        catch(error){
            console.error("Error fetching search results: ", error);
        }
    };

    const lastIndex = currentPage * resultsPerPage;
    const firstIndex = lastIndex - resultsPerPage;
    const currentResults = searchResults.slice(firstIndex, lastIndex);

    const totalPages = Math.ceil(searchResults.length/resultsPerPage);

    const pageNumbers = []
    for(let i=1;i<=totalPages;i++){
        pageNumbers.push(i);
    }

     return (
        <div className="container mt-4">
        <SearchBar
            placeholder="Enter a Film, Actor, or Genre..."
            onSearch={handleSearch}
            results={currentResults}
        />

        {totalPages > 1 && (
            <nav aria-label="Search results pagination" className="mt-3">
            <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <button
                    className="page-link"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                >
                    Previous
                </button>
                </li>

                {pageNumbers.map((number) =>
                number === currentPage ? (
                    <li key={number} className="page-item active" aria-current="page">
                    <span className="page-link">{number}</span>
                    </li>
                ) : (
                    <li key={number} className="page-item">
                    <button
                        className="page-link"
                        onClick={() => setCurrentPage(number)}
                    >
                        {number}
                    </button>
                    </li>
                )
                )}

                <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                <button
                    className="page-link"
                    onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                >
                    Next
                </button>
                </li>
            </ul>
            </nav>
        )}
        </div>
    );
}


export default FilmsPage;