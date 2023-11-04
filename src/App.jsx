import { useEffect, useState } from "react";
import "./App.css";
import { PasswordStrengthBar } from "./assets/components/PasswordStrengthBar/PasswordStrengthBar";
import { CheckboxCard } from "./assets/components/CheckboxesCard/CheckboxesCard";
import { Slider } from "./assets/components/Slider/Slider";

function App() {
  const [passwordSettings, setPasswordSettings] = useState({
    length: 0,
    uppercase: false,
    lowercase: false,
    numbers: false,
    symbols: false,
  });
  const [isPasswordCopied, setIsPasswordCopied] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [errors, setErrors] = useState({
    length: false,
    settings: false,
  });

  // these are for slider CSS - the progress bar. Max of the progress must equal 100, so the multiplyer is 100/max password length.
  const progress = passwordSettings.length * 5;
  const sliderStyle = {
    background: `linear-gradient(to right, #a4ffaf ${progress}%, #18171f ${progress}%)`,
  };

  const handleGeneratePassword = (passwordSettings) => {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()-_+=[]{}|;:,.<>?/</>";
    let choosenPasswordSettings = "";
    let password = "";

    if (passwordSettings.length === 0) {
      if (
        !passwordSettings.uppercase &&
        !passwordSettings.lowercase &&
        !passwordSettings.numbers &&
        !passwordSettings.symbols
      ) {
        return setErrors({
          length: true,
          settings: true,
        });
      }

      setErrors({
        ...errors,
        length: true,
      });
    }

    if (passwordSettings.uppercase) {
      choosenPasswordSettings += uppercase;
    }

    if (passwordSettings.lowercase) {
      choosenPasswordSettings += lowercase;
    }

    if (passwordSettings.numbers) {
      choosenPasswordSettings += numbers;
    }

    if (passwordSettings.symbols) {
      choosenPasswordSettings += symbols;
    }

    for (let i = 1; i <= passwordSettings.length; i++) {
      const number = Math.floor(Math.random() * choosenPasswordSettings.length);
      const element = choosenPasswordSettings.charAt(number);
      password += element;
    }
    setGeneratedPassword(password);
    setIsPasswordCopied(false);
  };

  const handleCopyPassword = async () => {
    if (passwordSettings.length === 0) {
      return alert("Generate the password first!");
    }
    try {
      await navigator.clipboard.writeText(generatedPassword);
      const text = await navigator.clipboard.readText();

      if (text === generatedPassword) {
        setIsPasswordCopied(true);
      } else {
        alert("Password was not copied!");
      }
    } catch (error) {
      console.error("Error while copying the password:", error);
    }
  };

  const handleCheckUpdate = (updatedCheckbox) => {
    setPasswordSettings({
      ...passwordSettings,
      [updatedCheckbox]: !passwordSettings[updatedCheckbox],
    });
  };

  const handleCharLengthChangeUpdate = (updatedValue) => {
    const newLength = parseInt(updatedValue.target.value);
    setPasswordSettings({ ...passwordSettings, length: newLength });
  };

  useEffect(() => {
    setGeneratedPassword("");
  }, [passwordSettings]);

  useEffect(() => {
    setErrors({ ...errors, length: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passwordSettings.length]);

  useEffect(() => {
    setErrors({ ...errors, settings: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    passwordSettings.uppercase,
    passwordSettings.lowercase,
    passwordSettings.numbers,
    passwordSettings.symbols,
  ]);

  console.log(errors);
  console.log(passwordSettings);

  return (
    <>
      <main>
        <h2 className="heading">Password Generator</h2>
        <div className="password-output">
          {!generatedPassword ? (
            <h1 className="password" style={{ opacity: 0.25 }}>
              P4$5W0rD!
            </h1>
          ) : (
            <h1 className="password">{generatedPassword}</h1>
          )}

          <button className="copy-button" onClick={handleCopyPassword}>
            {isPasswordCopied ? <p className="copied-message">copied</p> : null}
            <svg
              className="copy-icon"
              width="21"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="copy-icon-path"
                d="M20.341 3.091 17.909.659A2.25 2.25 0 0 0 16.319 0H8.25A2.25 2.25 0 0 0 6 2.25V4.5H2.25A2.25 2.25 0 0 0 0 6.75v15A2.25 2.25 0 0 0 2.25 24h10.5A2.25 2.25 0 0 0 15 21.75V19.5h3.75A2.25 2.25 0 0 0 21 17.25V4.682a2.25 2.25 0 0 0-.659-1.591ZM12.469 21.75H2.53a.281.281 0 0 1-.281-.281V7.03a.281.281 0 0 1 .281-.281H6v10.5a2.25 2.25 0 0 0 2.25 2.25h4.5v1.969a.282.282 0 0 1-.281.281Zm6-4.5H8.53a.281.281 0 0 1-.281-.281V2.53a.281.281 0 0 1 .281-.281H13.5v4.125c0 .621.504 1.125 1.125 1.125h4.125v9.469a.282.282 0 0 1-.281.281Zm.281-12h-3v-3h.451c.075 0 .147.03.2.082L18.667 4.6a.283.283 0 0 1 .082.199v.451Z"
                fill="#A4FFAF"
              />
            </svg>
          </button>
        </div>
        {errors.length && errors.settings ? (
          <p className="primary error">
            Choose the password length and settings!
          </p>
        ) : errors.length ? (
          <p className="primary error">Choose the password length</p>
        ) : errors.settings ? (
          <p className="primary error">Choose the password settings!</p>
        ) : null}

        <div className="password-generator-wrapper">
          <div className="char-length">
            <p className="primary">Character length</p>
            <p className="char-length-output">{passwordSettings.length}</p>
          </div>
          <form action="submit" className="pass-generator">
            <Slider
              sliderStyle={sliderStyle}
              handleCharLengthChangeUpdate={handleCharLengthChangeUpdate}
              passwordSettings={passwordSettings}
            />

            <CheckboxCard handleCheckUpdate={handleCheckUpdate} />
          </form>

          <PasswordStrengthBar passwordSettings={passwordSettings} />
          <button
            className="generate-button"
            onClick={() => handleGeneratePassword(passwordSettings)}
          >
            <p>Generate</p>
            <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
              <path
                className="path-icon-arrow"
                fill="#24232C"
                d="m5.106 12 6-6-6-6-1.265 1.265 3.841 3.84H.001v1.79h7.681l-3.841 3.84z"
              />
            </svg>
          </button>
        </div>
      </main>
    </>
  );
}

export default App;
