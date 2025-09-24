import React, { useState } from "react";

function SearchBar({placeholder, onSearch, results}){

    // const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");

    const handleChange = (event) =>{
        const searchWord = event.target.value;
        setWordEntered(searchWord);
        onSearch(searchWord);
    }

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <input
                        type="text"
                        className="form-control"
                        placeholder={placeholder}
                        value={wordEntered}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="row justify-content-center mt-4">
                <div className="col-md-8">
                    {results.length > 0 ? (
                        <ul className="list-group">
                            {results.map((item, index) => (
                                <li
                                    key={index}
                                    className="list-group-item d-flex align-items-center"
                                    onClick={() => alert(`${item.type}: ${item.value}`)}
                                    style={{ cursor: "pointer" }}
                                >
                                    <div className="flex-grow-1">
                                        <strong>{item.value}</strong>
                                    </div>
                                    <div className="border-start ps-3 ms-3">
                                        <span className={`badge text-white ${
                                            item.type === 'film' ? 'bg-primary' : 
                                            item.type === 'actor' ? 'bg-success' : 
                                            item.type === 'category' ? 'bg-warning' : 'bg-secondary'
                                        }`}>
                                            {item.type}
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="text-center text-muted">
                            <p>No results found</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

}

export default SearchBar;