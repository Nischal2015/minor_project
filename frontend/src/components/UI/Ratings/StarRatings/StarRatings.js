import React, { useState } from "react";

import Star from "./Star";

const createArray = (length) => [...Array(length)];

const StarRatings = ({ totalStars = 5 }) => {
  const [selectedStars, setSelectedStars] = useState(3);

  return (
    <>
      {createArray(totalStars).map((n, i) => (
        <Star
          key={i}
          selected={selectedStars > i}
          onSelect={() => setSelectedStars(i + 1)}
        />
      ))}
    </>
  );
};

export default StarRatings;
