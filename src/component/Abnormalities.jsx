import React, { useEffect, useState } from "react";
// import axios from "axios";
import { fetchingdata } from "../Redux/fetures/tablesclice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import { FaCreativeCommonsSa } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { abnormalities_tbl1, abnormalities_tbl2 } from "../common/tablevariabls";


const Abnormalities = () => {
const alldata=useSelector((state)=>state.app.alldata)
const loading=useSelector((state)=>state.app.loading)  
const dispatch=useDispatch()

  

      // tracking update complete shipment
      var pendingShipement = [];
      for (let i = 0; i < alldata[0]?.data.data.length; i++) {
        if (
          alldata[0].data.data[i].issues != null &&
          alldata[0].data.data[i].issues[0]?.issueType === "Abnormalities"
        ) {
          pendingShipement.push(alldata[1].data.data[i]);
        }
      }
console.log(pendingShipement, "pending shipment")
      // tracking update complete shipment
      var completeShipement = [];
      for (let i = 0; i < alldata[1]?.data.data.length; i++) {
        if (
          alldata[1].data.data[i].issues != null &&
          alldata[1].data.data[i].issues[0]?.issueType === "Abnormalities"
        ) {
          completeShipement.push(alldata[3].data.data[i]);
        }
      }
     console.log(completeShipement, "complete shipment ")

    // export function 
  useEffect(() => {
    dispatch(fetchingdata())
  }, []);

  return (
    <>
      <main>
        <div className="main_table-heading">
          <div className="heading">
            <FaCreativeCommonsSa
              className="heading-icon"
              style={{ color: "orange" }}
            />
            <h1>ABNORMALITIES</h1>
          </div>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <>
            <h1 style={{ color: "black", fontWeight: "500" }}>
              PENDING &nbsp;{pendingShipement.length}{" "}
            </h1>
            <div className="two-tables">
              <table className="first-table" id="excel_table">
                <thead>
                  <tr>
                    {abnormalities_tbl1.map((res) => {
                      return (
                        <th className="table-th-short">{res} </th>
                      )
                    })
                    }

                  </tr>
                </thead>
                <tbody>
                  {pendingShipement.map((res) => {
                    return (
                      <tr>
                        <td className="table-td-short">
                          {res.consignments[0].consignmentNo}
                        </td>
                        <td className="table-td-short">
                          {res.consignments[0].consigner.name.split("-")[1]}
                        </td>
                        <td className="table-td-short">
                          {res.consignments[0].consignee.name}
                        </td>
                        <td className="table-td-short">
                          {res.issues && res.issues[0].issueType}
                        </td>
                        <td className="table-td-short">created</td>
                        <td className="table-td-short">
                          {res.issues[0].customFields
                            .filter((res) => res.fieldKey === "Remarks : ")
                            .map((res) => {
                              return <>{res.value}</>;
                            })}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div>
                <div style={{ marginTop: "-3.2rem" }}>
                  <h1 style={{ color: "black", fontWeight: "500" }}>
                    COMPLETED &nbsp;{completeShipement.length}
                  </h1>
                </div>
                <table className="second-table" id="excel_table">
                  <thead>
                    <tr>
                      {
                        abnormalities_tbl2.map((res) => {
                          return (
                            <th className="table-th-short">{res}</th>
                          )
                        })
                      }


                    </tr>
                  </thead>
                  <tbody>
                    {completeShipement.map((res) => {
                      return (
                        <tr>
                          <td className="table-td-short">
                            {res.consignments[0].consignmentNo}
                          </td>
                          <td className="table-td-short">
                            {res.consignments[0].consigner.name.split("-")[1]}
                          </td>
                          <td className="table-td-short">
                            {res.consignments[0].consignee.name}
                          </td>
                          <td className="table-td-short">
                            {res.issues && res.issues[0].issueType}
                          </td>
                          <td className="table-td-short">created</td>
                          <td className="table-td-short">
                            {res.issues[0].customFields
                              .filter((res) => res.fieldKey === "Remarks : ")
                              .map((res) => {
                                return <>{res.value}</>;
                              })}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </main>
    </>
  );
};
export default Abnormalities;
