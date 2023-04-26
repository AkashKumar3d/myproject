import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { FaTruckPickup } from "react-icons/fa";
import { enroute_for_pickup } from "../common/tablevariabls";
// import { WorkBook, WorkSheet, utils, writeFile } from "xlsx";
// import { useNavigate } from "react-router-dom";
import { WorkBook, WorkSheet, utils, writeFile } from "xlsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchingdata } from "../Redux/fetures/tablesclice";
const EnrouteForPickup = () => {
  const alldata = useSelector((state) => state.app.alldata);
  const loading = useSelector((state) => state.app.loading);
  const dispatch = useDispatch()
  // console.log(alldata, "alldata enroute");
  // console.log(loading, "loader enroute")

  // enroute data  here 
  let enrouteforpicup = []
  for (let i = 0; i < alldata[1]?.data.data.length; i++) {
    if (alldata[1].data.data[i].shipmentTrackingStatus ===
      "Enroute For Pickup") {
      enrouteforpicup.push(alldata[1].data.data[i])
    }
  }
  console.log(enrouteforpicup, "enroute_for_pickup")

  // pending response 
  const pink = [];
  enrouteforpicup.map((res) => {
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
      }
    }
  });


  let combo = []
  pink.map((res) => {
    if (res.shipment) {
      combo.push(res);
    }
  });

  console.log(combo, "combo data")

  // excel sheet data
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
  alldata[1]?.data.data.map((res) => {
    for (var n = 0; n < datamain.length; n++) {
      if (
        datamain[n].rc_regn_no ===
        res.fleetInfo.vehicle.vehicleRegistrationNumber
      ) {
        main.push(datamain[n]);
      }
    }
  });
  console.log(main, "main");

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

  // export function
  const exportExcelFile = () => {
    const element = document.getElementById("excel_table");
    let ws = utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    console.log(ws, "expost data")
    let wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Sheet1");
    /* save to file */
    writeFile(wb, "Enroute_for_pickup.xlsx");
  };

  // useeffect here 
  useEffect(() => {
    dispatch(fetchingdata())
  }, [])
  return (
    <>
      {loading ? (<Loader />) : (
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
              <FaTruckPickup
                className="heading-icon"
                style={{ color: "orange" }}
              />
              <h1>
                ENROUTE FOR PICKUP <span>{enrouteforpicup.length}</span>
              </h1>
            </div>
          </div>


          <table id="excel_table">
            <thead>
              <tr>
                {
                  enroute_for_pickup.map((res) => {
                    return (<th className="table-th">{res}</th>)
                  })
                }

              </tr>
            </thead>
            <tbody>
              {
                combo.map((res) => {
                  return (

                    <tr>
                      <td className="td-main">
                        {res.order.orderNumber}
                      </td>
                      <td className="td-main">
                        {
                          res.shipment.fleetInfo.vehicle
                            .vehicleRegistrationNumber
                        }
                      </td>

                      <td className="td-main">
                        {res.order.customFields
                          .filter((res) => res.fieldKey === "Consignee Name")
                          .map((res) => {
                            return <>{res.value ? res.value : "--"}</>;
                          })}
                      </td>
                      <td className="td-main">
                        {res.order.customFields
                          .filter(
                            (res) => res.fieldKey === "Consignee Address"
                          )
                          .map((res) => {
                            return <>{res.value ? res.value : "--"}</>;
                          })}
                      </td>
                      <td className="td-main">
                        {res.order.customFields
                          .filter((res) => res.fieldKey === "MATERIAL")
                          .map((res) => {
                            return <>{res.value ? res.value : "--"}</>;
                          })}

                      </td>
                      <td className="td-main">
                        {
                          res.shipment.fleetInfo.vehicle.vehicleLoadType.name
                        }
                      </td>
                      <td
                        className="td-main"
                        style={{
                          color: differentdate(res.value) > 86400000
                            ? "#00ff00"
                            : differentdate(res.value) > 21600000 &&
                              differentdate(res.value) < 86400000
                              ? "yellow"
                              : differentdate(res.value) > 0 &&
                                differentdate(res.value) < 21600000
                                ? "orange"
                                : "red", fontWeight: "bold"
                        }}
                      >
                        {
                          res.order.customFields.filter((res) => res.fieldKey === "expected pickup date and time").map((res) => {
                            return <>{differentdate(res.value ? res.value : "--")}</>
                          })

                        }

                      </td>
                      <td
                        className="td-main"
                        style={{
                          color: differentdate(res.value) > 86400000
                            ? "#00ff00"
                            : differentdate(res.value) > 21600000 &&
                              differentdate(res.value) < 86400000
                              ? "yellow"
                              : differentdate(res.value) > 0 &&
                                differentdate(res.value) < 21600000
                                ? "orange"
                                : "red", fontWeight: "bold"
                        }}
                      >
                        {
                          res.order.customFields.filter((res) => res.fieldKey === "EXPECTED TARGET DATE:").map((res) => {
                            return <>{differentdate(res.value ? res.value : "--")}</>
                          })

                        }
                      </td>
                      <td
                        className="td-main"
                        style={{ color: "rgb(212, 41, 41)" }}
                      >
                        shpl instructions
                      </td>
                      <td
                        className="td-main"
                        style={{ color: "rgb(247, 3, 145)" }}
                      >
                        {
                          res.order.customFields.filter((res) => res.fieldKey === "APML Remarks").map((res) => {
                            return <>{res.value ? res.value : "--"}</>
                          })

                        }
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
                            backgroundColor: "red"
                          }}
                        ></button>
                        <button
                          className="color-button"
                          style={{
                            backgroundColor: color(main) ? "#00ff00"
                              : "red",
                          }}
                        ></button>
                        <button
                          className="color-button"
                          style={{
                            backgroundColor: color(main) ? "#00ff00"
                              : "red",
                          }}
                        ></button>
                        <button
                          className="color-button"
                          style={{
                            backgroundColor: color(main) ? "#00ff00"
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
        </main>
      )}
    </>
  );
};

export default EnrouteForPickup;
