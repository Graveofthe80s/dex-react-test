import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

const Parse = require("parse");

Parse.initialize("OSGiFZBrXxNLjN3gYDPsgi7P4a0j6fzcc2iaCKga");
Parse.serverURL = "http://localhost:1337/parse";

ReactDOM.render(<App />, document.getElementById("root"));
