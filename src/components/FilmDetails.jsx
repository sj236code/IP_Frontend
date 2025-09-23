import { useState } from "react";
import axios from "axios";

function FilmDetails({ title }){

    const [showModal, setShowModal] = useState(false);
    const [details, setDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchDetails = async () => {
        setIsLoading(true);
        setError(null);
        
        try {
            const response = await axios.get("http://localhost:5000/filmDetails", {
                params: { title },
            });
            
            if (response.data && response.data.length > 0) {
                setDetails(response.data[0]);
            } else {
                setDetails({ description: "No details found for this film." });
            }
        } catch (err) {
            console.error("Error fetching film details:", err);
            setError("Failed to load film details. Please try again.");
            setDetails(null);
        } finally {
            setIsLoading(false);
        }
    };

    const openModal = () => {
        setShowModal(true);
        setDetails(null);
        setError(null);
        fetchDetails();
    };

    const closeModal = () => {
        setShowModal(false);
        setDetails(null);
        setError(null);
    };

    return (
        <>
            <div onClick={openModal} style={{ cursor: "pointer", padding: "10px", margin: "5px", border: "1px solid #ccc", borderRadius: "5px" }}>
                <span>{title}</span>
            </div>

            {showModal && (
                <div
                    className="modal fade show d-block"
                    tabIndex="-1"
                    role="dialog"
                    style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                    onClick={(e) => {
                        if (e.target === e.currentTarget) closeModal();
                    }}
                >
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{title}</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    aria-label="Close"
                                    onClick={closeModal}
                                ></button>
                            </div>
                            <div className="modal-body">
                                {isLoading ? (
                                    <div className="text-center">
                                        <div className="spinner-border" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                        <p>Loading film details...</p>
                                    </div>
                                ) : error ? (
                                    <div className="alert alert-danger" role="alert">
                                        {error}
                                    </div>
                                ) : details ? (
                                    <div>
                                        {details.description && (<p><strong>Description:</strong> {details.description}</p>)}
                                        {details.release_year && (<p><strong>Release Year:</strong> {details.release_year}</p>)}
                                        {details.length && (<p><strong>Length:</strong> {details.length} minutes</p>)}
                                        {details.rating && (<p><strong>Rating:</strong> {details.rating}</p>)}
                                        {details.category && (<p><strong>Category:</strong> {details.category}</p>)}
                                        {details.rental_rate && (<p><strong>Rental Rate:</strong> ${details.rental_rate}</p>)}
                                        {details.actors && (<p><strong>Actors:</strong> {details.actors}</p>)}
                                        {details.special_features && details.special_features.length > 0 && (
                                            <p><strong>Special Features:</strong> {Array.isArray(details.special_features) ? details.special_features.join(', ') : details.special_features}</p>
                                        )}
                                        {details.copies_avail && (<p><strong>Copies Available:</strong> {details.copies_avail}</p>)}
                                    </div>
                                ) : (<p>No details available for this film.</p>)}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default FilmDetails;