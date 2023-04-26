import React from "react";
import { MdFireTruck } from "react-icons/md";
import { FaTruckPickup, FaTruckLoading, FaList } from "react-icons/fa";
import { RiTruckFill } from "react-icons/ri";
import { TbTruckDelivery } from "react-icons/tb";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import Loader from "./Loader";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {  fetchingdata } from "../Redux/fetures/tablesclice";
const Main = () => {
 
  const dispatch =useDispatch()
  const alldata=useSelector((state)=>state.app.alldata)
  const loading=useSelector((state)=>state.app.loading)
  
  // globle state access here 
  console.log(alldata, "my all api data")
  console.log(loading, "loader status")
  

// pending response 
let  pendingresponse=[]
// let i;
    for (let i = 0; i < alldata[0]?.data.data.length; i++) {
      if (
        alldata[0].data.data[i].secondaryStatus === "CREATED" ||
        alldata[0].data.data[i].secondaryStatus === "PARTIALLY_PLANNED"
      ) {
        pendingresponse.push(alldata[0].data.data[i])
        
      }
    }
    console.log(pendingresponse, "pending response ")
    
  
// completed response 
let completeResponse = [];
for (let i = 0; i < alldata[1]?.data.data.length; i++) {
  if (alldata[1].data.data[i].shipmentStatus === "Completed") {
    completeResponse.push(alldata[1].data.data[i]);
  }
}
console.log(completeResponse, "completed response ")
  
// enrouteforpickup ,atpickup, atunloading, intransit
let enrouteforpickup = [];
let atpickup = [];
let atunloading = [];
let intransit = [];
for (let i = 0; i < alldata[1]?.data.data.length; i++) {
  if (
    alldata[1].data.data[i].shipmentTrackingStatus ===
    "Enroute For Pickup"
  ) {
    enrouteforpickup.push(alldata[1].data.data[i]);
  } else if (
    alldata[1].data.data[i].shipmentTrackingStatus === "At Delivery Point"
  ) {
    atunloading.push(alldata[1].data.data[i]);
  } else if (
    alldata[1].data.data[i].shipmentTrackingStatus === "At Pickup Point"
  ) {
    atpickup.push(alldata[1].data.data[i]);
  } else if (
    alldata[1].data.data[i].shipmentTrackingStatus ===
    "Enroute For Delivery"
  ) {
    intransit.push(alldata[1].data.data[i]);
  }
}
console.log(enrouteforpickup, "enrouteforpickup");
console.log(atpickup, "atpickup");
console.log(atunloading, "atunloading");
console.log(intransit,"intransit");
// useeffect 
  useEffect(()=>{
    dispatch(fetchingdata())
  },[])
  return (  
    <div>
    {
     loading ? (<Loader/>):(
 
        <>
          {" "}
          <div className="top"></div>
          <div className="middle">
            <div className="card">
              <div className="pending-order">
                <NavLink to="/pendingorder">
                  <div className="first">
                    <FaList className="icon" style={{ color: "orange" }} />
                    <h1>PENDING ORDERS</h1>
                  </div>
                  <div className="last">{pendingresponse.length}</div>
                </NavLink>
              </div>

              <div className="pending-order">
                <NavLink to="/enrouteforpicup">
                  <div className="first">
                    <FaTruckPickup
                      className="icon"
                      style={{ color: "green" }}
                    />
                    <h1>ENROUTE FOR PICKUP</h1>
                  </div>
                  <div className="last">{enrouteforpickup.length}</div>
                </NavLink>
              </div>

              <div className="pending-order">
                <NavLink to="/atpickup">
                  <div className="first">
                    <FaTruckLoading
                      className="icon"
                      style={{ color: "#c94c4c" }}
                    />
                    <h1>AT PICKUP</h1>
                  </div>
                  <div className="last">{atpickup.length}</div>
                  
                </NavLink>
              </div>

              <div className="pending-order" style={{ marginTop: "1.5rem" }}>
                <NavLink to="/intransit">
                  <div className="first">
                    <TbTruckDelivery
                      className="icon"
                      style={{ color: "#FFCC00" }}
                    />
                    <h1>INTRANSIT</h1>
                  </div>
                  <div className="last">{intransit.length}</div>
                  
                </NavLink>
              </div>

              <div className="pending-order" style={{ marginTop: "1.5rem" }}>
                <NavLink to="/atunloading">
                  <div className="first">
                    <MdFireTruck
                      className="icon"
                      style={{ color: "#80ced6" }}
                    />
                    <h1>AT UNLOADING</h1>
                  </div>
                  <div className="last">{atunloading.length}</div>
                  
                </NavLink>
              </div>

              <div className="pending-order" style={{ marginTop: "1.5rem" }}>
                <NavLink to="/completed">
                  <div className="first">
                    <RiTruckFill className="icon" style={{ color: "green" }} />
                    <h1>COMPLETED</h1>
                  </div>
                  <div className="last">{completeResponse.length}</div>
                  
                </NavLink>
              </div>
            </div>
          </div>
          <div className="bottom">
            <div className="left" style={{ color: "black", marginTop: "10px" }}>
              <div className="maps">
                &nbsp;&nbsp;{" "}
                <span
                  className="counter"
                  style={{ fontSize: "25px", color: "black" }}
                >
                  {" "}
                  <i
                    className="fa-solid fa-truck-fast"
                    style={{ color: "black" }}
                  />{" "}
                  Transit Vehicle Map
                </span>
                <br />
                <br />
                <div className="india" id="map"></div>
              </div>
            </div>
          </div>
        </>
        )}
        </div>
  );
};

export default Main;
