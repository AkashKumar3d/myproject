import React from "react";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import Loader from "./Loader";
import { RiBilliardsFill } from "react-icons/ri";
import { billing } from "../common/tablevariabls";
// import { WorkBook, WorkSheet, utils, writeFile } from "xlsx";
// import { useNavigate } from "react-router-dom";

function Billing() {

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
            <RiBilliardsFill
              className="heading-icon"
              style={{ color: "orange" }}
            />
            <h1>
              BILLING <span>10</span>
            </h1>
          </div>
        </div>

        <>
          {" "}
          <table className="main-table" id="excel_table">
            <thead>
              <tr>
                {billing.map((res) => {
                  return (
                    <th className="table-th">{res}</th>
                  )
                })
                }

              </tr>
            </thead>
            <tbody>

              <tr>
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
                  <button
                    className="color-button"
                    style={{
                      backgroundColor: "invoice"
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
}

export default Billing;
