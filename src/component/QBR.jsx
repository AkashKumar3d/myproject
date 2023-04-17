import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader";
import { qbr } from "../common/tablevariabls";

const QBR = () => {
  const [pendingStatus, setPendingStatus] = useState([]);
  const [loader, setLoader] = useState(true);

  const headers = {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NjQ2MDI2MDIsInVzZXJJZCI6Ijc3N2Q5YzIwLTEyNWYtNDhhZS04MWZjLTUzZWI2ZWM3MjZmZSIsImVtYWlsIjoiZGF0YS5zY2llbmNlQGFnYXJ3YWxwYWNrZXJzLmNvbSIsIm1vYmlsZU51bWJlciI6IjgyOTE4NDk1NjUiLCJvcmdJZCI6IjQwNTJhYjI0LTA1NDMtNGNkNC1iNTE3LTllNzhlZmVlNGZlZCIsIm5hbWUiOiJQcml5YWVzaCBQYXRlbCIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjpmYWxzZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.cJR4aISn0MMed1zPQqPxkMsZTn0_9N0W9n1D5mCzLMw",
    "Content-Type": "application/json",
  };

  const url1Data = {
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

  const url2Data = {
    filters: {
      shipmentStatus: ["Planned", "Created"],
      customer: ["SIEMENS HEALTHCARE PRIVATE LIMITED"],
    },
  };

  const url1 =
    "https://apis.fretron.com/automate/autoapi/run/255ab0db-70ed-4933-a0cc-b30b67b70955";
  const url2 =
    "https://apis.fretron.com/automate/autoapi/run/67953f4a-fb2d-4548-a86f-7b4ce2d710d2";

  function fetching() {
    const promise1 = axios.post(url1, url1Data, headers);
    const promise2 = axios.post(url2, url2Data, headers);

    Promise.all([promise1, promise2]).then((message) => {
      setPendingStatus(message[1].data.data);
      setLoader(false);
    });
  }

  useEffect(() => {
    fetching();
  }, []);
  return (
    <>
      <main>
        {loader ? (
          <Loader />
        ) : (
          <>
            {" "}
            <table className="main-table" style={{ marginBottom: "2rem" }}>
              <thead>
                <tr>
                  {
                    qbr.map((res)=>{
                      return(
                        <th className="table-th">{res}</th>
                      )
                    })
                  }
                  
                  
                </tr>
              </thead>
              <tbody>
                <tr className="tr">
                  <td className="table-td">
                    {pendingStatus.map((res) => {
                      return (
                        <tr className="td-scroll">
                          <td>{res.shipmentNumber}</td>
                        </tr>
                      );
                    })}
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        )}
      </main>
    </>
  );
};

export default QBR;
