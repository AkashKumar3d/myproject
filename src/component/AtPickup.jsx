import React from "react";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import Loader from "./Loader";
import { FaTruckLoading } from "react-icons/fa";
import { Atpickup } from "../common/tablevariabls";
import { WorkBook, WorkSheet, utils, writeFile } from "xlsx";
// import { useNavigate } from "react-router-dom";

const AtPickup = () => {


  // export file 
  const exportExcelFile = () => {
    const element = document.getElementById("excel_table");
    let ws = utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    // console.log(ws,"expost data")
    let wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Sheet1");
    /* save to file */
    writeFile(wb, "Atpuckup.xlsx");
  };
  return (
    <>
      <main>
        <div className="main_table-export">
          <div className="export">
            <button onClick={exportExcelFile}>
              <h1> EXPORT</h1>
            </button>
          </div>
        </div>
        <div className="main_table-heading">
          <div className="heading">
            <FaTruckLoading
              className="heading-icon"
              style={{ color: "orange" }}
            />
            <h1>
              AT PICKUP <span>5</span>
            </h1>
          </div>
        </div>

        <>
          <table className="main-table" id="excel_table">
            <thead>
              <tr>

                {Atpickup.map((res) => {
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
                <td className="td-main">

                </td>
                <td className="td-main">

                </td>
                <td className="td-main">

                </td>
                <td className="td-main">

                </td>
                <td className="td-main">created</td>
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
                  style={{ color: "red", fontWeight: "bold" }}
                >

                </td>
                <td className="td-main">

                </td>
                <td className="td-main">
                  <button
                    className="color-button hovertext1"
                    data-hover="Arrival Time"
                    style={{
                      backgroundColor: "red"
                    }}
                  >
                    .
                  </button>
                  <button
                    className="color-button hovertext1"
                    data-hover="Get In Time"
                    style={{
                      backgroundColor: "red"
                    }}
                  >
                    .
                  </button>
                  <button
                    className="color-button hovertext2"
                    data-hover="Actual Activity Load Start"
                    style={{
                      backgroundColor: "red"
                    }}
                  >
                    .
                  </button>
                  <button
                    className="color-button hovertext3"
                    data-hover="Actual Activity Load End"
                    style={{
                      backgroundColor: "red"
                    }}
                  >
                    .
                  </button>
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
        </>

      </main>
    </>
  );
};

export default AtPickup;
