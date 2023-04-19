import React, { useEffect } from "react";
import Loader from "./Loader";
import { FaList } from "react-icons/fa";
// import { utils, writeFile } from "xlsx";
// import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchingdata } from "../Redux/fetures/tablesclice";

const PendingOrder = () => {
  const alldata = useSelector((state) => state.app.alldata)
  const loading = useSelector((state) => state.app.loading)

  // testing 
  console.log(alldata, "all data")
  console.log(loading, "loading status")
  const dispatch = useDispatch()

  //  pending status here
  let pendingResponse = [];
  for (let i = 0; i < alldata[0]?.data.data.length; i++) {
    if (
      alldata[0].data.data[i].secondaryStatus === "PARTIALLY_PLANNED" ||
      alldata[0].data.data[i].secondaryStatus === "CREATED"
    ) {
      pendingResponse.push(alldata[0].data.data[i]);
    }
  }

  // excel sheet data
  var datamain = [];
      for (var i = 0; i < alldata[2].data.length; i++) {
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
      // let SheetData=[]
      alldata[1].data.data.map((res) => {
        for (var n = 0; n < datamain.length; n++) {
          if (
            datamain[n].rc_regn_no ===
            res.fleetInfo.vehicle.vehicleRegistrationNumber
          ) {
            main.push(datamain[n]);
          }
          // SheetData.push(main);
        }
      });
      console.log(main, "main");
   
  

  // total vihicles 
  const alltotalvehils = (vls) => {
    let Vehicle = 0;
    for (let i = 0; i < vls?.length; i++) {
      Vehicle++;
    }
    console.log(Vehicle)
    return Vehicle;
  }
  console.log(pendingResponse, "all pending response ")


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
  useEffect(() => {
    dispatch(fetchingdata())
  }, [])
  return (

    <>
    {
  loading ? (<Loader/>):( <main>
    <div className="main_table-export">
      <div className="export">
        <button >
          <h1> EXPORT</h1>
        </button>
      </div>
    </div>
    <div className="main_table-heading">
      <div className="heading">
        <FaList className="heading-icon" style={{ color: "orange" }} />
        <h1>
          PENDING ORDERS <span>{pendingResponse.length}</span>
        </h1>
      </div>
    </div>

    <>
      <table className="main-table" id="excel_table">
        <thead>
          <tr>
            <th className="table-th">order number </th>
            <th className="table-th">Ship To Party</th>
            <th className="table-th">Ship To Address</th>
            <th className="table-th">material</th>
            <th className="table-th">No. of Vehicles</th>
            <th className="table-th">expected Pickup Date </th>
            <th className="table-th">expected DELIVERY Date </th>
            <th className="table-th">Order By </th>
            {/* <th className="table-th">SHPL instructions </th> */}
            <th className="table-th">Apml Remarks </th>
            <th className="table-th">Fit | INC | PUC | NP | PERMIT </th>

          </tr>
        </thead>

        <tbody>

          {
            pendingResponse.map((res) => {
              // console.log(res, "maping response here ")
              return (
                <tr className="tr">

                <td className="td-main">{res.orderNumber}</td>
                <td
                  className="td-main"
                  style={{ color: "rgb(16, 177, 231)" }}
                >
                  {
                    res.customFields
                      .filter((res) => res.fieldKey === "Consignee Name")
                      .map((res) => {
                        return <>{res.value}</>;
                      })}
                </td>
                <td
                  className="td-main"
                  style={{ color: "rgb(16, 177, 231)" }}
                >
                  {res.customFields
                    .filter(
                      (res) => res.fieldKey === "Consignee Address"
                    )
                    .map((res) => {
                      return <>{res.value}</>;
                    })}
                </td>
                <td className="td-main">
                  {res.customFields
                    .filter((res) => res.fieldKey === "MATERIAL")
                    .map((res) => {
                      return <>{res.value}</>;
                    })}
                </td>
                <td className="td-main">
                  {
                    alltotalvehils(res.lineItems)
                  }
                </td>
                <td
                  className="td-main"
                  style={{
                    fontWeight: "bolder",
                    color: "#32bac9"
                  }}
                >
                  {res.customFields
                    .filter(
                      (res) =>
                        res.fieldKey === "expected pickup date and time"
                    )
                    .map((res) => {
                      return <>{res.value}</>;
                    })}
                </td>
                <td
                  className="td-main"

                  style={{ color: "#32bac9", fontWeight: "bold" }}
                >
                  {" "}
                  {res.customFields
                    .filter(
                      (res) =>
                        res.fieldKey === "EXPECTED TARGET DATE:"
                    )
                    .map((res) => {
                      return <>{res.value}</>;
                    })}
                </td>
                <td className="td-main">
                  {res.customFields
                    .filter(
                      (res) =>
                        res.fieldKey === "Order By"
                    )
                    .map((res) => {
                      return <>{res.value}</>;
                    })}
                </td>

                {/* <td className="td-main" style={{ color: "red" }}>
                  {res.customFields
                    .filter(
                      (res) => res.fieldKey === "SHPL instructions"
                    )
                    .map((res) => {
                      return <>{res.value ? (res.value ): ("--")}</>;
                    })}
                </td> */}
                <td className="td-main">
                
                {res.customFields
                    .filter(
                      (res) => res.fieldKey === "APML Remarks"
                    )
                    .map((res) => {
                      return <>{res.value ? (res.value ): ("--")}</>;
                    })}
                </td>
                <td className="td-main">
                  <button
                    className="color-button"
                    style={{
                      backgroundColor: "red",
                    }}
                  ></button>

                  <button
                    className="color-button"
                    style={{
                      backgroundColor: "red",
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
                      backgroundColor:  color(main)
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

  </main>)
}
     
    </>
  );
};

export default PendingOrder;
