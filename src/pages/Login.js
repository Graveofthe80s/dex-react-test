import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./login.style.css";
import logo from "../images/assets/logo.png";
import mail from "../images/assets/mail.png";
import lock from "../images/assets/lock.png";

const Parse = require("parse");

const Login = (props) => {
  const [show, setShow] = useState("password");
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const history = useHistory();

  const handleChange = (e) => {
    const value = e.target.value;
    e.target.name === "email" ? setEmail(value) : setPassword(value);
    console.log(email, password);
  };

  /** Login method */
  const login = async (e) => {
    e.preventDefault();

    try {
      if (email && password) {
        const user = await Parse.User.logIn(email, password);
        console.log(user);
        localStorage.setItem("userIsLogged", true);
        history.push("/foods");
      }
    } catch (error) {
      if (error) {
        throw new Error(error);
      }
    }
  };

  /** Show/Hide password input */
  function showPass(e) {
    e.target.checked ? setShow("text") : setShow("password");
  }
  return (
    <div className="container">
      {localStorage.getItem("userIsLogged") && history.push("/foods")}
      <div className="login-register">
        <img className="logo" src={logo} alt="logo" />
        <form className="login-form">
          <label className="login-label">Email</label>
          <input
            className="login-input mail"
            type="email"
            name="email"
            placeholder="seunome@email.com"
            onChange={(e) => handleChange(e)}
            value={email}
          />
          <label className="login-label">Password</label>
          <input
            className="login-input lock"
            type={show}
            name="password"
            placeholder="Password"
            onChange={(e) => handleChange(e)}
            value={password}
          />
          <div className="checkbox">
            <input
              type="checkbox"
              name="show-password"
              onChange={(e) => showPass(e)}
            />
            <label>Mostrar a senha</label>
          </div>
          <a href="/">Problemas para acessar sua conta?</a>
          <button className="login-btn" type="submit" onClick={(e) => login(e)}>
            Acessar
          </button>
          <span id="or">ou</span>
          <button className="signup-btn" type="submit">
            Cadastrar
          </button>
          <div className="links">
            <Link to="/" id="terms">
              Termos de uso
            </Link>
            <Link to="/" id="pdp">
              Política de privacidade
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export { Login as default };
