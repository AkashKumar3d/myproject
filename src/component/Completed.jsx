import React from "react";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import Loader from "./Loader";
import { RiTruckFill } from "react-icons/ri";
import { completed } from "../common/tablevariabls";
// import { WorkBook, WorkSheet, utils, writeFile } from "xlsx";
// import { useNavigate } from "react-router-dom";

const Completed = () => {
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
            <RiTruckFill className="heading-icon" style={{ color: "orange" }} />
            <h1>
              COMPLETED <span>0</span>
            </h1>
          </div>
        </div>

        <table className="main-table" id="excel_table">
          <thead>
            <tr>
              {
                completed.map((res)=>{
                  return (
                    <th className="table-th">{res}</th>
                  )
                })
              }
            </tr>
          </thead>
          <tbody>


            <tr>
              <td className="td-main"></td>
              <td className="td-main" style={{ cursor: "pointer" }}>
                {" "}
                <a
                  href={""}
                  target="_blank"
                  style={{
                    fontWeight: "bolder",
                    color: ""
                  }}
                >
                </a>
              </td>
              <td
                style={{
                  padding: "0px",
                  borderTop: "1px solid black",
                  borderBottom: "1px solid black",
                }}
                className="">

              </td>
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
                style={{
                  fontWeight: "bolder",
                  color: "red"
                }}
              >

              </td>
              <td
                className="td-main"
                style={{
                  fontWeight: "bolder",
                  color: "red"
                }}
              >

              </td>

              <td className="td-main">

              </td>
              <td
                className="td-main"
                style={{
                  fontWeight: "bold",
                  color: "red"
                }}
              >

              </td>
              <td
                className="td-main"
                style={{
                  fontWeight: "bold",
                  color: "red"
                }}
              >

              </td>
              <td
                className="td-main"
                style={{
                  fontWeight: "bold",
                  color: "red"
                }}
              >

              </td>
              <td
                className="td-main"
                style={{
                  fontWeight: "bold",
                  color: "red"
                }}
              >

              </td>
              <td
                className="td-main"
                style={{
                  fontWeight: "bold",
                  color: "red"
                }}
              >

              </td>
              <td
                className="td-main"
                style={{
                  fontWeight: "bold",
                  color: "red"
                }}
              >

              </td>
              <td
                className="td-main"
                style={{
                  fontWeight: "bold",
                  color: "red"
                }}
              >

              </td>
              <td
                className="td-main"
                style={{
                  fontWeight: "bold",
                  color: "red"
                }}
              >

              </td>
              <td
                className="td-main"
                style={{
                  fontWeight: "bold",
                  color: "red"
                }}
              >

              </td>
              <td
                className="td-main"
                style={{
                  fontWeight: "bold",
                  color: "red"
                }}
              >

              </td>
              <td
                className="td-main"
                style={{
                  fontWeight: "bold",
                  color: "red"
                }}
              >

              </td>
              <td
                className="td-main"
                style={{
                  fontWeight: "bold",
                  color: "red"
                }}
              >

              </td>
              <td
                className="td-main"
                style={{
                  fontWeight: "bolder",
                  color:"red"
                }}
              >

              </td>
              <td className="td-main">


              </td>
              <td
                className="td-main"
                style={{ lineHeight: "2rem" }}
              >

                <span>

                </span>
                <br />
                <span>

                </span>
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
              </td>
            </tr>


          </tbody>
        </table>

      </main>
    </>
  );
};

export default Completed;
