import React from "react";
import { useState, useEffect } from "react";
import { onOriginChange, submitForm } from "./OrderFormFunction";
import { FaWpforms } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function OrderForm() {
  const token = sessionStorage.getItem("token");
  const nagivate = useNavigate();
  const [inputs, setInputs] = useState({});
  const [selectedOrigin, setSelectedOrigin] = useState("");
  const [selectedlocation, setSelectedlocation] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [totalVeh, setTotalVeh] = useState(0);
  const [veh, setVeh] = useState([]);
  const [noCctt, setNoCctt] = useState("0");
  const [ccNumbers, setCcNumbers] = useState({
    cc1: null,
    cc2: null,
    cc3: null,
    cc4: null,
    cc5: null,
    cc6: null,
    cc7: null,
    cc8: null,
  });

  const handleChanges = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitForm(inputs, selectedlocation, noCctt, ccNumbers, veh, totalVeh);
    setSubmitted(true);

    setInterval(() => {
      window.location.reload();
    }, 10000);
  };

  const handleCcNumberChange = (e) => {
    setCcNumbers({
      ...ccNumbers,
      [e.target.name]: e.target.value,
    });
  };

  const onMaterialChange = (e) => {
    const material = e.target.value;

    // switch case to check the material and set the nth vehicle
    switch (material) {
      case "MRI":
        setTotalVeh(3);
        setVeh([
          "SHPL - 20FT AIR SUSPENSION",
          "SHPL - 20 FT ODC",
          "SHPL - 20 FT ODC",
        ]);
        break;
      case "RF":
        setTotalVeh(1);
        setVeh(["SHPL - 20 FT ODC"]);
        break;
      case "cios fit":
        setTotalVeh(1);
        setVeh(["SHPL - 20 FT ODC"]);
        break;
      case "CT":
        setTotalVeh(1);
        setVeh(["SHPL - 20 FT ODC"]);
        break;
      case "LBO":
        setTotalVeh(3);
        setVeh(["SHPL - PICK UP", "SHPL - PICK UP", "SHPL - 17ft VEHICLE"]);
        break;
      case "XP":
        setTotalVeh(1);
        setVeh(["SHPL - 17ft VEHICLE"]);
        break;
      case "MI":
        setTotalVeh(3);
        setVeh([
          "SHPL - 20FT AIR SUSPENSION",
          "SHPL - 20 FT ODC",
          "SHPL - 20 FT ODC",
        ]);
        break;
      case "Biograph Horizon":
        setTotalVeh(3);
        setVeh([
          "SHPL - 20FT AIR SUSPENSION",
          "SHPL - 20 FT ODC",
          "SHPL - 20 FT ODC",
        ]);
        break;
      case "Symbia":
        setTotalVeh(3);
        setVeh([
          "SHPL - 20FT AIR SUSPENSION",
          "SHPL - 20 FT ODC",
          "SHPL - 20 FT ODC",
        ]);
        break;
      case "Artis":
        setTotalVeh(2);
        setVeh(["SHPL - 20 FT ODC", "SHPL - 20 FT ODC"]);
        break;
      case "Mammomat":
        setTotalVeh(1);
        setVeh(["SHPL - 20 FT ODC"]);
        break;
      case "Multix":
        setTotalVeh(1);
        setVeh(["SHPL - 20 FT ODC"]);
        break;
      case "Mobilett elara max":
        setTotalVeh(1);
        setVeh(["SHPL - 20 FT ODC"]);
        break;
      case "Yasio max":
        setTotalVeh(1);
        setVeh(["SHPL - 20 FT ODC"]);
        break;
    }
  };

  useEffect(() => {
    axios
      .get("https://fire-hot-hardhat.glitch.me/auth", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        if (res.data.message === "Authorized") {
          console.log("Authorized");
        }
      })
      .catch((err) => {
        nagivate("/");
      });
  }, []);

  return (
    <>
      <main
        style={{
          backgroundColor: "gray",
          margin: "0",
          padding: "0",
          height: "100vh",
          overflow: "unset",
        }}
      >
        <div className="form-main">
          <div class="form">
            <div class="form_contain">
              <FaWpforms
                style={{ fill: "white", height: "2rem", width: "2rem" }}
              />
              <h1>ORDER FORM </h1>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(e);
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <div
                  style={{
                    flexDirection: "column",
                    margin: "1rem",
                  }}
                >
                  <div>
                    <label>Origin:</label>
                    <select
                      name="Origin"
                      onChange={(e) => {
                        const data = onOriginChange(e.target.value);
                        setSelectedlocation(data[1]);
                        setSelectedOrigin(e.target.value);
                        handleChanges(e);
                      }}
                    >
                      <option value="">Select an option</option>
                      <option value="SHPL-GURGAON HARIYANA-SEIMENS HEALTHCARE PVT. LTD.">
                      SHPL-GURGAON HARIYANA-SEIMENS HEALTHCARE PVT. LTD.
                      </option>
                      <option value="SHPL - MUMBAI AIRPORT - SIEMENS HEALTHCARE PVT LTD">
                        SHPL - MUMBAI AIRPORT - SIEMENS HEALTHCARE PVT LTD
                      </option>
                      <option value="SHPL - APML BHIWANDI- SIEMENS HEALTHCARE PVT LTD">
                        SHPL - APML BHIWANDI- SIEMENS HEALTHCARE PVT LTD
                      </option>
                      <option value="SHPL - BGR WAREHOUSE- SIEMENS HEALTHCARE PVT.LTD">
                        SHPL - BGR WAREHOUSE- SIEMENS HEALTHCARE PVT.LTD
                      </option>
                      <option value="SHPL - NAVA SHEVA- SIEMENS HEALTHCARE PVT LTD">
                        SHPL - NHAVA SHEVA- SIEMENS HEALTHCARE PVT LTD
                      </option>
                      <option value="SHPL - APML CHOWK - SIEMENS HEALTHCARE PVT LTD">
                        SHPL - APML CHOWK - SIEMENS HEALTHCARE PVT LTD.
                      </option>
                      <option value="SHPL - PRESS METAL COMPANY - SIEMENS HEALTHCARE PVT. LTD.">
                        SHPL - PRESS METAL COMPANY - SIEMENS HEALTHCARE PVT.
                        LTD.
                      </option>
                      <option value="SHPL - RAJLAXMI LOGISTICS PARK- SIEMENS HEALTHCARE PVT LTD">
                        SHPL - RAJLAXMI LOGISTICS PARK- SIEMENS HEALTHCARE PVT
                        LTD
                      </option>
                      <option value="SHPL- KOLKATA AIRPORT- SIEMENS HEALTHCARE PVT.LTD.">
                        SHPL- KOLKATA AIRPORT- SIEMENS HEALTHCARE PVT.LTD.
                      </option>
                      <option value="SHPL-KOLKATA WAREHOUSE- SIEMENS HEALTHCARE PVT.LTD.">
                        SHPL-KOLKATA WAREHOUSE- SIEMENS HEALTHCARE PVT.LTD.
                      </option>
                      <option value="SHPL- KOLKATA SEAPORT- SIEMENS HEALTHCARE PVT.LTD.">
                        SHPL- KOLKATA SEAPORT- SIEMENS HEALTHCARE PVT.LTD.
                      </option>
                      <option value="SHPL- CHENNAI SEAPORT- SIEMENS HEALTHCARE PVT.LTD.">
                        SHPL- CHENNAI SEAPORT- SIEMENS HEALTHCARE PVT.LTD.
                      </option>
                      <option value="SHPL- CHENNAI AIRPORT- SIEMENS HEALTHCARE PVT.LTD">
                        SHPL- CHENNAI AIRPORT- SIEMENS HEALTHCARE PVT.LTD
                      </option>
                      <option value="SHPL-CHENNAI WAREHOUSE- SIEMENS HEALTHCARE PVT.LTD.">
                        SHPL-CHENNAI WAREHOUSE- SIEMENS HEALTHCARE PVT.LTD.
                      </option>
                      <option value="SHPL-APML CHENNAI- SIEMENS HEALTHCARE PVT.LTD.">
                        SHPL-APML CHENNAI- SIEMENS HEALTHCARE PVT.LTD.
                      </option>
                      <option value="SHPL- DELHI AIRPORT- SIEMENS HEALTHCARE PVT.LTD.">
                        SHPL- DELHI AIRPORT- SIEMENS HEALTHCARE PVT.LTD.
                      </option>
                      <option value="SHPL-DELHI WAREHOUSE- SIEMENS HEALTHCARE PVT.LTD.">
                        SHPL-DELHI WAREHOUSE- SIEMENS HEALTHCARE PVT.LTD.
                      </option>

                      <option value="SHPL- BANGALORE AIRPORT- SIEMENS HEALTHCARE PVT.LTD.">
                        SHPL- BANGALORE AIRPORT- SIEMENS HEALTHCARE PVT.LTD.
                      </option>
                      <option value="SHPL-BANGALORE WAREHOUSE- SIEMENS HEALTHCARE PVT.LTD.">
                        SHPL-BANGALORE WAREHOUSE- SIEMENS HEALTHCARE PVT.LTD.
                      </option>

                      <option value="SHPL-APML BANGALORE- SIEMENS HEALTHCARE PVT.LTD.">
                        SHPL-APML BANGALORE- SIEMENS HEALTHCARE PVT.LTD.
                      </option>

                      <option disabled value="Others">
                        Others
                      </option>
                    </select>
                  </div>
                  {selectedOrigin === "Others" && (
                    <div>
                      <label>other location</label>
                      <input
                        type="text"
                        name="Location"
                        onChange={handleChanges}
                        required
                      />
                    </div>
                  )}
                  <div>
                    <label>Location :</label>
                    <input
                      type="text"
                      name="Location"
                      onChange={(e) => {
                        handleChanges(e);
                      }}
                      value={selectedlocation}
                      required
                      disabled
                    />
                  </div>

                  <div>
                    <label>Total Vehicles:</label>
                    <select
                      name="totalVeh"
                      value={totalVeh}
                      onChange={(e) => {
                        setTotalVeh(e.target.value);
                      }}
                      required
                    >
                      <option>--Select--</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                  </div>

                  {totalVeh >= 1 && (
                    <div>
                      <label>Vehicle Type:</label>
                      <select
                        name="v1"
                        value={veh[0]}
                        onChange={(e) => setVeh([...veh, e.target.value])}
                        required
                      >
                        <option value="">--Select--</option>
                        <option value="SHPL - 20 FT ODC">20 FT ODC</option>
                        <option value="SHPL - 20FT AIR SUSPENSION">
                          20FT AIR SUSPENSION
                        </option>
                        <option value="SHPL - 17ft VEHICLE">
                          17ft VEHICLE
                        </option>
                        <option value="SHPL - PICK UP">PICK UP</option>
                        <option value="SHPL - 24 FT PLATFORM">
                          24 FT PLATFORM
                        </option>
                        <option value="SHPL - 32 FT PLATFORM">
                          32 FT PLATFORM
                        </option>
                        <option value="SHPL - 40 FT TRAILER">
                          40 FT TRAILER
                        </option>
                        <option value="SHPL - 20 FT TRAILER">
                          20 FT TRAILER
                        </option>
                        <option value="SHPL - 40 FT AIR SUSPENSION">
                          40 FT AIR SUSPENSION
                        </option>
                      </select>
                    </div>
                  )}
                  {totalVeh >= 2 && (
                    <div>
                      <label>Vehicle Type:</label>
                      <select
                        name="v2"
                        value={veh[1]}
                        onChange={(e) => setVeh([...veh, e.target.value])}
                        required
                      >
                        <option value="">--Select--</option>
                        <option value="SHPL - 20 FT ODC">20 FT ODC</option>
                        <option value="SHPL - 20FT AIR SUSPENSION">
                          20FT AIR SUSPENSION
                        </option>
                        <option value="SHPL - 17ft VEHICLE">
                          17ft VEHICLE
                        </option>
                        <option value="SHPL - PICK UP">PICK UP</option>
                        <option value="SHPL - 24 FT PLATFORM">
                          24 FT PLATFORM
                        </option>
                        <option value="SHPL - 32 FT PLATFORM">
                          32 FT PLATFORM
                        </option>
                        <option value="SHPL - 40 FT TRAILER">
                          40 FT TRAILER
                        </option>
                        <option value="SHPL - 20 FT TRAILER">
                          20 FT TRAILER
                        </option>
                        <option value="SHPL - 40 FT AIR SUSPENSION">
                          40 FT AIR SUSPENSION
                        </option>
                      </select>
                    </div>
                  )}
                  {totalVeh >= 3 && (
                    <div>
                      <label>Vehicle Type:</label>
                      <select
                        name="v3"
                        value={veh[2]}
                        onChange={(e) => setVeh([...veh, e.target.value])}
                        required
                      >
                        <option value="">--Select--</option>
                        <option value="SHPL - 20 FT ODC">20 FT ODC</option>
                        <option value="SHPL - 20FT AIR SUSPENSION">
                          20FT AIR SUSPENSION
                        </option>
                        <option value="SHPL - 17ft VEHICLE">
                          17ft VEHICLE
                        </option>
                        <option value="SHPL - PICK UP">PICK UP</option>
                        <option value="SHPL - 24 FT PLATFORM">
                          24 FT PLATFORM
                        </option>
                        <option value="SHPL - 32 FT PLATFORM">
                          32 FT PLATFORM
                        </option>
                        <option value="SHPL - 40 FT TRAILER">
                          40 FT TRAILER
                        </option>
                        <option value="SHPL - 20 FT TRAILER">
                          20 FT TRAILER
                        </option>
                        <option value="SHPL - 40 FT AIR SUSPENSION">
                          40 FT AIR SUSPENSION
                        </option>
                      </select>
                    </div>
                  )}
                  {totalVeh >= 4 && (
                    <div>
                      <label>Vehicle Type:</label>
                      <select
                        name="v4"
                        value={veh[3]}
                        onChange={(e) => setVeh([...veh, e.target.value])}
                        required
                      >
                        <option value="">--Select--</option>
                        <option value="SHPL - 20 FT ODC">20 FT ODC</option>
                        <option value="SHPL - 20FT AIR SUSPENSION">
                          20FT AIR SUSPENSION
                        </option>
                        <option value="SHPL - 17ft VEHICLE">
                          17ft VEHICLE
                        </option>
                        <option value="SHPL - PICK UP">PICK UP</option>
                        <option value="SHPL - 24 FT PLATFORM">
                          24 FT PLATFORM
                        </option>
                        <option value="SHPL - 32 FT PLATFORM">
                          32 FT PLATFORM
                        </option>
                        <option value="SHPL - 40 FT TRAILER">
                          40 FT TRAILER
                        </option>
                        <option value="SHPL - 20 FT TRAILER">
                          20 FT TRAILER
                        </option>
                        <option value="SHPL - 40 FT AIR SUSPENSION">
                          40 FT AIR SUSPENSION
                        </option>
                      </select>
                    </div>
                  )}

                  <div>
                    <label>Transportation Service:</label>
                    <select
                      name="TransportationService"
                      onChange={handleChanges}
                      required
                    >
                      <option value="">--Select--</option>
                      <option value="FTL">FTL</option>
                      <option value="PTL">PTL</option>
                      <option value="Express">Express</option>
                    </select>
                  </div>
                </div>

                <div style={{ flexDirection: "column", margin: "1rem" }}>
                  <div>
                    <label>Order By</label>
                    <select name="OrderBy" onChange={handleChanges} required>
                      <option value="">--Select--</option>
                      <option value="Adinath Tajne">Adinath Tajne</option>
                      <option value="Aditya Kandharkar">
                        Aditya Kandharkar
                      </option>
                      <option value="Chintamani Mayeka">
                        Chintamani Mayeka
                      </option>
                      <option value="Jayesh Uniyal">Jayesh Uniyal</option>
                      <option value="Sujoy Dey">Sujoy Dey</option>
                      <option value="Pravin Katkar">Pravin Katkar</option>
                      <option value="Mrirani Das">Mrirani Das</option>
                      <option value="Vijay Mahtre">Vijay Mahtre</option>
                      <option value="Sagar kadam">Sagar kadam</option>
                    </select>
                  </div>

                  <div>
                    <label>Pickup Date:</label>
                    <input
                      style={{
                        display: "flex",
                        flexDirection: "row-reverse",
                        alignItems: "center",
                      }}
                      type="datetime-local"
                      name="Pickup_Date"
                      onChange={handleChanges}
                      required
                      className="dark-theme"
                    />
                  </div>

                  <div>
                    <label>Ship to Party</label>
                    <input
                      type="text"
                      name="ConsigneeName"
                      onChange={handleChanges}
                      required
                    />
                  </div>
                  <div>
                    <label>Ship to Address</label>
                    <input
                      type="text"
                      name="ConsigneeAddress"
                      onChange={handleChanges}
                      required
                    />
                  </div>
                  <div>
                    <label>City</label>
                    <input
                      type="text"
                      name="ConsigneePincode"
                      onChange={handleChanges}
                      required
                    />
                  </div>

                  <div>
                    <label>S.O Number/PO:</label>
                    <input
                      type="type"
                      name="SOnumber"
                      onChange={handleChanges}
                      required
                    />
                  </div>
                  <div>
                    <label>WBS/COST:</label>
                    <input
                      type="type"
                      name="WBS"
                      onChange={handleChanges}
                      required
                    />
                  </div>
                  <div>
                    <label>SHPL instructions</label>
                    <input
                      type="text"
                      name="SHPL_instructions"
                      onChange={handleChanges}
                    />
                  </div>
                </div>

                <div style={{ flexDirection: "row", margin: "1rem" }}>
                  <div>
                    <label>Material</label>
                    <select
                      name="Material"
                      onChange={(e) => {
                        handleChanges(e);
                        onMaterialChange(e);
                      }}
                      required
                    >
                      <option value="">--Select--</option>
                      <option value="MRI">MRI</option>
                      <option value="RF">RF Cabin</option>
                      {/* <!-- EXTRA --> */}
                      <option value="Biograph Horizon">Biograph Horizon</option>
                      <option value="Symbia">Symbia</option>
                      <option value="Artis">Artis</option>
                      <option value="cios fit">Cios</option>
                      <option value="Luminos">Luminos</option>
                      <option value="Mammomat">Mammomat</option>
                      <option value="Multix">Multix</option>
                      <option value="Mobilett elara max">
                        Mobilett elara max
                      </option>
                      <option value="Yasio max">Yasio max</option>
                      {/* <!-- EXTRA END --> */}
                      <option value="CT">CT</option>
                      <option value="LBO">LBO</option>
                      <option value="MI">MI</option>
                      <option value="XP">XP</option>
                      <option value="somatam">somatam</option>{" "}
                      {/*<!-- REMAINING --> */}
                      <option value="Equipment">Equipment</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>

                  <div>
                    <label>Expected Delivery Date:</label>
                    <input
                      style={{
                        display: "flex",
                        flexDirection: "row-reverse",
                        alignItems: "center",
                      }}
                      type="datetime-local"
                      name="expected_Date"
                      onChange={handleChanges}
                      required
                      className="dark-theme"
                    />
                  </div>

                  <div>
                    <label>PM Name</label>
                    <input
                      type="text"
                      name="PMName"
                      onChange={handleChanges}
                      required
                    />
                  </div>
                  <div>
                    <label>PM Number</label>
                    <input
                      type="text"
                      name="PMNumber"
                      onChange={handleChanges}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="noCctt">Number of CC numbers:</label>
                    <select
                      name="noCctt"
                      id="noCctt"
                      onChange={(e) => setNoCctt(e.target.value)}
                      required
                    >
                      <option>-- Select --</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                    </select>
                  </div>
                  {noCctt >= 1 && (
                    <div>
                      <label htmlFor="cc1">CC no.1</label>
                      <input
                        type="text"
                        name="cc1"
                        id="cc1"
                        onChange={handleCcNumberChange}
                        required
                      />
                    </div>
                  )}
                  {noCctt >= 2 && (
                    <div>
                      <label htmlFor="cc2">CC no.2</label>
                      <input
                        type="text"
                        name="cc2"
                        id="cc2"
                        onChange={handleCcNumberChange}
                        required
                      />
                    </div>
                  )}
                  {noCctt >= 3 && (
                    <div>
                      <label htmlFor="cc3">CC no.3</label>
                      <input
                        type="text"
                        name="cc3"
                        id="cc3"
                        onChange={handleCcNumberChange}
                        required
                      />
                    </div>
                  )}
                  {noCctt >= 4 && (
                    <div>
                      <label htmlFor="cc4">CC no.4</label>
                      <input
                        type="text"
                        name="cc4"
                        id="cc4"
                        onChange={handleCcNumberChange}
                        required
                      />
                    </div>
                  )}
                  {noCctt >= 5 && (
                    <div>
                      <label htmlFor="cc5">CC no.5</label>
                      <input
                        type="text"
                        name="cc5"
                        id="cc5"
                        onChange={handleCcNumberChange}
                        required
                      />
                    </div>
                  )}
                   {noCctt >= 6 && (
                    <div>
                      <label htmlFor="cc6">CC no.6</label>
                      <input
                        type="text"
                        name="cc6"
                        id="cc6"
                        onChange={handleCcNumberChange}
                        required
                      />
                    </div>
                  )}
                   {noCctt >= 7 && (
                    <div>
                      <label htmlFor="cc7">CC no.7</label>
                      <input
                        type="text"
                        name="cc7"
                        id="cc7"
                        onChange={handleCcNumberChange}
                        required
                      />
                    </div>
                  )}
                   {noCctt >= 8 && (
                    <div>
                      <label htmlFor="cc8">CC no.8</label>
                      <input
                        type="text"
                        name="cc8"
                        id="cc8"
                        onChange={handleCcNumberChange}
                        required
                      />
                    </div>
                  )}
                </div>
                <div className="submit-class">
                  <div
                    style={{
                      marginTop: "2rem",
                      position: "absolute",
                      bottom: "12%",
                    }}
                  >
                    <div className="submit_button">
                      <button
                        type="submit"
                        onChange={setSubmitted}
                        style={{ width: "200px" }}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                  {submitted && (
                    <div style={{ minWidth: "100%", maxWidth: "100%" }}>
                      <div className="Tq_msg" style={{ position: "relative" }}>
                        <h1>THANK YOU</h1>
                      </div>
                      <div className="celebration" style={{ position: "" }}>
                        <svg
                          width="100%"
                          height="90"
                          viewBox="0 0 600 90"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect x="42" y="0" width="10" height="20" />
                          <rect x="84" y="0" width="10" height="20" />
                          <rect x="126" y="0" width="10" height="23" />
                          <rect x="168" y="0" width="10" height="23" />
                          <rect x="210" y="0" width="10" height="20" />
                          <rect x="252" y="0" width="10" height="23" />
                          <rect x="294" y="0" width="10" height="20" />
                          <rect x="336" y="0" width="10" height="23" />
                          <rect x="378" y="0" width="10" height="23" />
                          <rect x="420" y="0" width="10" height="20" />
                          <rect x="462" y="0" width="10" height="20" />
                          <rect x="504" y="0" width="10" height="23" />
                          <rect x="546" y="0" width="10" height="20" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
