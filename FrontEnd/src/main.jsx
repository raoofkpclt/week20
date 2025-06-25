import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import App from "./App.jsx";

import Store from "../Reduxtoolkit/Store.jsx";
import { Provider } from "react-redux";
let store = Store();

if (store.length == 0) {
  console.log("no data in Redux-Store");
}else {
  store.subscribe(()=>{
    console.log("the store is",store.getState());
  })
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
