import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { MdSpatialTracking } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Tracking_update } from "../common/tablevariabls";
import { fetchingdata } from "../Redux/fetures/tablesclice";
import { useDispatch, useSelector } from "react-redux";
const TrackingUpdates = () => {
const dispatch=useDispatch();
const alldata=useSelector((state)=>state.app.alldata)  
const loading=useSelector((state)=>state.app.loading)
console.log(alldata, "alldata")

      // tracking update complete shipment
      let pendingShipement = [];
      for (let i = 0; i < alldata[1]?.data.data.length; i++) {
        if (
          alldata[1].data.data[i].issues != null &&
          alldata[1].data.data[i].issues.issueType === "Tracking Update"
        ) {
          
         pendingShipement.push(alldata)
        }
      
      }
      console.log(pendingShipement, "pending shipment")
      // tracking update complete shipment
      let completeShipement = [];
      for (let i = 0; i < alldata[3]?.data.data.length; i++) {
        if (
          alldata[3].data.data[i].issues != null &&
          alldata[3].data.data[i].issues[0]?.issueType === "Tracking Update"
        ) {
          completeShipement.push(alldata[3].data.data[i]);
        }
      }
    
  console.log(completeShipement,"complete shipment")

  useEffect(() => {
    dispatch(fetchingdata())
  }, []);

  return (
    <>
      <main>
        <div className="main_table-heading">
          <div className="heading">
            <MdSpatialTracking
              className="heading-icon"
              style={{ color: "orange" }}
            />
            <h1>TRACKING UPDATES </h1>
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
              <table className="first-table">
                <thead>
                  <tr>
                    {
                      Tracking_update.map((res)=>{
                        return (<th className="table-th-short">{res}</th>)
                      })
                    }
                  </tr>
                </thead>
                <tbody>
                  {pendingShipement.map((res) => {
                    console.log(res, "pending response")
                    return (
                      <tr>
                        <td className="table-td-short">
                          {res.consignments[0].consignmentNo}
                        </td>
                        <td className="table-td-short">
                          {res.consignments[0].consigner.name.split("-")[1]}
                        </td>
                        <td
                          className="table-td-short"
                          style={{ whiteSpace: "nowrap" }}
                        >
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

                <table className="second-table">
                  <thead>
                    <tr>
                    {
                      Tracking_update.map((res)=>{
                        return (<th className="table-th-short">{res}</th>)
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
                          <td
                            className="table-td-short"
                            style={{ whiteSpace: "nowrap" }}
                          >
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

export default TrackingUpdates;
