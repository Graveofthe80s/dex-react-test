import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import logo from "../images/assets/logo.png";
import "./List.style.css";

const Parse = require("parse");

const List = (props) => {
  const path = window.location.pathname.split("/")[1];
  const isLogged = localStorage.getItem("userIsLogged");

  const [items, setItems] = useState([]);

  /** Get the API method */
  function getAll(path) {
    if (path === "foods") {
      return "getAllFoods";
    } else if (path === "people") {
      return "getAllPeople";
    } else if (path === "places") {
      return "getAllPlaces";
    }
  }

  /** Set route values for arrow links */
  function arrowLeft(path) {
    return path === "foods"
      ? "/places"
      : path === "people"
      ? "/foods"
      : path === "places"
      ? "/people"
      : "/";
  }
  function arrowRight(path) {
    return path === "foods"
      ? "/people"
      : path === "people"
      ? "/places"
      : path === "places"
      ? "/foods"
      : "/";
  }
  /** */

  /** Fetch new data when path changes */
  useEffect(() => {
    async function query() {
      if (isLogged) {
        let list = [];
        await Parse.Cloud.run(getAll(path)).then((req) => {
          req.map((item) => {
            list.push({ name: item.get("name"), link: item.get("link") });
          });
          setItems(list);
        });
      }
    }
    query();
  }, [path]);

  /**
   * Card component
   * Some items are missing a dot before "jpg" in the link
   * */
  const card = (item) => (
    <div className="card">
      <img
        src={
          item.link.includes(".jpg")
            ? item.link
            : `${item.link.split("jpg")[0]}.jpg`
        }
        alt={`${item.name}-img`}
        className="item-img"
      />
      <div className="item-title">
        <p>{item.name}</p>
      </div>
    </div>
  );

  return (
    <div className="list-container">
      <div className="navbar">
        <img src={logo} alt="logo" />
        <div className="links">
          <Link className={path === "foods" ? "active" : ""} to="/foods">
            FOODS
          </Link>
          <Link className={path === "people" ? "active" : ""} to="/people">
            PEOPLE
          </Link>
          <Link className={path === "places" ? "active" : ""} to="/places">
            PLACES
          </Link>
        </div>
      </div>
      <div className="list">
        <span className="list-title">LIST OF {path.toUpperCase()}</span>
        <div className="cards">{items && items.map((item) => card(item))}</div>
      </div>
      <div className="arrows">
        <Link className="link-left" to={arrowLeft(path)}>
          <i className="arrow left"></i>
        </Link>
        <Link className="link-right" to={arrowRight(path)}>
          <i className="arrow right"></i>
        </Link>
      </div>
    </div>
  );
};

export { List as default };
