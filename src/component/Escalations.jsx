import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Loader from "./Loader";
import { MdOutlineEscalator } from "react-icons/md";
import { excalation_tbl1 } from "../common/tablevariabls";
// import { useNavigate } from "react-router-dom";

const Escalations = () => {
  
  return (
    <>
    
      <main>
        <div className="main_table-heading">
          <div className="heading">
            <MdOutlineEscalator
              className="heading-icon"
              style={{ color: "orange" }}
            />
            <h1>ESCALATIONS</h1>
          </div>
        </div>

        
            <h1 style={{ color: "black", fontWeight: "500" }}>
              PENDING &nbsp;
            </h1>
            <div className="two-tables">
              <table className="first-table">
                <thead>
                  <tr>
                    {excalation_tbl1.map((res)=>{
                      return(
                        <th className="table-th-short">{res}</th>
                        )
                    })}
                  </tr>
                </thead>
                <tbody>
                 
                      <tr>
                        <td className="table-td-short">
                          
                        </td>
                        <td className="table-td-short">
                         
                        </td>
                        <td className="table-td-short">
                          
                        </td>
                        <td className="table-td-short">
                          
                        </td>
                        <td className="table-td-short">created</td>
                        <td className="table-td-short">
                          
                        </td>
                      </tr>
                   
                </tbody>
              </table>

              <div>
                <div style={{ marginTop: "-3.2rem" }}>
                  <h1 style={{ color: "black", fontWeight: "500" }}>
                    COMPLETED &nbsp;
                  </h1>
                </div>
                <table className="second-table">
                  <thead>
                    <tr>
                    {excalation_tbl1.map((res)=>{
                      return(
                        <th className="table-th-short">{res}</th>
                        )
                    })}
                    </tr>
                  </thead>
                  <tbody>
                        <tr>
                          <td className="table-td-short">
                           
                          </td>
                          <td className="table-td-short">
                            
                          </td>
                          <td
                            className="table-td-short"
                            style={{ whiteSpace: "nowrap" }}
                          >
                            
                          </td>
                          <td className="table-td-short">
                            
                          </td>
                          <td className="table-td-short">created</td>
                          <td className="table-td-short">
                         
                          </td>
                        </tr>
                  </tbody>
                </table>
              </div>
            </div>
      </main>
    </>
  );
};

export default Escalations;
