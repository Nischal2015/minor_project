import React, { useState } from "react";

import styles from "./Slider.module.scss";

const Slider = ({ text }) => {
  const [sliderValue, setSliderValue] = useState(0);

  const sliderChangeHandler = (event) => {
    console.log("chnage called");
    setSliderValue(event.target.value);
  };

  return (
    <div className={styles.sliderContainer}>
      <p>
        {text}:<span> {sliderValue}</span>
      </p>
      <input
        type='range'
        min='0'
        max='100'
        value={sliderValue}
        className={styles.slider}
        onChange={sliderChangeHandler}
      />
    </div>
  );
};

export default Slider;
