import React, { useState } from "react";
import "../styles/StarRating.css";
import { feedback } from "../constants/starRatingConstants";

const StarRating = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  return (
    <div className="Parent">
      <div className="StarContainer">
        {[...Array(5)].map((_, index) => {
          const starValue = index + 1;
          return (
            <span
              key={index}
              style={{
                fontSize: "8rem",
                color: starValue <= (rating || hover) ? "yellow" : "white",
                height: "auto",
              }}
              onMouseEnter={() => setHover(starValue)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setRating(starValue)}
            >
              ✰
            </span>
          );
        })}
      </div>
      {rating > 0 && <span>{feedback} </span>}
    </div>
  );
};

export default StarRating;
