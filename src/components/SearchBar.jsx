import React, { useState } from "react";

function SearchBar({placeholder, data}){

    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");

    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
        const newFilter = data.filter((value) => {
            return value.title?.toLowerCase().includes(searchWord.toLowerCase());
        });
        //console.log(searchWord);
        if(searchWord == ""){
            setFilteredData([]);
        }
        else{
            setFilteredData(newFilter);
        }
    };

    return (
        <div className="row d-flex justify-content-center ">
            <div className="col-md-6">
                <div className="form">
                    <i className="fa fa-search"></i>
                    <input 
                        type="text"
                        placeholder={placeholder}
                        className="form-control form-input"
                        value={wordEntered}
                        onChange={handleFilter}
                    />
                    <span className="left-pan"><i className="fa fa-microphone"></i></span>
                </div>

                {filteredData.length != 0 && (
                    <div className="dataResult">
                        {filteredData.slice(0,15).map((value,index) => {
                            return(
                                <div className="list border-bottom" key={index}>
                                    <span>{value.title}</span>
                                </div>
                            );
                        })}
                    </div>
                )}

            </div>
        </div>
    );

}

export default SearchBar;