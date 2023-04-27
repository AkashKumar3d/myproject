import React, { useState, useEffect } from "react";
import L from "leaflet";
import Loader from "./Loader";
import { TbTruckDelivery } from "react-icons/tb";
import { intransit } from "../common/tablevariabls";
import { utils, writeFile } from "xlsx";
// import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchingdata } from "../Redux/fetures/tablesclice";

const Intransit = () => {
  const alldata = useSelector((state) => state.app.alldata)
  const loading = useSelector((state) => state.app.loading)
  console.log(alldata, "intransit table ");
  console.log(loading, "intransit loader ");

  const dispatch = useDispatch();

  let pendingResponse = [];
  for (let i = 0; i < alldata[1]?.data.data.length; i++) {
    if (
      alldata[1].data.data[i].shipmentTrackingStatus ===
      "Enroute For Delivery"
    ) {
      pendingResponse.push(alldata[1].data.data[i]);
    }
  }

  console.log(pendingResponse, "pendingResponse")

  const pink = [];
  pendingResponse.map((res) => {
    for (let i = 0; i < alldata[0]?.data.data.length; i++) {
      if (
        res.freightUnitLineItemId ===
        alldata[0].data.data[i]?.lineItems[0]
          ?.freightUnitLineItemIds[0] ||

        res.freightUnitLineItemId ===
        alldata[0].data.data[i]?.lineItems[0]
          ?.freightUnitLineItemIds[1] ||

        res.freightUnitLineItemId ===
        alldata[0].data.data[i]?.lineItems[1]
          ?.freightUnitLineItemIds[0] ||

        res.freightUnitLineItemId ===
        alldata[0].data.data[i]?.lineItems[2]
          ?.freightUnitLineItemIds[0] ||

        res.freightUnitLineItemId ===
        alldata[0].data.data[i]?.lineItems[3]
          ?.freightUnitLineItemIds[0]
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
  console.log(pink, "pink")

  let combo = [];
  pink.map((res) => {
    if (res.shipment) {
      combo.push(res);
    }
  });
  console.log(combo, "combodata")


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
  combo.map((res) => {
    for (var n = 0; n < datamain.length; n++) {
      if (
        datamain[n].rc_regn_no ===
        res.shipment.fleetInfo.vehicle.vehicleRegistrationNumber
      ) {
        main.push(datamain[n]);
      }
    }
  });



  function subtractDates1(date1, date2) {
    const difference = date1 - date2;
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const re = `${days} D ${hours} H ${minutes} M`;
    return re.toString();
  }

  function remaingkms(a) {
    var kms = Math.floor(a / 1000);
    const re = kms + "kms";
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

  function color_eway(a) {
    const now = new Date();
    if (a < now.getTime()) {
      return false
    } else {
      return true
    }
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

  // export file 
  const exportExcelFile = () => {
    const element = document.getElementById("excel_table");
    let ws = utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    // console.log(ws,"expost data")
    let wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Sheet1");
    /* save to file */
    writeFile(wb, "Intransitdata.xlsx");
  };
  useEffect(() => {
    dispatch(fetchingdata())
  }, [])
  // map
  var origindata = [];
  var destinationdata = [];
  var vehicleloaction = [];
  var vehiclenumber = [];
  var remaingkm = [];
  for (var i = 0; i < combo.length; i++) {
    remaingkm.push(
      Math.round(
        combo[i].shipment["shipmentStages"][1]["tripPoint"]["remainingDistance"]
      ) / 1000
    );
    var latitude4 =
      combo[i].shipment.currentLocation !== null
        ? Number(combo[i].shipment.currentLocation.latitude)
        : 19.076;
    var longitude4 =
      combo[i].shipment.currentLocation !== null
        ? Number(combo[i].shipment.currentLocation.longitude)
        : 72.8777;
    vehicleloaction.push(latitude4 + "," + longitude4);
    vehiclenumber.push(
      combo[i].shipment.fleetInfo.vehicle.vehicleRegistrationNumber
    );
    if (
      combo[i].shipment.shipmentStages[0].hub !== null &&
      combo[i].shipment.shipmentStages[1].hub
    ) {
      var latitude = Number(
        combo[i].shipment.shipmentStages[0].place.center.latitude
      );
      var longitude = Number(
        combo[i].shipment.shipmentStages[0].place.center.longitude
      );
      origindata.push(latitude + "," + longitude);
      var latitude2 = Number(
        combo[i].shipment.shipmentStages[1].place.center.latitude
      );
      var longitude2 = Number(
        combo[i].shipment.shipmentStages[1].place.center.longitude
      );
      destinationdata.push(latitude2 + "," + longitude2);
    } else {
      var latitude = Number(
        combo[i].shipment.shipmentStages[0].place.center.latitude
      );
      var longitude = Number(
        combo[i].shipment.shipmentStages[0].place.center.longitude
      );
      origindata.push(latitude + "," + longitude);
      var latitude2 = Number(
        combo[i].shipment.shipmentStages[1].place.center.latitude
      );
      var longitude2 = Number(
        combo[i].shipment.shipmentStages[1].place.center.longitude
      );
      destinationdata.push(latitude2 + "," + longitude2);
    }
  }
  navigator.geolocation.getCurrentPosition((position) => {
    var coordinates = origindata;
    var datatr = coordinates.map((x) => [
      parseFloat(x.split(",")[0]),
      parseFloat(x.split(",")[1]),
    ]);
    var coordinates12 = destinationdata;
    var datatr12 = coordinates12.map((x) => [
      parseFloat(x.split(",")[0]),
      parseFloat(x.split(",")[1]),
    ]);
    var coordinates14 = vehicleloaction;
    var datatr14 = coordinates14.map((x) => [
      parseFloat(x.split(",")[0]),
      parseFloat(x.split(",")[1]),
    ]);
    var coordinates15 = vehiclenumber;
    var datatr15 = coordinates15;
    var coordinates16 = remaingkm;
    var datatr16 = coordinates16;
    var statelatlong = [
      {
        state: "Andhra Pradesh",
        capital: "Amaravati",
        latitude: 16.5745,
        longitude: 80.3736,
      },
      {
        state: "Arunachal Pradesh",
        capital: "Itanagar",
        latitude: 27.102,
        longitude: 93.692,
      },
      {
        state: "Assam",
        capital: "Dispur",
        latitude: 26.1433,
        longitude: 91.7898,
      },
      {
        state: "Bihar",
        capital: "Patna",
        latitude: 25.5941,
        longitude: 85.1376,
      },
      {
        state: "Chhattisgarh",
        capital: "Raipur",
        latitude: 21.2514,
        longitude: 81.6296,
      },
      {
        state: "Goa",
        capital: "Panaji",
        latitude: 15.4909,
        longitude: 73.8278,
      },
      {
        state: "Gujarat",
        capital: "Gandhinagar",
        latitude: 23.2156,
        longitude: 72.6369,
      },
      {
        state: "Haryana",
        capital: "Chandigarh",
        latitude: 30.7333,
        longitude: 76.7794,
      },
      {
        state: "Himachal Pradesh",
        capital: "Shimla",
        latitude: 31.1048,
        longitude: 77.1734,
      },
      {
        state: "Jharkhand",
        capital: "Ranchi",
        latitude: 23.3441,
        longitude: 85.3096,
      },
      {
        state: "Karnataka",
        capital: "Bengaluru",
        latitude: 12.9716,
        longitude: 77.5946,
      },
      {
        state: "Kerala",
        capital: "Thiruvananthapuram",
        latitude: 8.5241,
        longitude: 76.9366,
      },
      {
        state: "Madhya Pradesh",
        capital: "Bhopal",
        latitude: 23.2599,
        longitude: 77.4126,
      },
      {
        state: "Maharashtra",
        capital: "Mumbai",
        latitude: 19.076,
        longitude: 72.8777,
      },
      {
        state: "Manipur",
        capital: "Imphal",
        latitude: 24.817,
        longitude: 93.9368,
      },
      {
        state: "Meghalaya",
        capital: "Shillong",
        latitude: 25.5788,
        longitude: 91.8933,
      },
      {
        state: "Mizoram",
        capital: "Aizawl",
        latitude: 23.7367,
        longitude: 92.7146,
      },
      {
        state: "Nagaland",
        capital: "Kohima",
        latitude: 25.6747,
        longitude: 94.11,
      },
      {
        state: "Odisha",
        capital: "Bhubaneswar",
        latitude: 20.2961,
        longitude: 85.8245,
      },
      {
        state: "Punjab",
        capital: "Chandigarh",
        latitude: 30.7333,
        longitude: 76.7794,
      },
      {
        state: "Rajasthan",
        capital: "Jaipur",
        latitude: 26.9124,
        longitude: 75.7873,
      },
      {
        state: "Sikkim",
        capital: "Gangtok",
        latitude: 27.3389,
        longitude: 88.6065,
      },
      {
        state: "Tamil Nadu",
        capital: "Chennai",
        latitude: 13.0827,
        longitude: 80.2707,
      },
      {
        state: "Telangana",
        capital: "Hyderabad",
        latitude: 17.385,
        longitude: 78.4867,
      },
      {
        state: "Tripura",
        capital: "Agartala",
        latitude: 23.8315,
        longitude: 91.2868,
      },
      {
        state: "Uttar Pradesh",
        capital: "Lucknow",
        latitude: 26.8467,
        longitude: 80.9462,
      },
      {
        state: "Uttarakhand",
        capital: "Dehradun",
        latitude: 30.3165,
        longitude: 78.0322,
      },
      {
        state: "West Bengal",
        capital: "Kolkata",
        latitude: 22.5726,
        longitude: 88.3639,
      },
    ];
    const latLong1 = [19.8628, 76.9629];
    let mymap = L.map("map").setView(latLong1, 4);
    
    var Stadia_AlidadeSmoothDark = L.tileLayer(
      "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
      {
        maxZoom: 20,
        attribution:
          '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
      }
    );
    mymap.addLayer(Stadia_AlidadeSmoothDark);
    let DefaultIcon = L.icon({
      iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
      iconSize: [25, 41],
    });
    L.Marker.prototype.options.icon = DefaultIcon;
    for (var i = 0; i < datatr12.length; i++) {
      let marker5 = new L.marker([datatr14[i][0], datatr14[i][1]])
        .bindPopup(datatr14[i][0])
        .addTo(mymap);
      marker5.bindPopup(
        `<b>${datatr15[i]}<br><span style="color:red;">${datatr16[i]}kms.</span></b>`
      );
      var polygon = L.polyline([
        [datatr12[i][0], datatr12[i][1]],
        [datatr14[i][0], datatr14[i][1]],
      ]).addTo(mymap);
      var polygon1 = L.polyline([
        [datatr[i][0], datatr[i][1]],
        [datatr14[i][0], datatr14[i][1]],
      ]).addTo(mymap);
      polygon.setStyle({
        color: "red",
        dashArray: "5, 5",
        dashOffset: "0",
      });
      polygon1.setStyle({
        color: "green",
        dashArray: "15, 15",
        dashOffset: "0",
      });
      let circle1 = L.circle([datatr[i][0], datatr[i][1]], {
        color: "yellow",
        fillColor: "#f03",
        fillOpacity: 0.5,
        radius: 5000,
      }).addTo(mymap);
      let circle = L.circle([datatr12[i][0], datatr12[i][1]], {
        color: "red",
        fillColor: "#252525",
        fillOpacity: 0.5,
        radius: 5000,
      }).addTo(mymap);
    }
    for (var i = 0; i < statelatlong.length; i++) {
      let marker51 = new L.marker(
        [statelatlong[i].latitude, statelatlong[i].longitude],
        {
          icon: L.icon({
            iconUrl: "https://cdn-icons-png.flaticon.com/512/3995/3995483.png",
            iconSize: [11, 13],
          }),
          iconSize: [45, 45],
        }
      )
        .bindPopup(statelatlong[i].capital)
        .addTo(mymap);
    }
  });

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
              <TbTruckDelivery
                className="heading-icon"
                style={{ color: "orange" }}
              />
              <h1>
                INTRANSIT <span>{combo.length}</span>
              </h1>
            </div>
          </div>

          <>
            <table className=" main-table" id="excel_table">
              <thead>
                <tr>
                  {intransit.map((res) => {
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
                        <td className="td-main">{res.order.orderNumber}</td>
                        <td
                          className="td-main"
                          style={{ fontWeight: "bolder", color: color_eway(res.shipment.consignments[0].eWayBillExpiryDate) ? "#00ff00" : "red" }}
                        >
                          {differentdate(res.shipment.consignments[0].eWayBillExpiryDate) <= '0d0h0m' ? "--" : differentdate(res.shipment.consignments[0].eWayBillExpiryDate)}

                        </td>
                        <td className="td-main">
                          {res.shipment.consignments[0]?.consignmentNo
                            ? res.shipment.consignments[0]?.consignmentNo
                            : "--"}
                        </td>
                        <td className="td-main">
                          {
                            res.shipment.fleetInfo.vehicle
                              .vehicleRegistrationNumber
                          }
                        </td>
                        <td className="td-main">
                          {res.shipment.fleetInfo.driver.mobileNumber
                            ? res.shipment.fleetInfo.driver.mobileNumber
                            : "-"}
                        </td>
                        <td className="td-main">
                          {
                            res.shipment["fleetInfo"]["vehicle"][
                              "vehicleLoadType"
                            ]["name"].split("-")[1] ? res.shipment["fleetInfo"]["vehicle"][
                              "vehicleLoadType"
                            ]["name"].split("-")[1] : "--"
                          }
                        </td>
                        <td
                          className="td-main"
                          style={{
                            color: "rgb(16, 177, 231)",
                            fontWeight: "bolder",
                          }}
                        >
                          {remaingkms(
                            res.shipment.shipmentStages[1].tripPoint
                              .totalDistance
                          )}
                        </td>
                        <td
                          className="td-main"
                          style={{
                            color: "rgb(16, 177, 231)",
                            fontWeight: "bolder",
                          }}
                        >
                          {remaingkms(
                            res.shipment.shipmentStages[1].tripPoint
                              .remainingDistance
                          )}
                        </td>
                        <td
                          className="td-main"
                          style={{ color: "red", fontWeight: "bolder" }}
                        >
                          {res.shipment.currentLocation?.address
                            ? res.shipment.currentLocation?.address
                            : "--"}
                        </td>
                        <td className="td-main">
                          {res.order.lineItems[0].consigner.name.split("-")[1]}
                        </td>

                        <td
                          className="td-main"
                          style={{
                            color: "rgb(16, 177, 231)",
                            fontWeight: "bolder",
                          }}
                        >
                          {res.order.customFields
                            .filter(
                              (res) => res.fieldKey === "Consignee Address"
                            )
                            .map((res) => {
                              return <>{res.value ? res.value : "--"}</>;
                            })}
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

                        <td
                          className="td-main"
                          style={{
                            fontWeight: "bolder",
                            color:
                              differentdate(res.value) > 86400000
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
                              (res) => res.fieldKey === "EXPECTED TARGET DATE:"
                            )
                            .map((res) => {
                              return <>{differentdate(res.value)}</>;
                            })}
                        </td>
                        <td
                          className="td-main"
                          style={{
                            fontWeight: "bolder",
                            color:
                              subtractDates1(
                                res.shipment.shipmentStages[0].gateInTime,
                                res.shipment.shipmentStages[0].arrivalTime
                              ) > "-1 days 0 hours 0 minutes"
                                ? "#00ff00"
                                : "red",
                          }}
                        >
                          {" "}
                          {subtractDates1(
                            res.shipment.shipmentStages[0].gateInTime,
                            res.shipment.shipmentStages[0].arrivalTime
                          )}
                        </td>
                        <td
                          className="td-main"
                          style={{
                            fontWeight: "bolder",
                            color:
                              subtractDates1(
                                res.shipment.shipmentStages[0].departureTime,
                                res.shipment.shipmentStages[0].gateInTime
                              ) > "-1 days 0 hours 0 minutes"
                                ? "#00ff00"
                                : "red",
                          }}
                        >
                          {subtractDates1(
                            res.shipment.shipmentStages[0].departureTime,
                            res.shipment.shipmentStages[0].gateInTime
                          )}
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>

            <div className="bottom">
              <div
                className="left"
                style={{
                  color: "black",
                  marginTop: "1.5rem",
                  marginBottom: "1.5rem",
                }}
              >
                <div class="maps">
                  &nbsp;&nbsp;{" "}
                  <span
                    class="counter"
                    style={{ fontSize: "25px", color: "aliceblue" }}
                  >
                    {" "}
                    <i
                      class="fa-solid fa-truck-fast"
                      style={{ color: "green" }}
                    />{" "}
                    Transit Vehicle Map
                  </span>
                  <br />
                  <br />
                  <div class="india" id="map"></div>
                </div>
              </div>
            </div>
          </>

        </main>
        )}
    </>
  );
};

export default Intransit;
