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
            setSearchResults([]);
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

     return (
        <div className="container mt-4">
        <SearchBar
            placeholder="Enter a Film, Actor, or Genre..."
            onSearch={handleSearch}
            results={currentResults}
        />

        {/* {searchResults.length > 0 && (
            <div className="text-center mt 3">
                <p className ="text-center mt 3">
                    Showing {currentResults.length} results
                </p>
            </div>
        )} */}

        {totalPages > 1 && (
                <nav aria-label="Search results pagination" className="mt-4">
                    <div className="d-flex justify-content-center align-items-center">
                        <button
                            className="btn btn-outline-primary me-3"
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            &laquo; Previous
                        </button>
                        
                        <span className="mx-3">
                            Showing {firstIndex + 1}-{Math.min(lastIndex, searchResults.length)} of {searchResults.length}
                        </span>
                        
                        <button
                            className="btn btn-outline-primary ms-3"
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        >
                            Next &raquo;
                        </button>
                    </div>
                    
                    {/* Page info */}
                    <div className="text-center mt-2">
                        <small className="text-muted">
                            Page {currentPage} of {totalPages}
                        </small>
                    </div>
                </nav>
        )}
        </div>
    );
}


export default FilmsPage;