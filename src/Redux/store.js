import { configureStore } from '@reduxjs/toolkit';
import traveldata from "./fetures/tablesclice";
import authSlice from "./fetures/authentication";
const store = configureStore({
  
    reducer: {
      app:traveldata,
      auth:authSlice
    },
   
  })
  

  export default store;