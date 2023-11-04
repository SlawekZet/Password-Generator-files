/* eslint-disable react/prop-types */

import "./Slider.css";

export const Slider = ({
  sliderStyle,
  handleCharLengthChangeUpdate,
  passwordSettings,
}) => {
  return (
    <input
      type="range"
      min="0"
      max="20"
      style={sliderStyle}
      className="char-range"
      value={passwordSettings.length}
      onChange={handleCharLengthChangeUpdate}
    />
  );
};
