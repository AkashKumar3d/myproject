import React from "react";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import Loader from "./Loader";
import { MdFireTruck } from "react-icons/md";
import { Atunloading } from "../common/tablevariabls";
// import { WorkBook, WorkSheet, utils, writeFile } from "xlsx";
// import { useNavigate } from "react-router-dom";

const AtUnloading = () => {
 
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
            <MdFireTruck className="heading-icon" style={{ color: "orange" }} />
            <h1>
              AT UNLOADING <span>5</span>
            </h1>
          </div>
        </div>

       <>
            <table className="main-table" id="excel_table">
              <thead>
                <tr>
                  {
                    Atunloading.map((res)=>{
                      return(
                        <th className="table-th">{res}</th>
                      )
                    })
                  }
                </tr>
              </thead>
              <tbody>
                
                      <tr>
                        <td className="td-main"></td>
                        <td className="td-main"></td>
                        <td className="td-main">
                          
                        </td>
                        <td
                          className="td-main"
                          style={{
                            fontWeight: "bolder",
                            color: "rgb(16, 177, 231)",
                          }}
                        >
                          
                        </td>
                        <td className="td-main">
                          
                        </td>
                        <td className="td-main">created</td>
                        <td
                          className="td-main"
                          style={{
                            fontWeight: "bolder",
                            color:"red"
                          }}
                        >
                          
                        </td>
                        <td
                          className="td-main"
                          style={{ fontWeight: "bolder", color: "red" }}
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
                            className="color-button hovertext2"
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
                          <button
                            className="color-button"
                            style={{
                              backgroundColor: "red"
                            }}
                          ></button>

                          <button
                            className="color-button"
                            style={{
                              backgroundColor:"red"
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
                              backgroundColor:"red"
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

export default AtUnloading;
