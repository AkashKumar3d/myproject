import { configureStore } from '@reduxjs/toolkit';
import traveldata from "./fetures/tablesclice"

const store = configureStore({
    reducer: {
      app:traveldata
    },
  })
  

  export default store;