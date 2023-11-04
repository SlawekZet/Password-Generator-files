/* eslint-disable react/prop-types */

import "./CheckboxesCard.css";

export const CheckboxCard = ({ handleCheckUpdate }) => {
  const checkboxData = [
    ["Include Uppercase Letters", "uppercase"],
    ["Include Lowercase Letters", "lowercase"],
    ["Include Numbers", "numbers"],
    ["Include Symbols", "symbols"],
  ];
  return (
    <>
      <div className="checkboxes">
        {checkboxData.map((e, index) => {
          return (
            <>
              <div key={e[0] + index} className="checkbox-wrapper">
                <input
                  key={e.name + index}
                  className="checkbox-input"
                  type="checkbox"
                  name={e[1]}
                  id={e[1]}
                  onChange={(e) => handleCheckUpdate(e.target.name)}
                />
                <label
                  key={e[0] + index}
                  htmlFor={e[1]}
                  className="primary label"
                >
                  {e[0]}
                </label>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};
