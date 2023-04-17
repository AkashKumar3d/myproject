import React from "react";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import Loader from "./Loader";
import { FaList } from "react-icons/fa";
// import { utils, writeFile } from "xlsx";
// import { useNavigate } from "react-router-dom";

const PendingOrder = () => {

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
            <FaList className="heading-icon" style={{ color: "orange" }} />
            <h1>
              PENDING ORDERS <span>1</span>
            </h1>
          </div>
        </div>

        <>
          <table className="main-table" id="excel_table">
            <thead>
              <tr>
                <th className="table-th">order number </th>
                <th className="table-th">Ship To Party</th>
                <th className="table-th">Ship To Address</th>
                <th className="table-th">material</th>
                <th className="table-th">No. of Vehicles</th>
                <th className="table-th">expected Pickup Date </th>
                <th className="table-th">expected DELIVERY Date </th>
                <th className="table-th">Order By </th>
                <th className="table-th">SHPL instructions </th>
                <th className="table-th">Apml Remarks </th>
                <th className="table-th">Fit | INC | PUC | NP | PERMIT </th>

              </tr>
            </thead>

            <tbody>

              <tr className="tr">

                <td className="td-main">order number</td>
                <td
                  className="td-main"
                  style={{ color: "rgb(16, 177, 231)" }}
                ></td>
                <td
                  className="td-main"
                  style={{ color: "rgb(16, 177, 231)" }}
                >
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
                  {" "}

                </td>
                <td className="td-main">

                </td>

                <td className="td-main" style={{ color: "red" }}>

                </td>
                <td className="td-main">

                </td>
                <td className="td-main">
                  <button
                    className="color-button"
                    style={{
                      backgroundColor: "red",
                    }}
                  ></button>

                  <button
                    className="color-button"
                    style={{
                      backgroundColor: "red",
                    }}
                  ></button>
                  <button
                    className="color-button"
                    style={{
                      backgroundColor: "red",
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

export default PendingOrder;
