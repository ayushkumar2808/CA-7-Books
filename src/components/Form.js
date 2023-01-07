import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./components.css";
import Main from "./Main";
function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [error, setError] = useState("");
  const [errorColor, setErrorColor] = useState("red");
  const [passStrength, setPassStrength] = useState("");
  const [passColor, setPassColor] = useState("red");

  const navigate = useNavigate(); 
  const handleSubmit = (event) => {
    event.preventDefault();

    if (name.length < 3 || name.length > 30) {
      setError("Name must be between 3 and 30 characters");
      return;
    }

    if (!email.includes("@")) {
      setError("Email must be a valid email address");
      return;
    }

    if (password.length < 10 || !/[^A-Za-z0-9]/.test(password)) {
      setError(
        "Password must be at least 10 characters long and contain at least one special character"
      );

      return;
    }

    if (password !== passwordRepeat) {
      setError("Password repeat must match password");
      return;
    }

    if (
      (name.length < 3 || name.length < 30) &&
      email.includes("@") &&
      (password.length > 10 || /[^A-Za-z0-9]/.test(password)) &&
      password === passwordRepeat
    ) {
      setError("Succesfully Registered");
      setErrorColor("green");
      sessionStorage.removeItem("name");
      sessionStorage.setItem(
        "name",
        name.charAt(0).toUpperCase() + name.slice(1)
      );
      sessionStorage.setItem('Email',email)

      setTimeout(() => {
        navigate("/");
        window.location.reload();
        return <Main name={name} />;
      }, 500);
    }
  };
  useEffect(() => {
    if (password.length < 10 && password.length > 1) {
      setPassStrength("Invalid");
      setPassColor("red");
    } else if (
      password.length > 10 &&
      password.length <= 15 &&
      /[^A-Za-z0-9]/.test(password)
    ) {
      setPassStrength("Medium");
      setPassColor("yellow");
    } else if (password.length >= 16) {
      setPassStrength("Strong");
      setPassColor("green");
    }
  }, [password]);

  // useEffect(()=>{
  //   if(window.location.reload()){
  //     sessionStorage.clear()
  //   }
  // },[])

  return (
    <form onSubmit={handleSubmit} id="main-form-div">
      <h1>Register</h1>
      <label>
        <input
          type="text"
          className="form-input"
          placeholder="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </label>
      <br />
      <label>
        <input
          type="text"
          className="form-input"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>

      <br />
      <label>
        <input
          type="password"
          className="form-input"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>

      <h4 style={{ color: passColor, marginTop: "0", marginBottom: "2vh" }}>
        {passStrength}
      </h4>
      <label>
        <input
          type="password"
          className="form-input"
          placeholder="Confirm password"
          value={passwordRepeat}
          onChange={(event) => setPasswordRepeat(event.target.value)}
        />
      </label>
      <br />

      <button type="submit" id="submit"style={{fontWeight:'500',letterSpacing:'0.2vh'}} >
        Register
      </button>
      {error && <p style={{ color: errorColor, fontWeight: "600" }}>{error}</p>}
    </form>
  );
}
export default Form;
