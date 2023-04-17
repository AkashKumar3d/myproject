import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import { FaCreativeCommonsSa } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { abnormalities_tbl1, abnormalities_tbl2 } from "../common/tablevariabls";

const Abnormalities = () => {
  const token = sessionStorage.getItem("token");
  const nagivate = useNavigate();
  const [pendingShipmentX, setPendingShipmentX] = useState([]);
  const [completeShipmentX, setCompleteShipmentX] = useState([]);
  const [loader, setLoader] = useState(true);

  const urlOrder1 =
    "https://apis.fretron.com/automate/autoapi/run/255ab0db-70ed-4933-a0cc-b30b67b70955";
  const urlShipment1 =
    "https://apis.fretron.com/automate/autoapi/run/67953f4a-fb2d-4548-a86f-7b4ce2d710d2";
  const urlOrder2 =
    "https://apis.fretron.com/automate/autoapi/run/255ab0db-70ed-4933-a0cc-b30b67b70955";
  const urlShipment2 =
    "https://apis.fretron.com/automate/autoapi/run/67953f4a-fb2d-4548-a86f-7b4ce2d710d2";

  var param1 = {
    filters: {
      shipmentStatus: ["Planned", "Created"],
      customer: ["SIEMENS HEALTHCARE PRIVATE LIMITED"],
      // "origin": ["Navi Mumbai","Mumbai","Bhiwandi","Hyderabad","Bangalore","Chennai"],
      shipmentDate: {
        from: 1680287400000,
      },
    },
  };

  var data1 = {
    filters: {
      consigner: [
        "SHPL- KOLKATA AIRPORT- SIEMENS HEALTHCARE PVT.LTD.",
        "SHPL- CHENNAI SEAPORT- SIEMENS HEALTHCARE PVT.LTD.",
        "SHPL- DELHI AIRPORT- SIEMENS HEALTHCARE PVT.LTD.",
        "SHPL - APML BHIWANDI- SIEMENS HEALTHCARE PVT LTD",
        "SHPL- BANGALORE AIRPORT- SIEMENS HEALTHCARE PVT.LTD.",
        "SHPL-APML CHENNAI- SIEMENS HEALTHCARE PVT.LTD.",
        "SHPL-KOLKATA WAREHOUSE- SIEMENS HEALTHCARE PVT.LTD.",
        "SHPL-BANGALORE WAREHOUSE- SIEMENS HEALTHCARE PVT.LTD.",
        "SHPL-CHENNAI WAREHOUSE- SIEMENS HEALTHCARE PVT.LTD.",
        "SHPL-DELHI WAREHOUSE- SIEMENS HEALTHCARE PVT.LTD.",
        "SHPL - NAVA SHEVA- SIEMENS HEALTHCARE PVT LTD",
        "SHPL- KOLKATA SEAPORT- SIEMENS HEALTHCARE PVT.LTD.",
        "SHPL- CHENNAI AIRPORT- SIEMENS HEALTHCARE PVT.LTD",
        "SHPL - BGR WAREHOUSE- SIEMENS HEALTHCARE PVT.LTD",
        "SHPL-APML BANGALORE- SIEMENS HEALTHCARE PVT.LTD.",
        "SHPL - APML CHOWK - SIEMENS HEALTHCARE PVT LTD",
        "SHPL - MUMBAI AIRPORT - SIEMENS HEALTHCARE PVT LTD",
        "SHPL - PRESS METAL COMPANY - SIEMENS HEALTHCARE PVT. LTD.",
        "SHPL - RAJLAXMI LOGISTICS PARK- SIEMENS HEALTHCARE PVT LTD",
        "SHPL-GURGAON HARIYANA-SEIMENS HEALTHCARE PVT. LTD.",
      ],
      orderDate: {
        from: 1680287400000,
      },
    },
    limit: 5000,
  };

  var param2 = {
    filters: {
      shipmentStatus: ["Completed"],
      customer: ["SIEMENS HEALTHCARE PRIVATE LIMITED"],
      // "origin": ["Navi Mumbai","Mumbai","Bhiwandi","Hyderabad","Bangalore","Chennai"],
      shipmentDate: {
        from: 1680287400000,
      },
    },
  };

  var data2 = {
    filters: {
      consigner: [
        "SHPL- KOLKATA AIRPORT- SIEMENS HEALTHCARE PVT.LTD.",
        "SHPL- CHENNAI SEAPORT- SIEMENS HEALTHCARE PVT.LTD.",
        "SHPL- DELHI AIRPORT- SIEMENS HEALTHCARE PVT.LTD.",
        "SHPL - APML BHIWANDI- SIEMENS HEALTHCARE PVT LTD",
        "SHPL- BANGALORE AIRPORT- SIEMENS HEALTHCARE PVT.LTD.",
        "SHPL-APML CHENNAI- SIEMENS HEALTHCARE PVT.LTD.",
        "SHPL-KOLKATA WAREHOUSE- SIEMENS HEALTHCARE PVT.LTD.",
        "SHPL-BANGALORE WAREHOUSE- SIEMENS HEALTHCARE PVT.LTD.",
        "SHPL-CHENNAI WAREHOUSE- SIEMENS HEALTHCARE PVT.LTD.",
        "SHPL-DELHI WAREHOUSE- SIEMENS HEALTHCARE PVT.LTD.",
        "SHPL - NAVA SHEVA- SIEMENS HEALTHCARE PVT LTD",
        "SHPL- KOLKATA SEAPORT- SIEMENS HEALTHCARE PVT.LTD.",
        "SHPL- CHENNAI AIRPORT- SIEMENS HEALTHCARE PVT.LTD",
        "SHPL - BGR WAREHOUSE- SIEMENS HEALTHCARE PVT.LTD",
        "SHPL-APML BANGALORE- SIEMENS HEALTHCARE PVT.LTD.",
        "SHPL - APML CHOWK - SIEMENS HEALTHCARE PVT LTD",
        "SHPL - MUMBAI AIRPORT - SIEMENS HEALTHCARE PVT LTD",
        "SHPL - PRESS METAL COMPANY - SIEMENS HEALTHCARE PVT. LTD.",
        "SHPL - RAJLAXMI LOGISTICS PARK- SIEMENS HEALTHCARE PVT LTD",
      ],
      orderDate: {
        from: 1680287400000,
      },
    },
    limit: 5000,
  };

  var headers = {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NjQ2MDI2MDIsInVzZXJJZCI6Ijc3N2Q5YzIwLTEyNWYtNDhhZS04MWZjLTUzZWI2ZWM3MjZmZSIsImVtYWlsIjoiZGF0YS5zY2llbmNlQGFnYXJ3YWxwYWNrZXJzLmNvbSIsIm1vYmlsZU51bWJlciI6IjgyOTE4NDk1NjUiLCJvcmdJZCI6IjQwNTJhYjI0LTA1NDMtNGNkNC1iNTE3LTllNzhlZmVlNGZlZCIsIm5hbWUiOiJQcml5YWVzaCBQYXRlbCIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjpmYWxzZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.cJR4aISn0MMed1zPQqPxkMsZTn0_9N0W9n1D5mCzLMw",
    "Content-Type": "application/json",
  };

  function fetching() {
    const orderPromise1 = axios.post(urlOrder1, data1, headers);
    const shipmentPromise1 = axios.post(urlShipment1, param1, headers);
    const orderPromise2 = axios.post(urlOrder2, data2, headers);
    const shipmentPromise2 = axios.post(urlShipment2, param2, headers);

    Promise.all([
      orderPromise1,
      shipmentPromise1,
      orderPromise2,
      shipmentPromise2,
    ]).then((message) => {
      // tracking update complete shipment
      var pendingShipement = [];
      for (let i = 0; i < message[1].data.data.length; i++) {
        if (
          message[1].data.data[i].issues != null &&
          message[1].data.data[i].issues[0]?.issueType === "Abnormalities"
        ) {
          pendingShipement.push(message[1].data.data[i]);
          setPendingShipmentX(pendingShipement);
        }
      }

      // tracking update complete shipment
      var completeShipement = [];
      for (let i = 0; i < message[3].data.data.length; i++) {
        if (
          message[3].data.data[i].issues != null &&
          message[3].data.data[i].issues[0]?.issueType === "Abnormalities"
        ) {
          completeShipement.push(message[3].data.data[i]);
        }
      }
      setCompleteShipmentX(completeShipement);
      setLoader(false);
    });
  }

  useEffect(() => {
    axios
      .get("https://fire-hot-hardhat.glitch.me/auth", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        if (res.data.message === "Authorized") {
          fetching();
        }
      })
      .catch((err) => {
        nagivate("/");
      });
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

        {loader ? (
          <Loader />
        ) : (
          <>
            <h1 style={{ color: "black", fontWeight: "500" }}>
              PENDING &nbsp;{pendingShipmentX.length}{" "}
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
                  {pendingShipmentX.map((res) => {
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
                    COMPLETED &nbsp;{completeShipmentX.length}
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
                    {completeShipmentX.map((res) => {
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
