/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./PasswordStrengthBar.css";

export const PasswordStrengthBar = ({ passwordSettings }) => {
  const [passwordStrength, setPasswordStrength] = useState(0);

  const tooWeak = ["too weak!", "red", "black", "black", "black"];
  const weak = ["weak", "orange", "orange", "black", "black"];
  const medium = ["medium", "yellow", "yellow", "yellow", "black"];
  const strong = ["strong", "green", "green", "green", "green"];

  const passwordStrengthCalc = (passwordSettings) => {
    // Calcuclate strength based on password length and password settings. Each setting (array of characters) has a value of 5 points. Password value may have from 0 to 20 points.
    // The strength of the password is calculated as follows:
    // < 25 pts = too weak
    // 26-30 pts = weak
    // 31-35 pts = medium
    // 36 pts + = strong

    let strength = passwordSettings.length;

    if (passwordSettings.uppercase) {
      strength += 5;
    }

    if (passwordSettings.lowercase) {
      strength += 5;
    }

    if (passwordSettings.numbers) {
      strength += 5;
    }

    if (passwordSettings.symbols) {
      strength += 5;
    }

    return strength;
  };

  useEffect(() => {
    const strength = passwordStrengthCalc(passwordSettings);
    setPasswordStrength(strength);
  }, [passwordSettings]);

  const handleStrengthBarRender = (array) => {
    return (
      <>
        <div className="strength-level">
          <p className="strength-level-text">{array[0]}</p>
          <div className="strength-level-tiles">
            {array.slice(1).map((e, index) => (
              <div key={index} className={e}></div>
            ))}
          </div>
        </div>
      </>
    );
  };

  const handleStrengthBarChange = (passwordStrength) => {
    if (passwordStrength <= 24) {
      return handleStrengthBarRender(tooWeak);
    } else if (passwordStrength >= 25 && passwordStrength <= 29) {
      return handleStrengthBarRender(weak);
    } else if (passwordStrength >= 30 && passwordStrength <= 34) {
      return handleStrengthBarRender(medium);
    } else {
      return handleStrengthBarRender(strong);
    }
  };

  return (
    <>
      <div className="strength-bar-wrapper">
        <p className="strength-text">STRENGTH</p>
        {handleStrengthBarChange(passwordStrength)}
      </div>
    </>
  );
};
