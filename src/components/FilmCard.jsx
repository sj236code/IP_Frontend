import { useEffect, useState } from "react";
import axios from "axios";
import "./FilmCard.css";

function FilmCard({ rank, title, category, rented, }){

    const [fullCard, setFullCard] = useState(false);

    return (

        <div className="film-card-outer-box" onClick={() => setFullCard(!fullCard)}>

            <div className={'film-card-inner-box ${expanded ? "expanded" : ""}'}>

                <div className="film-card-header">
                    <span className="film-rank"># {rank}</span>
                    <span className="film-title">{title}</span>
                </div>

                {fullCard && (

                    <div className="film-card-details">
                        <p><strong>Category: </strong>{category}</p>
                        <p><strong>Times Rented: </strong>{rented}</p>
                    </div>

                )}

            </div>

        </div>
    );

}

export default FilmCard;