import React from "react";
import ReactDOM from "react-dom";
import "./styles/feed/index.css";
import "./styles/feed/utilities.css";
import "./styles/feed/btn.css";
import "./styles/feed/jumbotron.css";
import "./styles/feed/addcoment.css";
import "./styles/feed/pub.css";
import "./styles/feed/textpub.css";
import "./styles/feed/imagespub.css";
import "./styles/feed/popup.css";
import "./styles/login/setup.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.css";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
