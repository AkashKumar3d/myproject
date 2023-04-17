import React from "react";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import Loader from "./Loader";
import { MdOutlinePayment } from "react-icons/md";
// import { utils, writeFile } from "xlsx";
// import { useNavigate } from "react-router-dom";

const Payment = () => {
 
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
            <MdOutlinePayment
              className="heading-icon"
              style={{ color: "orange" }}
            />
            <h1>
              PAYMENT <span>20</span>
            </h1>
          </div>
        </div>
       
          <>
            {" "}
            <table className="main-table" id="excel_table">
              <thead>
                <tr>
                  <th className="table-th">Vehicle No. </th>
                  <th className="table-th">Vehicle type </th>
                  <th className="table-th">Ship to Name</th>
                  <th className="table-th">Ship To Address</th>
                  <th className="table-th">Arrival Time </th>
                  <th className="table-th">gateInTime vs arrivalTime </th>
                  <th className="table-th">departureTime vs gateInTime</th>
                  <th className="table-th">Podc</th>
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
                      </tr>
                   
              </tbody>
            </table>
          </>
      
      </main>
    </>
  );
};

export default Payment;
