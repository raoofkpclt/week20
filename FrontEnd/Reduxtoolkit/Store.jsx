import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./Reducer";
import adminReducer from "./adminReducer";

const Store = () => {
  const store = configureStore({
    reducer: {
      auth: counterReducer,
      adminAuth: adminReducer,
    },
  });

  return store;
};

export default Store;
