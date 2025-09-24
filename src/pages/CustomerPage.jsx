import { useEffect, useState } from "react";
import axios from "axios";
import CustomerSearch from "../components/CustomerSearch";
import CustomerForm from "../components/CustomerForm";
import { Pagination } from "react-bootstrap";
import { unstable_setDevServerHooks } from "react-router-dom";

function CustomerPage(){

    const[allData, setAllData] = useState([]);
    const[searchResults, setSearchResults] = useState([]);
    const[currentPage, setCurrentPage] = useState(1);
    const[showModal, setShowModal] = useState(false);
    const resultsPerPage = 10;

    useEffect(() => {
        const fetchAllData = async() =>{
            const response = await axios.get("http://localhost:5000/searchCustomer", {
                params: { query: "" }
            });
            setAllData(response.data);
            setSearchResults(response.data);
            //console.log(response.data[0]);
        }
        fetchAllData();
    }, []);

    const handleSearch = async (query) => {
        if(query.trim() === ""){
            setSearchResults(allData);
            setCurrentPage(1);
            return;
        }
        try{
            const response = await axios.get("http://localhost:5000/searchCustomer", {
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

    const addCustomer = async (newCustomer) => {
        try{
            const response = await axios.post("http://localhost:5000/addCustomer", newCustomer);

            console.log("Response status:", response.status);
            console.log("Response data:", response.data);

            if(response.status === 201){
                const updatedResponse = await axios.get("http://localhost:5000/searchCustomer",{
                    params: { query: "" }
                });
                setAllData(updatedResponse.data);
                setSearchResults(updatedResponse.data);

                setShowModal(false);
                console.log("Customer Added")
            }
        }
        catch (error){
            console.error("Error adding customer:", error);
        }
    }

    const lastIndex = currentPage * resultsPerPage;
    const firstIndex = lastIndex - resultsPerPage;
    const currentResults = searchResults.slice(firstIndex, lastIndex);

    const totalPages = Math.ceil(searchResults.length/resultsPerPage);

    return (
        <div className="container mt-4">

            <button className="btn btn-success mb-3" onClick={() => setShowModal(true)}>
                Add Customer
            </button>

            <CustomerSearch
                placeholder="Enter a Customer Name..."
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
                    
                    <div className="text-center mt-2">
                        <small className="text-muted">
                            Page {currentPage} of {totalPages}
                        </small>
                    </div>
                </nav>
        )}

        <CustomerForm show={showModal} onClose={()=>setShowModal(false)} onSubmit={addCustomer} />

        </div>
    );

}

export default CustomerPage;