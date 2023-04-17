import axios from "axios";

export async function submitForm(inputs, ...temp) {
  let dateTime = inputs.Pickup_Date;
  let date = new Date(dateTime).toString();
  let formattedDate = date.toLocaleString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  let dateTime1 = inputs.expected_Date;
  let date1 = new Date(dateTime1);
  let formattedDate1 = date1.toLocaleString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }); 

  let orderNumber = await genOrderNumber();

  var orders = [];
  console.log(temp[0], "origin")
  for (let i = 0; i < temp[4]; i++) {
    var order = {
      Origin: temp[0],
      "Destination": null,
      "Order Number": orderNumber,
      "Item Number": `${i}`,
      "Vehicle Type": temp[3][i],
      "Transportation Service": "FTL",
      "Customer(*)": "SIEMENS HEALTHCARE PRIVATE LIMITED",
      "Consignor(*)": inputs.Origin,
      "Consignee(*)": "Unknown",
      "Pickup Date(DD-MM-YYYY)": "16-02-2023",
      "Booking Branch": "Mumbai",
      "Contract Number": null,
      "Freight": "100",
      "Measurement Type(*)": "weight",
      "Quantity(*)": "1",
      "Quantity UOM(*)": "Units",
      "cf_Order By": inputs.OrderBy,
      "cf_Vehicle-type": null,
      "cf_S.O Number/PO": inputs.SOnumber,
      "cf_WBS/COST": inputs.WBS,
      "cf_Consignee Name": inputs.ConsigneeName,
      "cf_Consignee Address": inputs.ConsigneeAddress,
      "cf_Consignee Pincode": inputs.ConsigneePincode,
      "cf_PM Name": inputs.PMName,
      "cf_PM Number": inputs.PMNumber,
      "cf_SHPL instructions": inputs.SHPL_instructions,
      "cf_APML Remarks": "",
      "cf_MATERIAL": inputs.Material,
      "cf_expected pickup date and time": formattedDate,
      "cf_EXPECTED TARGET DATE:": formattedDate1,
      "cf_Number of CC Email": temp[1],
      "cf_CC Email Id 1": temp[2].cc1,
      "cf_CC Email Id 2": temp[2].cc2,
      "cf_CC Email Id 3": temp[2].cc3,
      "cf_CC Email Id 4": temp[2].cc4,
      "cf_CC Email Id 5": temp[2].cc5,
      "cf_CC Email Id 6": temp[2].cc6,
      "cf_CC Email Id 7": temp[2].cc7,
      "cf_CC Email Id 8": temp[2].cc8,
    };
    orders.push(order);
  }
  

  var config = {
    method: "post",
    url: "https://apis.fretron.com/automate/autoapi/run/80f5e63d-19e5-4160-817f-ba260f7fe3a4",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NzI0MjAxNTcsInVzZXJJZCI6Ijc3N2Q5YzIwLTEyNWYtNDhhZS04MWZjLTUzZWI2ZWM3MjZmZSIsImVtYWlsIjoiZGF0YS5zY2llbmNlQGFnYXJ3YWxwYWNrZXJzLmNvbSIsIm1vYmlsZU51bWJlciI6IjgyOTE4NDk1NjUiLCJvcmdJZCI6IjQwNTJhYjI0LTA1NDMtNGNkNC1iNTE3LTllNzhlZmVlNGZlZCIsIm5hbWUiOiJQcml5YWVzaCBQYXRlbCIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjpmYWxzZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.QkU9OIMz0yf76zUJOtp7kVS3yAPZmJS1BMIiM4kxuzk",
      "Content-Type": "application/json",
    },
    data: orders,
  };

  axios(config)
    .then(async (response) => {
      if (
        response.data.data.successCount === 1 &&
        response.data.data.successCount === 1
      ) {
        alert("Order  has been Placed");
        console.log("Order has been placed");

        var postConfig = {
          method: "post",
          url: "https://fire-hot-hardhat.glitch.me/su",
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            newOrd: orderNumber,
          },
        };

        await axios(postConfig);
      }
    })
    .catch(function (error) {
      alert("Order has been not been Placed");
      console.log("Order has been not been Placed");
    });
}

