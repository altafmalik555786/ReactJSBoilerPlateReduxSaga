import style from "./style.module.scss";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "../src/assets/fonts/style.css";
import LayOut from "./components/layout/index";
import { Provider } from "react-redux";
import store from './store'

function App() {
  return (
    <Provider store={store} >
      <Router>
        <div className={style.app}>
          <LayOut />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
