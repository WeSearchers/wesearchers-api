import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import "./styles/utilities.css";
import "./styles/btn.css";
import "./styles/jumbotron.css";
import "./styles/addcoment.css";
import "./styles/pub.css";
import "./styles/textpub.css";
import "./styles/imagespub.css";
import "./styles/popup.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.css";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
