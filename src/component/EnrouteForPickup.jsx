import React, { useEffect, useState } from "react";
// import Loader from "./Loader";
import { FaTruckPickup } from "react-icons/fa";
import { enroute_for_pickup } from "../common/tablevariabls";
// import { WorkBook, WorkSheet, utils, writeFile } from "xlsx";
// import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchingdata } from "../Redux/fetures/tablesclice";
const EnrouteForPickup = () => {
  const alldata = useSelector((state) =>  state.app.alldata );
  const loading = useSelector((state) =>  state.app.loading );
  const dispatch = useDispatch()
  console.log(alldata, "alldata enroute");
  console.log(loading, "loader enroute")

  // useeffect here 
  useEffect(() => {
    dispatch(fetchingdata())
  }, [])
  return (
    <>
      <main>
        <div className="main_table-export">
          <div className="export">
            <button >
              <h1> EXPORT</h1>
            </button>
          </div>
        </div>
        <div className="main_table-heading">
          <div className="heading">
            <FaTruckPickup
              className="heading-icon"
              style={{ color: "orange" }}
            />
            <h1>
              ENROUTE FOR PICKUP <span>0</span>
            </h1>
          </div>
        </div>


        <table id="excel_table">
          <thead>
            <tr>
              {
                enroute_for_pickup.map((res) => {
                  return (<th className="table-th">{res}</th>)
                })
              }

            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="td-main"></td>
              <td className="td-main">

              </td>

              <td className="td-main">

              </td>
              <td className="td-main">

              </td>
              <td className="td-main">

              </td>
              <td className="td-main">

              </td>
              <td
                className="td-main"
                style={{
                  fontWeight: "bolder",
                  color: "red"
                }}
              >

              </td>
              <td
                className="td-main"
                style={{ color: "#00ff00", fontWeight: "bold" }}
              >

              </td>
              <td
                className="td-main"
                style={{ color: "rgb(212, 41, 41)" }}
              >

              </td>
              <td
                className="td-main"
                style={{ color: "rgb(247, 3, 145)" }}
              >

              </td>
              <td className="td-main">
                <button
                  className="color-button"
                  style={{
                    backgroundColor: "red"
                  }}
                ></button>

                <button
                  className="color-button"
                  style={{
                    backgroundColor: "red"
                  }}
                ></button>
                <button
                  className="color-button"
                  style={{
                    backgroundColor: "red"
                  }}
                ></button>
                <button
                  className="color-button"
                  style={{
                    backgroundColor: "red"
                  }}
                ></button>
                <button
                  className="color-button"
                  style={{
                    backgroundColor: "red"
                  }}
                ></button>
              </td>
            </tr>

          </tbody>
        </table>
      </main>
    </>
  );
};

export default EnrouteForPickup;
