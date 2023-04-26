import React, { useEffect, useState } from "react";
import { AiOutlineLineChart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { Mbr } from "../common/tablevariabls";
import { fetchingdata } from "../Redux/fetures/tablesclice";
import { useDispatch, useSelector } from "react-redux";
const MBR = () => {
  const dispatch = useDispatch()
  const alldata = useSelector((state) => state.app.alldata)
  const Loading = useSelector((state) => state.app.Loading)
//  console.log(alldata[1].data.data, "pending status")
let pendingstatus = [];
for (let i = 0; i < alldata[1]?.data.data.length; i++) {
  
  pendingstatus.push(alldata[1].data.data)
}
 

  console.log(pendingstatus, "pending status")

  useEffect(() => {
    dispatch(fetchingdata())
  }, [])
  function date(a) {
    let milisecondValue = a;
    let date = new Date(milisecondValue);
    return date.toString();
  }

  function issue_escl(a) {
    var issuename = [];
    if (a != null) {
      for (let i = 0; i < a.length; i++) {
        if (a[i].issueType === "Escalations") {
          issuename.push(a[i].issueType);
        }
      }
      return issuename.length;
    } else {
      return "0";
    }
  }

  function issue_track(a) {
    var issuename = [];
    if (a != null) {
      for (let i = 0; i < a.length; i++) {
        if (a[i].issueType === "Tracking Update") {
          issuename.push(a[i].issueType);
        }
      }
      return issuename.length;
    } else {
      return "0";
    }
  }

  function issue_abnorm(a) {
    var issuename = [];
    if (a != null) {
      for (let i = 0; i < a.length; i++) {
        if (a[i].issueType === "Abnormalities") {
          issuename.push(a[i].issueType);
        }
      }
      return issuename.length;
    } else {
      return "0";
    }
  }

  function todaysdate(date1) {
    var currentDate = new Date();
    var currentTimeInMs = currentDate.getTime();
    const difference = currentTimeInMs - date1;
    // Calculate the difference in days, hours, and minutes
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    // Return the difference as a string in the format "X days Y hours Z minutes"
    return `${days}D ${hours}H`;
  }

  function differentdate(a) {
    let date = new Date(a);
    let milliseconds = date.getTime();
    const currentDate = new Date();
    const currentTimestamp = currentDate.getTime();
    const expectedPickupDate = milliseconds;
    const expectedPickupTimestamp = expectedPickupDate;
    let days, hours, minutes;
    if (expectedPickupTimestamp > currentTimestamp) {
      const difference = expectedPickupTimestamp - currentTimestamp;
      days = Math.floor(difference / (1000 * 60 * 60 * 24));
      hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    } else if (currentTimestamp > expectedPickupTimestamp) {
      const difference = currentTimestamp - expectedPickupTimestamp;
      days = Math.floor(difference / (1000 * 60 * 60 * 24)) * -1;
      hours =
        Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) *
        -1;
      minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)) * -1;
    } else {
      days = 0;
      hours = 0;
      minutes = 0;
    }
    const re = days + "d" + hours + "h" + minutes + "m";
    return re;
  }

  function subtractDates1(date1, date2) {
    const difference = date1 - date2;
    // Calculate the difference in days, hours, and minutes
    let days, hours, minutes;
    days = Math.floor(difference / (1000 * 60 * 60 * 24));
    hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const re = days + "d" + hours + "h" + minutes + "m";
    return re;
  }
  return (
    <>
      {
        Loading ? (<Loader />) : (
          <main>
            <div className="main_table-heading">
              <div className="heading">
                <AiOutlineLineChart
                  className="heading-icon"
                  style={{ color: "orange" }}
                />
                <h1>
                  MBR <span>{pendingstatus.length}</span>
                </h1>
              </div>
            </div>

            <>
              <iframe
                style={{
                  background: "#252525",
                  border: "none",
                  borderRadius: "2px",
                  boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
                  width: "100vw",
                  height: "100vh",
                }}
                src="https://charts.mongodb.com/charts-project-0-ixrdr/embed/dashboards?id=640fea27-e1ba-4465-8c63-3db4bc804f10&theme=dark&autoRefresh=true&maxDataAge=300&showTitleAndDesc=true&scalingWidth=fixed&scalingHeight=fixed"
              ></iframe>
              <table>
                <thead>
                  <tr>
                    {Mbr.map((res) => {
                      return (
                        <th className="table-th">{res}</th>
                      )

                    })}

                  </tr>
                </thead>
                <tbody>
                  {pendingstatus[0].map((res) => {
                       console.log(res, "response ")
                    return (
                      <tr>
                      <td className="td-main">
                        {res.fleetInfo.vehicle.vehicleRegistrationNumber}
                      </td>
                      <td className="td-main">
                        {
                          res.fleetInfo.vehicle.vehicleLoadType.name.split(
                            "-"
                          )[1]
                        }
                      </td>
                      <td className="td-main">created</td>
                      <td className="td-main">
                        {res.consignments[0].lineItems[0].material
                          ? res.consignments[0].lineItems[0].material.name
                          : "no material"}
                      </td>
                      <td
                        className="td-main"
                        style={{
                          fontWeight: "bolder",
                          color:
                            issue_escl(res.issues) > 0 ? "red" : "#00ff00",
                        }}
                      >
                        {issue_escl(res.issues)}
                      </td>
                      <td
                        className="td-main"
                        style={{
                          fontWeight: "bolder",
                          color:
                            issue_track(res.issues) > 0 ? "red" : "#00ff00",
                        }}
                      >
                        {issue_track(res.issues)}
                      </td>
                      <td
                        className="td-main"
                        style={{
                          fontWeight: "bolder",
                          color:
                            issue_abnorm(res.issues) > 0 ? "red" : "#00ff00",
                        }}
                      >
                        {issue_abnorm(res.issues)}
                      </td>
                      <td className="td-main">
                        {" "}
                        {res.shipmentStages[0].place.name}
                      </td>
                      <td className="td-main">
                        {" "}
                        {res.consignments[0].consigner.name.split("-")[1]}
                      </td>
                      <td className="td-main">
                        {res.shipmentStages[1].place.name}
                      </td>
                      <td className="td-main">
                        {" "}
                        {res.consignments[0].consignee.name}
                      </td>
                      <td className="td-main">-</td>
                      <td className="td-main">-</td>
                      <td className="td-main">
                        {differentdate(res.shipmentStages[0].arrivalTime)}
                      </td>
                      <td className="td-main">
                        {differentdate(
                          subtractDates1(
                            res.shipmentStages[0].gateInTime,
                            res.shipmentStages[0].arrivalTime
                          )
                        )}
                      </td>
                      <td className="td-main">
                        {subtractDates1(
                          res.shipmentStages[0].departureTime,
                          res.shipmentStages[0].gateInTime
                        )}
                      </td>
                      <td className="td-main">
                        {" "}
                        {subtractDates1(
                          res.shipmentStages[0].actualActivityStartTime,
                          res.shipmentStages[0].gateInTime
                        )}
                      </td>
                      <td className="td-main">
                        {subtractDates1(
                          res["shipmentStages"][0]["actualActivityEndTime"],
                          res["shipmentStages"][0]["actualActivityStartTime"]
                        )}
                      </td>
                      <td className="td-main">
                        {" "}
                        {subtractDates1(
                          res["shipmentStages"][0]["departureTime"],
                          res["shipmentStages"][0]["actualActivityEndTime"]
                        )}
                      </td>
                      <td className="td-main">
                        {" "}
                        {subtractDates1(
                          res["shipmentStages"][0]["departureTime"],
                          res["shipmentStages"][0]["arrivalTime"]
                        )}
                      </td>
                      <td className="td-main">
                        {subtractDates1(
                          res["shipmentStages"][1]["arrivalTime"],
                          res["shipmentStages"][0]["departureTime"]
                        )}
                      </td>
                      <td className="td-main">
                        {subtractDates1(
                          res["shipmentStages"][1]["actualActivityStartTime"],
                          res["shipmentStages"][1]["arrivalTime"]
                        )}
                      </td>
                      <td className="td-main">
                        {subtractDates1(
                          res["shipmentStages"][1]["actualActivityEndTime"],
                          res["shipmentStages"][1]["actualActivityStartTime"]
                        )}
                      </td>
                      <td className="td-main">
                        {subtractDates1(
                          res["shipmentStages"][1]["departureTime"],
                          res["shipmentStages"][1]["actualActivityEndTime"]
                        )}
                      </td>
                      <td className="td-main">
                        {subtractDates1(
                          res["shipmentStages"][1]["departureTime"],
                          res["shipmentStages"][1]["arrivalTime"]
                        )}
                      </td>
                      <td className="td-main">
                        {subtractDates1(
                          res["shipmentStages"][1]["departureTime"],
                          res["shipmentStages"][1]["arrivalTime"]
                        )}
                      </td>
                      <td className="td-main">
                        {res["consignments"][0]["pod"]?.status
                          ? res["consignments"][0]["pod"]?.status
                          : "SUBMITTED"}
                      </td>
                      <td className="td-main">
                        {todaysdate(
                          res["shipmentStages"][1]["departureTime"]
                        )}
                      </td>
                      <td className="td-main" style={{ lineHeight: "2rem" }}>
                        <span>
                          {res.consignments[0]?.pod &&
                          res.consignments[0]?.pod?.documents ? (
                            <a
                              style={{ color: "#ff06ff", fontWeight: "bold" }}
                              href={
                                res.consignments[0]?.pod?.documents[0]
                                  .downloadUrl
                              }
                              target="_blank"
                              rel="noreferrer"
                            >
                              FRONT PIC
                            </a>
                          ) : (
                            "WATING"
                          )}
                        </span>
                        <br />
                        <span>
                          {res.consignments[0]?.pod &&
                          res.consignments[0]?.pod?.documents ? (
                            <a
                              style={{ color: "#ff06ff", fontWeight: "bold" }}
                              href={
                                res.consignments[0]?.pod?.documents[0]
                                  .downloadUrl
                              }
                              target="_blank"
                              rel="noreferrer"
                            >
                              BACK PIC
                            </a>
                          ) : (
                            "FOR PIC"
                          )}
                        </span>
                      </td>
                    </tr>
                    );

                  })}
                </tbody>
              </table>
            </>

          </main>
        )
      }

    </>
  );
};

export default MBR;
