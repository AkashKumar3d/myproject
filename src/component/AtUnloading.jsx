import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import { MdFireTruck } from "react-icons/md";
import { Atunloading } from "../common/tablevariabls";
import {  utils, writeFile } from "xlsx";
// import { useNavigate } from "react-router-dom";
import { fetchingdata} from "../Redux/fetures/tablesclice";
import { useDispatch, useSelector } from "react-redux";
const AtUnloading = () => {
  const alldata = useSelector((state) => state.app.alldata)
  const loading = useSelector((state) => state.app.loading)
  const dispatch=useDispatch()
  //testing 
  console.log(alldata, "all data")
  console.log(loading, "loading")

  let pendingResponse = [];
  for (let i = 0; i < alldata[1]?.data.data.length; i++) {
    if (
      alldata[1].data.data[i].shipmentTrackingStatus === "At Delivery Point"
    ) {
      pendingResponse.push(alldata[1].data.data[i]);
    }
  }

  console.log(pendingResponse, "pd res")

  const pink = [];
  pendingResponse.map((res) => {
    console.log(alldata[0].data.data[0]?.lineItems[0].freightUnitLineItemIds[0], "freight item id")
    for (let i = 0; i < alldata[0]?.data.data.length; i++) {
      if (
        res.freightUnitLineItemId ===
        alldata[0].data.data[i]?.lineItems[0]
          ?.freightUnitLineItemIds[0] ||
        res.freightUnitLineItemId ===
        alldata[0].data.data[i]?.lineItems[1]
          ?.freightUnitLineItemIds[0] ||
        res.freightUnitLineItemId ===
        alldata[0].data.data[i]?.lineItems[2]
          ?.freightUnitLineItemIds[0] ||
        res.freightUnitLineItemId ===
        alldata[0].data.data[i]?.lineItems[3]?.freightUnitLineItemIds[0]
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

  console.log(combo, "combo")

  var datamain = [];
  for (var i = 0; i < alldata[2]?.data.length; i++) {
    if (
      alldata[2].data[i]?.rc_regn_no !== "" &&
      alldata[2].data[i]?.rc_regn_no !== "#N/A" &&
      alldata[2].data[i]?.rc_regn_no !== "Vehicle Number"
    ) {
      var obj = {
        rc_fit_upto: alldata[2].data[i].rc_fit_upto,
        rc_regn_no: alldata[2].data[i]?.rc_regn_no,
        rc_insurance_upto: alldata[2].data[i]?.rc_insurance_upto,
        rc_pucc_upto: alldata[2].data[i]?.rc_pucc_upto,
        rc_np_upto: alldata[2].data[i]?.rc_np_upto,
        rc_permit_valid_upto: alldata[2].data[i]?.rc_permit_valid_upto,
      };
      datamain.push(obj);
    }
  }


  var main = [];
  alldata[1].data.data.map((res) => {
    for (var n = 0; n < datamain.length; n++) {
      if (
        datamain[n].rc_regn_no ===
        res.fleetInfo.vehicle.vehicleRegistrationNumber
      ) {
        main.push(datamain[n]);
      }
    }
  });



  console.log(combo, "at unloadin")

  function atvsnow(a) {
    const millis = new Date().getTime();
    const difference = millis - a;
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const re = `${days}D ${hours}H ${minutes}M`;
    return re.toString();
  }

  function subtractDates1(date1, date2) {
    const difference = date1 - date2;
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const re = `${days} days ${hours} hours ${minutes} minutes`;
    return re.toString();
  }

  function status_color(a) {
    if (a != null) {
      return true;
    } else {
      return false;
    }
  }
  // export functon
  const exportExcelFile = () => {
    const element = document.getElementById("excel_table");
    let ws = utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    let wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Sheet1");
    /* save to file */
    writeFile(wb, "sample.xlsx");
  };

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

  function color(a) {
    for (let i = 0; i < main.length; i++) {
      let fit = a[i].rc_fit_upto;
      let inc = a[i].rc_insurance_upto;
      let puc = a[i].rc_pucc_upto;
      let np = a[i].rc_np_upto;
      let permit = a[i].rc_permit_valid_upto;

      if (fit.rc_fit_upto) {
        return false;
      } else if (inc.rc_insurance_upto) {
        return false;
      } else if (puc.rc_pucc_upto) {
        return false;
      } else if (np.rc_np_upto) {
        return false;
      } else if (permit.rc_permit_valid_upto) {
        return false;
      } else {
        return true;
      }
    }
  }
  useEffect(()=>{
dispatch(fetchingdata())
  },[])
  return (

    <>
      {
        loading ? (<Loader />) : (
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
                  AT UNLOADING <span>{combo.length}</span>
                </h1>
              </div>
            </div>

            <>
              <table className="main-table" id="excel_table">
                <thead>
                  <tr>
                    {
                      Atunloading.map((res) => {
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
                          <td className="td-main">   {" "}
                            {
                              res.shipment.fleetInfo.vehicle
                                .vehicleRegistrationNumber
                            }</td>
                          <td className="td-main">
                            {" "}
                            {res.order.lineItems[0].consigner.name.split("-")[1]}
                          </td>
                          <td
                            className="td-main"
                            style={{
                              fontWeight: "bolder",
                              color: "rgb(16, 177, 231)",
                            }}
                          >
                            {" "}
                            {res.order.lineItems[0].consignee.name
                              ? res.order.lineItems[0].consignee.name
                              : "no name"}
                          </td>
                          <td className="td-main">
                            {res.order.customFields
                              .filter((res) => res.fieldKey === "MATERIAL")
                              .map((res) => {
                                return <>{res.value}</>;
                              })}
                          </td>
                          <td className="td-main">created</td>
                          <td
                            className="td-main"
                            style={{
                              fontWeight: "bolder",
                              color: differentdate(res.value) > 86400000
                                ? "#00ff00"
                                : differentdate(res.value) > 21600000 &&
                                  differentdate(res.value) < 86400000
                                  ? "yellow"
                                  : differentdate(res.value) > 0 &&
                                    differentdate(res.value) < 21600000
                                    ? "orange"
                                    : "red",
                            }}
                          >
                            {res.order.customFields
                              .filter(
                                (res) =>
                                  res.fieldKey === "expected pickup date and time"
                              )
                              .map((res) => {
                                return <>{differentdate(res.value)}</>;
                              })}
                          </td>
                          <td
                            className="td-main"
                            style={{ fontWeight: "bolder", color: "red" }}
                          >
                            {res.order.customFields
                              .filter(
                                (res) => res.fieldKey === "SHPL instructions"
                              )
                              .map((res) => {
                                return <>{res.value}</>;
                              })}
                          </td>
                          <td className="td-main">
                            {res.order.customFields
                              .filter((res) => res.fieldKey === "APML Remarks")
                              .map((res) => {
                                return <>{res.value ? res.value : "--"}</>;
                              })}
                          </td>
                          <td className="td-main">
                            <button
                              className="color-button hovertext1"
                              data-hover="Arrival Time"
                              style={{
                                backgroundColor: status_color(
                                  res.shipment.shipmentStages[1].arrivalTime
                                )
                                  ? "green"
                                  : "red",
                              }}
                            >
                              .
                            </button>
                            <button
                              className="color-button hovertext1"
                              data-hover="Get In Time"
                              style={{
                                backgroundColor: status_color(
                                  res.shipment.shipmentStages[1].arrivalTime
                                )
                                  ? "green"
                                  : "red",
                              }}
                            >
                              .
                            </button>
                            <button
                              className="color-button hovertext2"
                              data-hover="Actual Activity Load Start"
                              style={{
                                backgroundColor: status_color(
                                  res.shipment.shipmentStages[1].arrivalTime
                                )
                                  ? "green"
                                  : "red",
                              }}
                            >
                              .
                            </button>
                            <button
                              className="color-button hovertext2"
                              data-hover="Actual Activity Load End"
                              style={{
                                backgroundColor: status_color(
                                  res.shipment.shipmentStages[1].arrivalTime
                                )
                                  ? "green"
                                  : "red",
                              }}
                            >
                              .
                            </button>
                          </td>
                          <td
                            className="td-main"
                            style={{
                              fontWeight: "bolder",
                              color: atvsnow(
                                res.shipment.shipmentStages[1].arrivalTime
                              )
                                ? "#00ff00"
                                : "red",

                            }}
                          >
                            {" "}
                            {atvsnow(res.shipment.shipmentStages[1].arrivalTime)}
                          </td>
                          <td className="td-main">
                            {" "}
                            {subtractDates1(
                              res.shipment.shipmentStages[1].gateInTime,
                              res.shipment.shipmentStages[1].arrivalTime
                            ) < "0 days 0 hours 0 minutes"
                              ? "-"
                              : subtractDates1(
                                res.shipment.shipmentStages[1].gateInTime,
                                res.shipment.shipmentStages[1].arrivalTime
                              )}
                          </td>
                          <td className="td-main">
                            {" "}
                            {subtractDates1(
                              res.shipment.shipmentStages[1]
                                .actualActivityStartTime,
                              res.shipment.shipmentStages[1].gateInTime
                            ) <= "0 days 0 hours 0 minutes"
                              ? "-"
                              : subtractDates1(
                                res.shipment.shipmentStages[1]
                                  .actualActivityStartTime,
                                res.shipment.shipmentStages[1].gateInTime
                              )}
                          </td>
                          <td className="td-main">
                            {" "}
                            {subtractDates1(
                              res.shipment.shipmentStages[1]
                                .actualActivityEndTime,
                              res.shipment.shipmentStages[1]
                                .actualActivityStartTime
                            ) <= "0 days 0 hours 0 minutes"
                              ? "-"
                              : subtractDates1(
                                res.shipment.shipmentStages[1]
                                  .actualActivityEndTime,
                                res.shipment.shipmentStages[1]
                                  .actualActivityStartTime
                              )}
                          </td>
                          <td className="td-main">
                            <button
                              className="color-button"
                              style={{
                                backgroundColor: color(main)
                                  ? "#00ff00"
                                  : "red",
                              }}
                            ></button>

                            <button
                              className="color-button"
                              style={{
                                backgroundColor: color(main)
                                  ? "#00ff00"
                                  : "red",
                              }}
                            ></button>
                            <button
                              className="color-button"
                              style={{
                                backgroundColor: color(main)
                                  ? "#00ff00"
                                  : "red",
                              }}
                            ></button>
                            <button
                              className="color-button"
                              style={{
                                backgroundColor: color(main)
                                  ? "#00ff00"
                                  : "red",
                              }}
                            ></button>
                            <button
                              className="color-button"
                              style={{
                                backgroundColor: color(main)
                                  ? "#00ff00"
                                  : "red",
                              }}
                            ></button>
                          </td>
                        </tr>
                      )
                    })
                  }


                </tbody>
              </table>
            </>
          </main>
        )
      }

    </>
  );
};

export default AtUnloading;
