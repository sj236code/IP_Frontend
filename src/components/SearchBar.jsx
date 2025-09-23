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
            <div className="col-md-6">
            <input
                type="text"
                className="form-control"
                placeholder={placeholder}
                value={wordEntered}
                onChange={handleChange}
            />

            {results.length > 0 && (
                <ul className="list-group mt-2">
                {results.map((item, index) => (
                <li
                    key={index}
                    className="list-group-item list-group-item-action"
                    onClick={() => alert(`${item.type}: ${item.value}`)}
                    style={{ cursor: "pointer" }}
                >
                    <strong>{item.value}</strong>{" "}
                    <em className="text-muted">({item.type})</em>
                </li>
                ))}
                </ul>
            )}
            </div>
        </div>
        </div>
    );

}

export default SearchBar;