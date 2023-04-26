import { useState, useEffect } from "react";
import Loader from "./Loader";
import { MdOutlinePayment } from "react-icons/md";
import { utils, writeFile } from "xlsx";
// import { useNavigate } from "react-router-dom";
import { fetchingdata } from "../Redux/fetures/tablesclice";
import { useDispatch, useSelector } from "react-redux";
import { payment } from "../common/tablevariabls";
const Payment = () => {
  const dispatch = useDispatch();
  const alldata = useSelector((state) => state.app.alldata)
  const loading = useSelector((state) => state.app.loading)
  // console.log(alldata[1].data.data, "all data")
  let pendingstatus = [];
  for (let i = 0; i < alldata[1]?.data.data.length; i++) {
    
    pendingstatus.push(alldata[1].data.data)
  }
 


  console.log(pendingstatus, "pending status")


  useEffect(() => {
    dispatch(fetchingdata())
  }, [])
  function subtractDates1(date1, date2) {
    const difference = date1 - date2;
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const re = `${days}D ${hours}H`;
    return re.toString();
  }

  // export file 
  const exportExcelFile = () => {
    const element = document.getElementById("excel_table");
    let ws = utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    let wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Sheet1");
    /* save to file */
    writeFile(wb, "Payment.xlsx");
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

  return (
    <>
      {
        loading ? (<Loader />) : (
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
                <MdOutlinePayment
                  className="heading-icon"
                  style={{ color: "orange" }}
                />
                <h1>
                  PAYMENT <span>{pendingstatus[0].length}</span>
                </h1>
              </div>
            </div>

            <>
              {" "}
              <table className="main-table" id="excel_table">
                <thead>
                  <tr>
                    {
                      payment.map((res)=>{
                        return (
                          <th className="table-th">{res}</th>
                        )
                      })
                    }
                  </tr>
                </thead>
                <tbody>
                  {pendingstatus[0].map((res) => {
                     console.log(res)
                    return (
                      <tr>
                        <td className="td-main">
                          {res.fleetInfo.vehicle.vehicleRegistrationNumber}
                        </td>
                        <td className="td-main">
                          {
                            res.fleetInfo.vehicle.vehicleLoadType.vehicleType
                            
                          }
                        </td>
                        <td className="td-main">
                          {res.consignments[0].consigner.name}
                        </td>
                        <td className="td-main">
                          {res.consignments[0].consignee.name}
                        </td>
                        <td className="td-main">
                          {differentdate(res.shipmentStages.arrivalTime)}
                        </td>
                        <td className="td-main">
                          {" "}
                          {subtractDates1(
                            res.shipmentStages.gateInTime,
                            res.shipmentStages.arrivalTime
                          )}
                        </td>
                        <td className="td-main">
                          {" "}
                          {subtractDates1(
                            res.shipmentStages.departureTime,
                            res.shipmentStages.gateInTime
                          ) > "-1 days 0 hours 0 minutes"
                            ? subtractDates1(
                              res.shipmentStages.departureTime,
                              res.shipmentStages.gateInTime
                            )
                            : ""}
                        </td>
                        <td className="td-main">
                          {res.shipmentStages[0].tripPoint.remainingDistance
                            ? res.shipmentStages[0].tripPoint.remainingDistance
                            : "--"}
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

export default Payment;
