import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import { RiTruckFill } from "react-icons/ri";
import { completed } from "../common/tablevariabls";
import { WorkBook, WorkSheet, utils, writeFile } from "xlsx";
// import { useNavigate } from "react-router-dom";
import { fetchingdata } from "../Redux/fetures/tablesclice";
import { useDispatch, useSelector } from "react-redux";
const Completed = () => {
  const dispatch = useDispatch();
  const alldata = useSelector((state) => state.app.alldata)
  const loading = useSelector((state) => state.app.loading)

  let pendingResponse = [];
  for (let i = 0; i < alldata[1]?.data.data.length; i++) {
    if (alldata[1].data.data[i].shipmentStatus === "Completed") {
      pendingResponse.push(alldata[1].data.data[i]);
    }
  }
  ;
 console.log(pendingResponse.length, "completed responseb ")
   
  const pink = [];
  pendingResponse.map((res) => {
    for (let i = 0; i < alldata[0]?.data.data.length; i++) {
      if (
        res.freightUnitLineItemId ===
        alldata[0].data.data[i]?.lineItems[0].freightUnitLineItemIds[0]
      ) {
        var obj = {
          order: alldata[0].data.data[i],
          shipment: res,
        };
        pink.push(obj);
      } else {
        pink.push({ noMatch: true, ...res });
      }
    }
  });

  let combo = [];
  pink.map((res) => {
    if (res.shipment) {
      combo.push(res);
    }
  });

  function subtractDates1(date1, date2) {
    const difference = date1 - date2;
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const re = `${days}D ${hours}H`;
    return re.toString();
  }

  function date(a) {
    let milisecondValue = a;
    let date = new Date(milisecondValue);
    return date.toString();
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
    // Return the difference as a string in the format "X days Y hours Z minutes"
    const re = `${days}D ${hours}H`;
    return re.toString();
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

  const exportExcelFile = () => {
    const element = document.getElementById("excel_table");
    let ws = utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    // console.log(ws,"expost data")
    let wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Sheet1");
    /* save to file */
    writeFile(wb, "sample.xlsx");
  };

  function totaldis(a) {
    var abc;
    if (!a) {
      return null;
    }
    for (let i = 0; i < a.length; i++) {
      if (a[i]["fieldKey"] === "TOTAL DISTANCE") {
        abc = a[i]["value"];
        break;
      } else {
        abc = "--";
      }
    }
    return abc;
  }

  function vehicletype(a) {
    let x;
    for (let i = 0; i < a.length; i++) {
      if (a[i]["fieldKey"] === "Vehicle-type") {
        x = a[i]["value"];
        break;
      }
    }
    return x;
  }

  function early_delay(a, b, c, d) {
    if (a === "" || a === null) {
      return "enter the km";
    }
    if (b === "20FT AIR SUSPENSION" || b === "40 FT AIR SUSPENSION") {
      var number_days = Number(a) / 200;
      const days = Math.floor(number_days) + 2;
      const DaysInMilliseconds = days * 24 * 60 * 60 * 1000;
      const timestamp = c + DaysInMilliseconds;
      var expecteddate = d;
      const timestamp1 = timestamp;
      const timestamp2 = expecteddate;
      const timeDiff = Math.abs(timestamp1 - timestamp2); // Calculate the absolute difference in milliseconds
      const oneDayInMilliseconds = 86400000;
      if (timeDiff >= oneDayInMilliseconds) {
        return "Early"; // Difference is greater than 1 day
      } else if (timeDiff >= 0.9 * oneDayInMilliseconds) {
        return "On time"; // Difference is approximately equal to 1 day
      } else {
        return "Delayed"; // Difference is less than 1 day
      }
    } else {
      var number_days = Number(a) / 300;
      const days = Math.floor(number_days) + 2;
      const DaysInMilliseconds = days * 24 * 60 * 60 * 1000;
      const timestamp = c + DaysInMilliseconds;
      var expecteddate = d;
      const timestamp1 = timestamp;
      const timestamp2 = expecteddate;
      const timeDiff = Math.abs(timestamp1 - timestamp2); // Calculate the absolute difference in milliseconds
      const oneDayInMilliseconds = 86400000;
      if (timeDiff >= oneDayInMilliseconds) {
        return "Early"; // Difference is greater than 1 day
      } else if (timeDiff >= 0.9 * oneDayInMilliseconds) {
        return "On time"; // Difference is approximately equal to 1 day
      } else {
        return "Delayed"; // Difference is less than 1 day
      }
      return timestamp;
    }
  }

  function gcimg(a) {
    var abc;
    if (a.length === 0) {
      abc = "https://static.dieuhau.com/2016/10/uploadfailed.jpg"
      return abc;
    }
    for (let i = 0; i < a?.length; i++) {
      if (a && a[i]["fieldKey"] === "GC Copy Image") {
        if (a[i]["value"] !== null && a[i].value !== "[]") {
          abc = a[i]["value"].split(':"')[1].split('","')[0];
          break;
        } else if (a === "null") {
          abc = "https://static.dieuhau.com/2016/10/uploadfailed.jpg";
        }
        else if (!a) {
          abc = "https://static.dieuhau.com/2016/10/uploadfailed.jpg";
        }
        else {
          abc = "https://static.dieuhau.com/2016/10/uploadfailed.jpg";
        }
      } else {
        abc = "https://static.dieuhau.com/2016/10/uploadfailed.jpg";
      }
    }
    return abc;
  }

  function invoice(a) {
    var abc;
    for (let i = 0; i < a.length; i++) {
      if (a[i]["fieldKey"] === "invoice") {
        abc = true;
        break;
      } else {
        abc = false;
      }
    }
    return abc;
  }

  function dis(a) {
    var abc;
    for (let i = 0; i < a.length; i++) {
      if (a[i]["fieldKey"] === "dis") {
        abc = true;
        break;
      } else {
        abc = false;
      }
    }
    return abc;
  }

  function eway(a) {
    var abc;
    for (let i = 0; i < a.length; i++) {
      if (a[i]["fieldKey"] === "eway") {
        abc = true;
        break;
      } else {
        abc = false;
      }
    }
    return abc;
  }

  function packinglist(a) {
    var abc;
    for (let i = 0; i < a.length; i++) {
      if (a[i]["fieldKey"] === "packing list") {
        abc = true;
        break;
      } else {
        abc = false;
      }
    }
    return abc;
  }

  useEffect(() => {
    dispatch(fetchingdata())
  }, [])
  return (
    <>
    {
      loading?(<Loader/>):(
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
            <RiTruckFill className="heading-icon" style={{ color: "orange" }} />
            <h1>
              COMPLETED <span>{combo.length}</span>
            </h1>
          </div>
        </div>

        <table className="main-table" id="excel_table">
          <thead>
            <tr>
              {
                completed.map((res) => {
                  return (
                    <th className="table-th">{res}</th>
                  )
                })
              }
            </tr>
          </thead>
          <tbody>

            {
              combo.map((res) => {
                return (
                  <tr>
                    <td className="td-main">{res.order.orderNumber}</td>
                    <td className="td-main" style={{ cursor: "pointer" }}>
                      <a
                        href={gcimg(res.shipment.consignments[0].customFields)}
                        target="_blank"
                        style={{
                          fontWeight: "bolder",
                          color:
                            gcimg(
                              res.shipment.consignments[0]?.customFields
                            ) ===
                              "https://static.dieuhau.com/2016/10/uploadfailed.jpg"
                              ? "red"
                              : gcimg(
                                res.shipment.consignments[0]
                                  ?.customFields
                              ) !==
                                "https://static.dieuhau.com/2016/10/uploadfailed.jpg"
                                ? "#02ff02"
                                : "",
                        }}
                      >
                        {res.shipment.consignments[0]?.consignmentNo
                          ? res.shipment.consignments[0]?.consignmentNo
                          : "--"}
                      </a>{" "}
                    </td>
                    <td
                      style={{
                        padding: "0px",
                        borderTop: "1px solid black",
                        borderBottom: "1px solid black",
                      }}
                      className={
                        early_delay(
                          totaldis(
                            res.shipment.consignments[0]?.customFields
                          ),
                          vehicletype(res.order["customFields"]),
                          res.shipment["shipmentStages"][0][
                          "departureTime"
                          ],
                          res.shipment["shipmentStages"][1]["arrivalTime"]
                        ) === "Early"
                          ? "early"
                          : early_delay(
                            totaldis(
                              res.shipment.consignments[0]?.customFields
                            ),
                            vehicletype(res.order["customFields"]),
                            res.shipment["shipmentStages"][0][
                            "departureTime"
                            ],
                            res.shipment["shipmentStages"][1][
                            "arrivalTime"
                            ]
                          ) === "Delayed"
                            ? "delay"
                            : early_delay(
                              totaldis(
                                res.shipment.consignments[0]?.customFields
                              ),
                              vehicletype(res.order["customFields"]),
                              res.shipment["shipmentStages"][0][
                              "departureTime"
                              ],
                              res.shipment["shipmentStages"][1][
                              "arrivalTime"
                              ]
                            ) === "On time"
                              ? "ontime"
                              : ""
                      }>
                      {early_delay(
                        totaldis(
                          res.shipment.consignments[0]?.customFields
                        ),
                        vehicletype(res.order["customFields"]),
                        res.shipment["shipmentStages"][0][
                        "departureTime"
                        ],
                        res.shipment["shipmentStages"][1]["arrivalTime"]
                      )}
                    </td>
                    <td className="td-main">
                      {res.order.customFields
                        .filter((res) => res.fieldKey === "Order By")
                        .map((res) => {
                          return <>{res.value}</>;
                        })}
                    </td>
                    <td className="td-main">
                      {
                        res.shipment.fleetInfo.vehicle
                          .vehicleRegistrationNumber
                      }
                    </td>
                    <td className="td-main">
                      {
                        res.shipment.fleetInfo.vehicle.vehicleLoadType.name.split(
                          "-"
                        )[1]
                      }
                    </td>
                    <td className="td-main">
                      {res.order.customFields
                        .filter((res) => res.fieldKey === "MATERIAL")
                        .map((res) => {
                          return <>{res.value}</>;
                        })}
                    </td>
                    <td className="td-main">
                      {res.order.customFields
                        .filter(
                          (res) => res.fieldKey === "Consignee Name"
                        )
                        .map((res) => {
                          return <>{res.value}</>;
                        })}
                    </td>
                    <td className="td-main">
                      {res.order.customFields
                        .filter(
                          (res) => res.fieldKey === "Consignee Address"
                        )
                        .map((res) => {
                          return <>{res.value}</>;
                        })}
                    </td>

                    <td className="td-main">
                      {res.order.customFields
                        .filter(
                          (res) => res.fieldKey === "Consignee Address"
                        )
                        .map((res) => {
                          return <>{res.value}</>;
                        })}
                    </td>
                    <td
                      className="td-main"
                      style={{
                        fontWeight: "bolder",
                        color:
                          issue_escl(res.shipment.issues) > 0
                            ? "red"
                            : "#00ff00",
                      }}
                    >
                      {issue_escl(res.shipment.issues)}
                    </td>
                    <td
                      className="td-main"
                      style={{
                        fontWeight: "bolder",
                        color:
                          issue_track(res.shipment.issues) > 0
                            ? "red"
                            : "#00ff00",
                      }}
                    >
                      {issue_track(res.shipment.issues)}
                    </td>
                    <td
                      className="td-main"
                      style={{
                        fontWeight: "bolder",
                        color:
                          issue_abnorm(res.shipment.issues) > 0
                            ? "red"
                            : "#00ff00",
                      }}
                    >
                      {issue_abnorm(res.shipment.issues)}
                    </td>

                    <td className="td-main">
                      {" "}
                      {date(res.shipment.shipmentStages[0].arrivalTime)}
                    </td>
                    <td
                      className="td-main"
                      style={{
                        fontWeight: "bold",
                        color: subtractDates1(
                          res.shipment["shipmentStages"][0][
                          "gateInTime"
                          ],
                          res.shipment["shipmentStages"][0][
                          "arrivalTime"
                          ]
                        ) < "0D 1H"
                          ? "#00ff00"
                          : "red",
                      }}
                    >
                      {subtractDates1(
                        res.shipment["shipmentStages"][0]["gateInTime"],
                        res.shipment["shipmentStages"][0]["arrivalTime"]
                      )}
                    </td>
                    <td
                      className="td-main"
                      style={{
                        fontWeight: "bold",
                        color: subtractDates1(
                          res.shipment["shipmentStages"][0][
                          "departureTime"
                          ],
                          res.shipment["shipmentStages"][0][
                          "gateInTime"
                          ]
                        ) < "0D 5H"
                          ? "#00ff00"
                          : "red",
                      }}
                    >
                      {subtractDates1(
                        res.shipment["shipmentStages"][0][
                        "departureTime"
                        ],
                        res.shipment["shipmentStages"][0]["gateInTime"]
                      )}
                    </td>
                    <td
                      className="td-main"
                      style={{
                        fontWeight: "bold",
                        color: subtractDates1(
                          res.shipment["shipmentStages"][0][
                          "actualActivityStartTime"
                          ],
                          res.shipment["shipmentStages"][0][
                          "gateInTime"
                          ]
                        ) < "0D 6H"
                          ? "#00ff00"
                          : "red",
                      }}
                    >
                      {" "}
                      {subtractDates1(
                        res.shipment["shipmentStages"][0][
                        "actualActivityStartTime"
                        ],
                        res.shipment["shipmentStages"][0]["gateInTime"]
                      )}
                    </td>
                    <td
                      className="td-main"
                      style={{
                        fontWeight: "bold",
                        color: subtractDates1(
                          res.shipment.shipmentStages[0]
                            .actualActivityEndTime,
                          res.shipment.shipmentStages[0]
                            .actualActivityStartTime
                        ) < "0D 6H"
                          ? "#00ff00"
                          : "red",
                      }}
                    >
                      {" "}
                      {subtractDates1(
                        res.shipment.shipmentStages[0]
                          .actualActivityEndTime,
                        res.shipment.shipmentStages[0]
                          .actualActivityStartTime
                      )}
                    </td>
                    <td
                      className="td-main"
                      style={{
                        fontWeight: "bold",
                        color: subtractDates1(
                          res.shipment["shipmentStages"][0][
                          "departureTime"
                          ],
                          res.shipment["shipmentStages"][0][
                          "actualActivityEndTime"
                          ]
                        ) < "0D 6H"
                          ? "#00ff00"
                          : "red",
                      }}
                    >
                      {" "}
                      {subtractDates1(
                        res.shipment["shipmentStages"][0][
                        "departureTime"
                        ],
                        res.shipment["shipmentStages"][0][
                        "actualActivityEndTime"
                        ]
                      )}
                    </td>
                    <td
                      className="td-main"
                      style={{
                        fontWeight: "bold",
                        color: subtractDates1(
                          res.shipment["shipmentStages"][0][
                          "departureTime"
                          ],
                          res.shipment["shipmentStages"][0][
                          "arrivalTime"
                          ]
                        ) < "0D 6H"
                          ? "#00ff00"
                          : "red",
                      }}
                    >
                      {" "}
                      {subtractDates1(
                        res.shipment["shipmentStages"][0][
                        "departureTime"
                        ],
                        res.shipment["shipmentStages"][0]["arrivalTime"]
                      )}
                    </td>
                    <td
                      className="td-main"
                      style={{
                        fontWeight: "bold",
                        color: subtractDates1(
                          res.shipment["shipmentStages"][1][
                          "arrivalTime"
                          ],
                          res.shipment["shipmentStages"][0][
                          "departureTime"
                          ]
                        ) < "0D 5H"
                          ? "#00ff00"
                          : "red",
                      }}
                    >
                      {" "}
                      {subtractDates1(
                        res.shipment["shipmentStages"][1]["arrivalTime"],
                        res.shipment["shipmentStages"][0]["departureTime"]
                      )}
                    </td>
                    <td
                      className="td-main"
                      style={{
                        fontWeight: "bold",
                        color: subtractDates1(
                          res.shipment["shipmentStages"][1][
                          "actualActivityStartTime"
                          ],
                          res.shipment["shipmentStages"][1][
                          "arrivalTime"
                          ]
                        ) < "0D 5H"
                          ? "#00ff00"
                          : "red",
                      }}
                    >
                      {" "}
                      {subtractDates1(
                        res.shipment["shipmentStages"][1][
                        "actualActivityStartTime"
                        ],
                        res.shipment["shipmentStages"][1]["arrivalTime"]
                      )}
                    </td>
                    <td
                      className="td-main"
                      style={{
                        fontWeight: "bold",
                        color: subtractDates1(
                          res.shipment["shipmentStages"][1][
                          "actualActivityEndTime"
                          ],
                          res.shipment["shipmentStages"][1][
                          "actualActivityStartTime"
                          ]
                        ) < "0D 6H"
                          ? "#00ff00"
                          : "red",
                      }}
                    >
                      {" "}
                      {subtractDates1(
                        res.shipment["shipmentStages"][1][
                        "actualActivityEndTime"
                        ],
                        res.shipment["shipmentStages"][1][
                        "actualActivityStartTime"
                        ]
                      )}
                    </td>
                    <td
                      className="td-main"
                      style={{
                        fontWeight: "bold",
                        color: subtractDates1(
                          res.shipment["shipmentStages"][1][
                          "departureTime"
                          ],
                          res.shipment["shipmentStages"][1][
                          "actualActivityEndTime"
                          ]
                        ) < "0D 6H"
                          ? "#00ff00"
                          : "red",
                      }}
                    >
                      {" "}
                      {subtractDates1(
                        res.shipment["shipmentStages"][1][
                        "departureTime"
                        ],
                        res.shipment["shipmentStages"][1][
                        "actualActivityEndTime"
                        ]
                      )}
                    </td>
                    <td
                      className="td-main"
                      style={{
                        fontWeight: "bold",
                        color: subtractDates1(
                          res.shipment["shipmentStages"][1][
                          "departureTime"
                          ],
                          res.shipment["shipmentStages"][1][
                          "arrivalTime"
                          ]
                        ) < "0D 6H"
                          ? "#00ff00"
                          : "red",
                      }}
                    >
                      {" "}
                      {subtractDates1(
                        res.shipment["shipmentStages"][1][
                        "departureTime"
                        ],
                        res.shipment["shipmentStages"][1]["arrivalTime"]
                      )}
                    </td>
                    <td
                      className="td-main"
                      style={{
                        fontWeight: "bold",
                        color: subtractDates1(
                          res.shipment["shipmentStages"][1][
                          "departureTime"
                          ],
                          res.shipment["shipmentStages"][1][
                          "arrivalTime"
                          ]
                        ) < "0D 5H"
                          ? "#00ff00"
                          : "red",
                      }}
                    >
                      {" "}
                      {subtractDates1(
                        res.shipment["shipmentStages"][1][
                        "departureTime"
                        ],
                        res.shipment["shipmentStages"][1]["arrivalTime"]
                      )}
                    </td>
                    <td
                      className="td-main"
                      style={{
                        fontWeight: "bolder",
                        color: res.shipment.consignments[0]?.pod &&
                          res.shipment.consignments[0]?.pod?.status ===
                          "PENDING"
                          ? "red"
                          : res.shipment.consignments[0]?.pod
                            ?.status === "SUBMITTED"
                            ? "#00ff00"
                            : "red",
                      }}
                    >
                      {" "}
                      {res.shipment.consignments[0]?.pod
                        ? res.shipment.consignments[0]?.pod.status
                        : "PENDING"}
                    </td>
                    <td className="td-main">

                      {" "}
                      {todaysdate(
                        res.shipment.shipmentStages[1].departureTime
                      )}
                    </td>
                    <td
                      className="td-main"
                      style={{ lineHeight: "2rem" }}
                    >
                      {" "}
                      <span>
                        {res.shipment.consignments[0]?.pod &&
                          res.shipment.consignments[0]?.pod?.documents ? (
                          <a
                            style={{
                              color: "#ff06ff",
                              fontWeight: "bold",
                            }}
                            href={
                              res.shipment.consignments[0]?.pod
                                ?.documents[0].downloadUrl
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
                        {res.shipment.consignments[0]?.pod &&
                          res.shipment.consignments[0]?.pod?.documents ? (
                          <a
                            style={{
                              color: "#ff06ff",
                              fontWeight: "bold",
                            }}
                            href={
                              res.shipment.consignments[0]?.pod
                                ?.documents[0].downloadUrl
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
                    <td className="td-main">

                      <button
                        className="color-button"
                        style={{
                          backgroundColor:
                            invoice(res.order.customFields)
                              ?
                              "#00ff00" : "red"
                        }}
                      ></button>

                      <button
                        className="color-button"
                        style={{
                          backgroundColor:
                            dis(res.order.customFields)
                              ?
                              "#00ff00" : "red"
                        }}
                      ></button>

                      <button
                        className="color-button"
                        style={{
                          backgroundColor:
                            eway(res.order.customFields)
                              ?
                              "#00ff00" : "red"
                        }}
                      ></button>

                      <button
                        className="color-button"
                        style={{
                          backgroundColor:
                            packinglist(res.order.customFields)
                              ?
                              "#00ff00" : "red"
                        }}
                      ></button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>

      </main>
      )
    }
    
    </>
  );
};

export default Completed;