export function onOriginChange(sO) {
  let data = [];
  let selectedLocation = "";

  switch (sO) {
    case "SHPL-GURGAON HARIYANA-SEIMENS HEALTHCARE PVT. LTD.":
      selectedLocation = "Gurgaon";
      break;
    case "SHPL- KOLKATA AIRPORT- SIEMENS HEALTHCARE PVT.LTD.":
      selectedLocation = "KOLKATA AIRPORT";
      break;
    case "SHPL- CHENNAI SEAPORT- SIEMENS HEALTHCARE PVT.LTD.":
      selectedLocation = "Chennai Port";
      break;
    case "SHPL- DELHI AIRPORT- SIEMENS HEALTHCARE PVT.LTD.":
      selectedLocation = "Delhi";
      break;
    case "SHPL - APML BHIWANDI- SIEMENS HEALTHCARE PVT LTD":
      selectedLocation = "Bhiwandi";
      break;
    case "SHPL- BANGALORE AIRPORT- SIEMENS HEALTHCARE PVT.LTD.":
      selectedLocation = "Bangalore";
      break;
    case "SHPL-APML CHENNAI- SIEMENS HEALTHCARE PVT.LTD.":
      selectedLocation = "Chennai";
      break;
    case "SHPL-KOLKATA WAREHOUSE- SIEMENS HEALTHCARE PVT.LTD.":
      selectedLocation = "Kolkata";
      break;
    case "SHPL-BANGALORE WAREHOUSE- SIEMENS HEALTHCARE PVT.LTD.":
      selectedLocation = "Bangalore";
      break;
    case "SHPL-CHENNAI WAREHOUSE- SIEMENS HEALTHCARE PVT.LTD.":
      selectedLocation = "Chennai";
      break;
    case "SHPL-DELHI WAREHOUSE- SIEMENS HEALTHCARE PVT.LTD.":
      selectedLocation = "Delhi";
      break;
    case "SHPL - NAVA SHEVA- SIEMENS HEALTHCARE PVT LTD":
      selectedLocation = "Navi Mumbai";
      break;
    case "SHPL- KOLKATA SEAPORT- SIEMENS HEALTHCARE PVT.LTD.":
      selectedLocation = "Kolkata";
      break;
    case "SHPL- CHENNAI AIRPORT- SIEMENS HEALTHCARE PVT.LTD":
      selectedLocation = "Chennai";
      break;
    case "SHPL - BGR WAREHOUSE- SIEMENS HEALTHCARE PVT.LTD":
      selectedLocation = "Bhiwandi";
      break;
    case "SHPL-APML BANGALORE- SIEMENS HEALTHCARE PVT.LTD.":
      selectedLocation = "Bangalore";
      break;
    case "SHPL - APML CHOWK - SIEMENS HEALTHCARE PVT LTD":
      selectedLocation = "Navi Mumbai";
      break;
    case "SHPL - MUMBAI AIRPORT - SIEMENS HEALTHCARE PVT LTD":
      selectedLocation = "Mumbai";
      break;
    case "SHPL - PRESS METAL COMPANY - SIEMENS HEALTHCARE PVT. LTD.":
      selectedLocation = "Bhiwandi";
      break;
    case "SHPL - RAJLAXMI LOGISTICS PARK- SIEMENS HEALTHCARE PVT LTD":
      selectedLocation = "Bhiwandi";
      break;
    default:
      break;
  }

  data[0] = "SIEMENS HEALTHCARE PRIVATE LIMITED";
  data[1] = selectedLocation;
  data[2] = sO;
  data[3] = "Mumbai";
  return data;
}

async function genOrderNumber() {
  var getConfig = {
    method: "get",
    url: "https://script.google.com/macros/s/AKfycbwBRCXo0d0WLTZfKJyNe833t1Caqmh3_CGfi4E7hTGPuLyjyqDQFhS3E2f9b3WybaI/exec?action=getUser",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const sheetRes = await axios(getConfig);
  const sheetData = sheetRes.data;

  let prev = sheetData[sheetData.length - 1];

  let prevOrd = prev.data.split("_")[1];

  let num = parseInt(prevOrd) + 1;
  let newOrd = "SHPL_" + num.toString().padStart(7, "0");

  return newOrd;
}
