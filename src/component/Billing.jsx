
import { useState, useEffect } from "react";

import Loader from "./Loader";
import { RiBilliardsFill } from "react-icons/ri";
import { billing } from "../common/tablevariabls";
import { WorkBook, WorkSheet, utils, writeFile } from "xlsx";
// import { useNavigate } from "react-router-dom";
import { fetchingdata } from "../Redux/fetures/tablesclice";
import { useDispatch, useSelector } from "react-redux";

function Billing() {
  const dispatch = useDispatch();
  const alldata = useSelector((state) => state.app.alldata)
  const loading = useSelector((state) => state.app.loading)

  let pendingResponse = [];
  for (let i = 0; i < alldata[1]?.data.data.length; i++) {
    if (alldata[1].data.data[i].shipmentStatus === "Completed") {
      pendingResponse.push(alldata[1].data.data[i]);
    }
  }

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


  useEffect(() => {
    dispatch(fetchingdata())
  }, [])

  // export function
  const exportExcelFile = () => {
    const element = document.getElementById("excel_table");
    let ws = utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    let wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Sheet1");
    /* save to file */
    writeFile(wb, "Billing.xlsx");
  };

  function poname(a) {
    var abc;
    for (let i = 0; i < a.length; i++) {
      if (a[i]["fieldKey"] === "PO NAME") {
        abc = a[i]["value"];
        break;
      } else if (!a[i]["fieldKey"]) {
        abc = "--";
      } else {
        abc = "--";
      }
    }
    return abc;
  }
  function podate(a) {
    var abc;
    for (let i = 0; i < a.length; i++) {
      if (a[i]["fieldKey"] === "PO DATE") {
        abc = a[i]["value"];
        break;
      } else if (!a[i]["fieldKey"]) {
        abc = "--";
      } else {
        abc = "--";
      }
    }
    return abc;
  }

  function typeoftrip(a) {
    var abc;
    for (let i = 0; i < a.length; i++) {
      if (a[i]["fieldKey"] === "Type of Trip") {
        abc = a[i]["value"];
        break;
      } else if (!a[i]["fieldKey"]) {
        abc = "--";
      } else {
        abc = "--";
      }
    }
    return abc;
  }

  function pincode(a) {
    var abc;
    for (let i = 0; i < a.length; i++) {
      if (a[i]["fieldKey"] === "PINCODE") {
        abc = a[i]["value"];
        break;
      } else if (!a[i]["fieldKey"]) {
        abc = "--";
      } else {
        abc = "--";
      }
    }
    return abc;
  }

  function billnumber(a) {
    var abc;
    for (let i = 0; i < a.length; i++) {
      if (a[i]["fieldKey"] === "BILL NUMBER") {
        abc = a[i]["value"];
        break;
      } else if (!a[i]["fieldKey"]) {
        abc = "--";
      } else {
        abc = "--";
      }
    }
    return abc;
  }

  function billdate(a) {
    var abc;
    for (let i = 0; i < a.length; i++) {
      if (a[i]["fieldKey"] === "BILL DATE") {
        abc = a[i]["value"];
        break;
      } else if (!a[i]["fieldKey"]) {
        abc = "--";
      } else {
        abc = "--";
      }
    }
    return abc;
  }

  function billsuborgenr(a) {
    var abc;
    for (let i = 0; i < a.length; i++) {
      if (a[i]["fieldKey"] === "BILL SUBMITED OR GENR.") {
        abc = a[i]["value"];
        break;
      } else if (!a[i]["fieldKey"]) {
        abc = "--";
      } else {
        abc = "--";
      }
    }
    return abc;
  }

  function grmnumber(a) {
    var abc;
    for (let i = 0; i < a.length; i++) {
      if (a[i]["fieldKey"] === "GRM NUMBER") {
        abc = a[i]["value"];
        break;
      } else if (!a[i]["fieldKey"]) {
        abc = "--";
      } else {
        abc = "--";
      }
    }
    return abc;
  }

  function grndate(a) {
    var abc;
    for (let i = 0; i < a.length; i++) {
      if (a[i]["fieldKey"] === "grn date") {
        abc = a[i]["value"];
        break;
      } else if (!a[i]["fieldKey"]) {
        abc = "--";
      } else {
        abc = "--";
      }
    }
    return abc;
  }

  function totaldistance(a) {
    var abc;
    for (let i = 0; i < a.length; i++) {
      if (a[i]["fieldKey"] === "TOTAL DISTANCE") {
        abc = a[i]["value"];
        break;
      } else if (!a[i]["fieldKey"]) {
        abc = "--";
      } else {
        abc = "--";
      }
    }
    return abc;
  }

  function additionaldistance(a) {
    var abc;
    for (let i = 0; i < a.length; i++) {
      if (a[i]["fieldKey"] === "ADDITIONAL DISTANCE") {
        abc = a[i]["value"];
        break;
      } else if (!a[i]["fieldKey"]) {
        abc = "--";
      } else {
        abc = "--";
      }
    }
    return abc;
  }

  function zone(a) {
    var abc;
    for (let i = 0; i < a.length; i++) {
      if (a[i]["fieldKey"] === "ZONE") {
        abc = a[i]["value"];
        break;
      } else if (!a[i]["fieldKey"]) {
        abc = "--";
      } else {
        abc = "--";
      }
    }
    return abc;
  }

  function rate(a) {
    var abc;
    for (let i = 0; i < a.length; i++) {
      if (a[i]["fieldKey"] === "RATE") {
        abc = a[i]["value"];
        break;
      } else if (!a[i]["fieldKey"]) {
        abc = "--";
      } else {
        abc = "--";
      }
    }
    return abc;
  }

  function load(a) {
    var abc;
    for (let i = 0; i < a.length; i++) {
      if (a[i]["fieldKey"] === "LOADING") {
        abc = a[i]["value"];
        break;
      } else if (!a[i]["fieldKey"]) {
        abc = "--";
      } else {
        abc = "--";
      }
    }
    return abc;
  }

  function unloading(a) {
    var abc;
    for (let i = 0; i < a.length; i++) {
      if (a[i]["fieldKey"] === "UNLOADING") {
        abc = a[i]["value"];
        break;
      } else if (!a[i]["fieldKey"]) {
        abc = "--";
      } else {
        abc = "--";
      }
    }
    return abc;
  }

  function haltingcharger(a) {
    var abc;
    for (let i = 0; i < a.length; i++) {
      if (a[i]["fieldKey"] === "HALTING CHARGER") {
        abc = a[i]["value"];
        break;
      } else if (!a[i]["fieldKey"]) {
        abc = "--";
      } else {
        abc = "--";
      }
    }
    return abc;
  }

  function twopointlounlo(a) {
    var abc;
    for (let i = 0; i < a.length; i++) {
      if (a[i]["fieldKey"] === "TWO POINT LOADING /UNLOADING") {
        abc = a[i]["value"];
        break;
      } else if (!a[i]["fieldKey"]) {
        abc = "--";
      } else {
        abc = "--";
      }
    }
    return abc;
  }

  function status(a) {
    var abc;
    var def;
    var twopoilounlos;
    var halt;
    var ghi;

    for (let i = 0; i < a.length; i++) {
      if (a[i]["fieldKey"] === "HALTING CHARGER") {
        def = a[i]["value"];
        break;
      } else if (!a[i]["fieldKey"]) {
        def = "--";
      } else {
        def = "--";
      }
    }
    halt = def;

    for (let i = 0; i < a.length; i++) {
      if (a[i]["fieldKey"] === "TWO POINT LOADING /UNLOADING") {
        abc = a[i]["value"];
        break;
      } else if (!a[i]["fieldKey"]) {
        abc = "--";
      } else {
        abc = "--";
      }
    }
    twopoilounlos = abc;

    if (halt === null && twopoilounlos === null) {
      ghi = "PENDING";
    } else if (halt === "0" && twopoilounlos === "0") {
      ghi = "APPROVED";
    } else {
      ghi = "--";
    }
    return ghi;
  }

  function additionalcost(a) {
    var abc;
    for (let i = 0; i < a.length; i++) {
      if (a[i]["fieldKey"] === "ADDITIONAL COST") {
        abc = a[i]["value"];
        break;
      } else if (!a[i]["fieldKey"]) {
        abc = "--";
      } else {
        abc = "--";
      }
    }
    return abc;
  }

  function taxablevalue(a) {
    var abc;
    for (let i = 0; i < a.length; i++) {
      if (a[i]["fieldKey"] === "TAXABLE VALUE") {
        abc = a[i]["value"];
        break;
      } else if (!a[i]["fieldKey"]) {
        abc = "--";
      } else {
        abc = "--";
      }
    }
    return abc;
  }

  function gst(a) {
    var abc;
    for (let i = 0; i < a.length; i++) {
      if (a[i]["fieldKey"] === "GST") {
        abc = a[i]["value"];
        break;
      } else if (!a[i]["fieldKey"]) {
        abc = "--";
      } else {
        abc = "--";
      }
    }
    return abc;
  }

  function grandtotal(a) {
    var abc;
    for (let i = 0; i < a.length; i++) {
      if (a[i]["fieldKey"] === "GRAND TOTAL") {
        abc = a[i]["value"];
        break;
      } else if (!a[i]["fieldKey"]) {
        abc = "--";
      } else {
        abc = "--";
      }
    }
    return abc;
  }

  function remark(a) {
    var abc;
    for (let i = 0; i < a.length; i++) {
      if (a[i]["fieldKey"] === "REMARKS") {
        abc = a[i]["value"];
        break;
      } else if (!a[i]["fieldKey"]) {
        abc = "--";
      } else {
        abc = "--";
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



  return (
    <>
      {
        loading ? (<Loader />) : (<main>
          <div className="main_table-export">
            <div className="export">
              <button onClick={exportExcelFile}>
                <h1> EXPORT</h1>
              </button>
            </div>
          </div>
          <div className="main_table-heading">
            <div className="heading">
              <RiBilliardsFill
                className="heading-icon"
                style={{ color: "orange" }}
              />
              <h1>
                BILLING <span>{combo.length}</span>
              </h1>
            </div>
          </div>

          <>
            {" "}
            <table className="main-table" id="excel_table">
              <thead>
                <tr>
                  {billing.map((res) => {
                    return (
                      <th className="table-th">{res}</th>
                    )
                  })
                  }

                </tr>
              </thead>
              <tbody>

                {combo.map((res) => {
                  return (
                    <tr>
                      <td className="td-main">
                        {res.shipment.consignments[0].consignmentNo}
                      </td>
                      <td className="td-main">
                        {res.order.customFields
                          .filter((res) => res.fieldKey === "S.O Number/PO")
                          .map((res) => {
                            return <>{res.value}</>;
                          })}
                      </td>
                      <td className="td-main">
                        {res.order.customFields
                          .filter((res) => res.fieldKey === "WBS/COST")
                          .map((res) => {
                            return <>{res.value}</>;
                          })}
                      </td>
                      <td className="td-main">
                        {res.order.customFields
                          .filter((res) => res.fieldKey === "Order By")
                          .map((res) => {
                            return <>{res.value}</>;
                          })}
                      </td>
                      <td className="td-main">
                        {poname(res.shipment.consignments[0].customFields)
                          ? poname(res.shipment.consignments[0].customFields)
                          : "--"}
                      </td>
                      <td className="td-main">
                        {podate(res.shipment.consignments[0].customFields)
                          ? podate(res.shipment.consignments[0].customFields)
                          : "--"}
                      </td>
                      <td className="td-main">
                        {typeoftrip(res.shipment.consignments[0].customFields)
                          ? typeoftrip(
                            res.shipment.consignments[0].customFields
                          )
                          : "--"}
                      </td>
                      <td className="td-main">
                        {" "}
                        {
                          res.shipment.consignments[0].consigner.name.split(
                            "-"
                          )[1]
                        }
                      </td>
                      <td className="td-main">
                        {res.shipment.consignments[0].consignee.name}
                      </td>
                      <td className="td-main">
                        {pincode(res.shipment.consignments[0].customFields)
                          ? pincode(res.shipment.consignments[0].customFields)
                          : "--"}
                      </td>
                      <td className="td-main">
                        {res.order.customFields
                          .filter((res) => res.fieldKey === "MATERIAL")
                          .map((res) => {
                            return <>{res.value}</>;
                          })}
                      </td>
                      <td className="td-main">
                        {billnumber(res.shipment.consignments[0].customFields)
                          ? billnumber(
                            res.shipment.consignments[0].customFields
                          )
                          : "--"}
                      </td>
                      <td className="td-main">
                        {billdate(res.shipment.consignments[0].customFields)
                          ? billdate(res.shipment.consignments[0].customFields)
                          : "--"}
                      </td>
                      <td className="td-main">
                        {billsuborgenr(
                          res.shipment.consignments[0].customFields
                        )
                          ? billsuborgenr(
                            res.shipment.consignments[0].customFields
                          )
                          : "--"}
                      </td>
                      <td className="td-main">
                        {grmnumber(res.shipment.consignments[0].customFields)
                          ? grmnumber(res.shipment.consignments[0].customFields)
                          : "--"}
                      </td>
                      <td className="td-main">
                        {grndate(res.shipment.consignments[0].customFields)
                          ? grndate(res.shipment.consignments[0].customFields)
                          : "--"}
                      </td>
                      <td className="td-main">
                        {totaldistance(
                          res.shipment.consignments[0].customFields
                        )
                          ? totaldistance(
                            res.shipment.consignments[0].customFields
                          )
                          : "--"}
                      </td>
                      <td className="td-main">
                        {additionaldistance(
                          res.shipment.consignments[0].customFields
                        )
                          ? additionaldistance(
                            res.shipment.consignments[0].customFields
                          )
                          : "--"}
                      </td>
                      <td className="td-main">
                        {zone(res.shipment.consignments[0].customFields)
                          ? zone(res.shipment.consignments[0].customFields)
                          : "--"}
                      </td>
                      <td className="td-main">
                        {rate(res.shipment.consignments[0].customFields)
                          ? rate(res.shipment.consignments[0].customFields)
                          : "--"}
                      </td>
                      <td className="td-main">
                        {load(res.shipment.consignments[0].customFields)
                          ? load(res.shipment.consignments[0].customFields)
                          : "--"}
                      </td>
                      <td className="td-main">
                        {unloading(res.shipment.consignments[0].customFields)
                          ? unloading(res.shipment.consignments[0].customFields)
                          : "--"}
                      </td>
                      <td className="td-main">
                        {haltingcharger(
                          res.shipment.consignments[0].customFields
                        )
                          ? haltingcharger(
                            res.shipment.consignments[0].customFields
                          )
                          : "--"}
                      </td>
                      <td className="td-main">
                        {twopointlounlo(
                          res.shipment.consignments[0].customFields
                        )
                          ? twopointlounlo(
                            res.shipment.consignments[0].customFields
                          )
                          : "--"}
                      </td>
                      <td
                        className="td-main"
                        style={{
                          fontWeight: "bolder",
                          color:
                            status(
                              res.shipment.consignments[0].customFields
                            ) === "PENDING"
                              ? "red"
                              : status(
                                res.shipment.consignments[0].customFields
                              ) === "APPROVED" ? "#00ff00" : "",
                        }}
                      >
                        {status(res.shipment.consignments[0].customFields)}
                      </td>
                      <td className="td-main">
                        {additionalcost(
                          res.shipment.consignments[0].customFields
                        )
                          ? additionalcost(
                            res.shipment.consignments[0].customFields
                          )
                          : "--"}
                      </td>
                      <td className="td-main">
                        {taxablevalue(res.shipment.consignments[0].customFields)
                          ? taxablevalue(
                            res.shipment.consignments[0].customFields
                          )
                          : "--"}
                      </td>
                      <td className="td-main">
                        {gst(res.shipment.consignments[0].customFields)
                          ? gst(res.shipment.consignments[0].customFields)
                          : "--"}
                      </td>
                      <td className="td-main">
                        {grandtotal(res.shipment.consignments[0].customFields)
                          ? grandtotal(
                            res.shipment.consignments[0].customFields
                          )
                          : "--"}
                      </td>
                      <td className="td-main">
                        {remark(res.shipment.consignments[0].customFields)
                          ? remark(res.shipment.consignments[0].customFields)
                          : "--"}
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
                  );
                })}
              </tbody>
            </table>
          </>

        </main>)
      }

    </>
  );
}

export default Billing;
