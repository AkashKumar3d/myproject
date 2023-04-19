import axios from "axios";

// {

//         // atunloading
//         // api calling 
//     const promise1 = axios.post(url1, url1Data, headers);
//     const promise2 = axios.post(url2, url2Data, headers);
//     const promise3 = axios.get(url3, Infinity);


//     // billing 

//     // completed api 
//     // api calling
//     {const promise1 = axios.post(url1, url1Data, headers);
//     const promise2 = axios.post(url2, url2Data, headers);
//     const promise3 = axios.get(url3, Infinity);}

//     // enroute for pickup api 


//     // Escalations api 
//     const orderPromise1 = axios.post(urlOrder1, data1, headers);
//     const shipmentPromise1 = axios.post(urlShipment1, param1, headers);
//     const orderPromise2 = axios.post(urlOrder2, data2, headers);
//     const shipmentPromise2 = axios.post(urlShipment2, param2, headers);


//     // intransit api 
//     {const promise1 = await axios.post(url1, url1Data, headers);
//     const promise2 = await axios.post(url2, url2Data, headers);
//     const promise3 = await axios.get(url3, Infinity);}


//     // MBR
//     // api call 
//    { const promise1 = axios.post(url1, url1Data, headers);
//     const promise2 = axios.post(url2, url2Data, headers);}


//     // payment 
//     // api calls 
//     {const promise1 = axios.post(url1, url1Data, headers);
//     const promise2 = axios.post(url2, url2Data, headers);}


//     // pending orders 
//      // api call 
//      {const promise1 =  axios.post(url1, url1Data, headers);
//      const promise2 =  axios.post(url2, url2Data, headers);
//      const promise3 =  axios.get(url3, Infinity);}


//     //  pod
//       // api calls 
//       const promise1 = axios.post(url1, url1Data, headers);
//       const promise2 = axios.post(url2, url2Data, headers);

//     //   qbr
//     // api calls 
//     const promise1 = axios.post(url1, url1Data, headers);
//     const promise2 = axios.post(url2, url2Data, headers);



// // tracking update 
// // api calls 
//  const orderPromise1 = axios.post(urlOrder1, data1, headers);
//  const shipmentPromise1 = axios.post(urlShipment1, param1, headers);
//  const orderPromise2 = axios.post(urlOrder2, data2, headers);
//  const shipmentPromise2 = axios.post(urlShipment2, param2, headers); 
// }





// {
//     // hader
//     const headers = {
//         Authorization:
//             "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NjQ2MDI2MDIsInVzZXJJZCI6Ijc3N2Q5YzIwLTEyNWYtNDhhZS04MWZjLTUzZWI2ZWM3MjZmZSIsImVtYWlsIjoiZGF0YS5zY2llbmNlQGFnYXJ3YWxwYWNrZXJzLmNvbSIsIm1vYmlsZU51bWJlciI6IjgyOTE4NDk1NjUiLCJvcmdJZCI6IjQwNTJhYjI0LTA1NDMtNGNkNC1iNTE3LTllNzhlZmVlNGZlZCIsIm5hbWUiOiJQcml5YWVzaCBQYXRlbCIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjpmYWxzZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.cJR4aISn0MMed1zPQqPxkMsZTn0_9N0W9n1D5mCzLMw",
//         "Content-Type": "application/json",
//     };


//     // all filters 
//     const fltr1 = {
//         filters: {
//             consigner: [
//                 "SHPL- KOLKATA AIRPORT- SIEMENS HEALTHCARE PVT.LTD.",
//                 "SHPL- CHENNAI SEAPORT- SIEMENS HEALTHCARE PVT.LTD.",
//                 "SHPL- DELHI AIRPORT- SIEMENS HEALTHCARE PVT.LTD.",
//                 "SHPL - APML BHIWANDI- SIEMENS HEALTHCARE PVT LTD",
//                 "SHPL- BANGALORE AIRPORT- SIEMENS HEALTHCARE PVT.LTD.",
//                 "SHPL-APML CHENNAI- SIEMENS HEALTHCARE PVT.LTD.",
//                 "SHPL-KOLKATA WAREHOUSE- SIEMENS HEALTHCARE PVT.LTD.",
//                 "SHPL-BANGALORE WAREHOUSE- SIEMENS HEALTHCARE PVT.LTD.",
//                 "SHPL-CHENNAI WAREHOUSE- SIEMENS HEALTHCARE PVT.LTD.",
//                 "SHPL-DELHI WAREHOUSE- SIEMENS HEALTHCARE PVT.LTD.",
//                 "SHPL - NAVA SHEVA- SIEMENS HEALTHCARE PVT LTD",
//                 "SHPL- KOLKATA SEAPORT- SIEMENS HEALTHCARE PVT.LTD.",
//                 "SHPL- CHENNAI AIRPORT- SIEMENS HEALTHCARE PVT.LTD",
//                 "SHPL - BGR WAREHOUSE- SIEMENS HEALTHCARE PVT.LTD",
//                 "SHPL-APML BANGALORE- SIEMENS HEALTHCARE PVT.LTD.",
//                 "SHPL - APML CHOWK - SIEMENS HEALTHCARE PVT LTD",
//                 "SHPL - MUMBAI AIRPORT - SIEMENS HEALTHCARE PVT LTD",
//                 "SHPL - PRESS METAL COMPANY - SIEMENS HEALTHCARE PVT. LTD.",
//                 "SHPL - RAJLAXMI LOGISTICS PARK- SIEMENS HEALTHCARE PVT LTD",
//                 "SHPL-GURGAON HARIYANA-SEIMENS HEALTHCARE PVT. LTD."
//             ],
//             orderDate: {
//                 from: 1680287400000,
//             },
//         },
//         limit: 5000,
//     };

//     const fltr2 = {
//         filters: {
//             shipmentStatus: ["Planned", "Created"],
//             customer: ["SIEMENS HEALTHCARE PRIVATE LIMITED"],
//             shipmentDate: {
//                 from: 1680287400000,
//             },
//         },
//     };
    
//     const fltr3 = {
//         filters: {
//             shipmentStatus: ["Completed"],
//             customer: ["SIEMENS HEALTHCARE PRIVATE LIMITED"],
//             // "origin": ["Navi Mumbai","Mumbai","Bhiwandi","Hyderabad","Bangalore","Chennai"],
//             shipmentDate: {
//                 from: 1680287400000,
//             },
//         },
//     };

//     const fltr4 = {
//         filters: {
//             shipmentStatus: ["Planned", "Created", "Completed"],
//             customer: ["SIEMENS HEALTHCARE PRIVATE LIMITED"],
//             shipmentDate: {
//                 from: 1680287400000,
//             },
//         },
//     };

//     const fltr5 = {
//         filters: {
//             shipmentStatus: ["Planned", "Created"],
//             shipmentDate: {
//                 from: 1680287400000,
//             },
//         },
//     };

//     const fltr6 = {
//         filters: {
//             consigner: [
//                 "SHPL- KOLKATA AIRPORT- SIEMENS HEALTHCARE PVT.LTD.",
//                 "SHPL- CHENNAI SEAPORT- SIEMENS HEALTHCARE PVT.LTD.",
//                 "SHPL- DELHI AIRPORT- SIEMENS HEALTHCARE PVT.LTD.",
//                 "SHPL - APML BHIWANDI- SIEMENS HEALTHCARE PVT LTD",
//                 "SHPL- BANGALORE AIRPORT- SIEMENS HEALTHCARE PVT.LTD.",
//                 "SHPL-APML CHENNAI- SIEMENS HEALTHCARE PVT.LTD.",
//                 "SHPL-KOLKATA WAREHOUSE- SIEMENS HEALTHCARE PVT.LTD.",
//                 "SHPL-BANGALORE WAREHOUSE- SIEMENS HEALTHCARE PVT.LTD.",
//                 "SHPL-CHENNAI WAREHOUSE- SIEMENS HEALTHCARE PVT.LTD.",
//                 "SHPL-DELHI WAREHOUSE- SIEMENS HEALTHCARE PVT.LTD.",
//                 "SHPL - NAVA SHEVA- SIEMENS HEALTHCARE PVT LTD",
//                 "SHPL- KOLKATA SEAPORT- SIEMENS HEALTHCARE PVT.LTD.",
//                 "SHPL- CHENNAI AIRPORT- SIEMENS HEALTHCARE PVT.LTD",
//                 "SHPL - BGR WAREHOUSE- SIEMENS HEALTHCARE PVT.LTD",
//                 "SHPL-APML BANGALORE- SIEMENS HEALTHCARE PVT.LTD.",
//                 "SHPL - APML CHOWK - SIEMENS HEALTHCARE PVT LTD",
//                 "SHPL - MUMBAI AIRPORT - SIEMENS HEALTHCARE PVT LTD",
//                 "SHPL - PRESS METAL COMPANY - SIEMENS HEALTHCARE PVT. LTD.",
//                 "SHPL - RAJLAXMI LOGISTICS PARK- SIEMENS HEALTHCARE PVT LTD",
//             ],
//             orderDate: {
//                 from: 1680287400000,
//             },
//         },
//         limit: 5000,
//     };

//     const fltr7= {
//         filters: {
//             shipmentStatus: ["Planned", "Created"],
//             customer: ["SIEMENS HEALTHCARE PRIVATE LIMITED"],
//         },
//     };


//     // api 
//     const url1 =
//     "https://apis.fretron.com/automate/autoapi/run/255ab0db-70ed-4933-a0cc-b30b67b70955";
//     const url2 =
//     "https://apis.fretron.com/automate/autoapi/run/67953f4a-fb2d-4548-a86f-7b4ce2d710d2";
   
//     const url3 =
//         "https://script.googleusercontent.com/a/macros/agarwalpackers.com/echo?user_content_key=liluZGoKsVsI56pRMCbhaWgXdKTyvEzljs8wXtM7ZZwxRvYrxCKbroPEdPlGYY5qa9EQ6vY05Qi1xKcZE-Y8QzE0ZFrkxCriOJmA1Yb3SEsKFZqtv3DaNYcMrmhZHmUMi80zadyHLKCzuoJ5WTSD9188tqLxoWbKVeS6iIHTYzLJN6pUfYvVdeVlG5jFSmZBnga7jA1jJv2Ff-ndfXe0m_cBNwR9NdQAJQvZbyK2Sn14j10FjQKB0WW2AeJY_LhcNDLB45iwYI_Ty7jWPDs9-kALmaJ23tE4L5nWh-m0S0U&lib=Mste7nhVMiwHbCBqAdeBeQ0a1jiuL8Xjw";    

// }



// testing api 


const headers = {
    Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NjQ2MDI2MDIsInVzZXJJZCI6Ijc3N2Q5YzIwLTEyNWYtNDhhZS04MWZjLTUzZWI2ZWM3MjZmZSIsImVtYWlsIjoiZGF0YS5zY2llbmNlQGFnYXJ3YWxwYWNrZXJzLmNvbSIsIm1vYmlsZU51bWJlciI6IjgyOTE4NDk1NjUiLCJvcmdJZCI6IjQwNTJhYjI0LTA1NDMtNGNkNC1iNTE3LTllNzhlZmVlNGZlZCIsIm5hbWUiOiJQcml5YWVzaCBQYXRlbCIsIm9yZ1R5cGUiOiJGTEVFVF9PV05FUiIsImlzR29kIjpmYWxzZSwicG9ydGFsVHlwZSI6ImJhc2ljIn0.cJR4aISn0MMed1zPQqPxkMsZTn0_9N0W9n1D5mCzLMw",
    "Content-Type": "application/json",
};

const fltr1= {
    filters: {
        shipmentStatus: ["Planned", "Created", "Completed"],
        customer: ["SIEMENS HEALTHCARE PRIVATE LIMITED"],
        shipmentDate: {
            from: 1680287400000,
        },
    },
};




// const fltr2= {
//     filters: {
//         consigner: [
//             "SHPL- KOLKATA AIRPORT- SIEMENS HEALTHCARE PVT.LTD.",
//             "SHPL- CHENNAI SEAPORT- SIEMENS HEALTHCARE PVT.LTD.",
//             "SHPL- DELHI AIRPORT- SIEMENS HEALTHCARE PVT.LTD.",
//             "SHPL - APML BHIWANDI- SIEMENS HEALTHCARE PVT LTD",
//             "SHPL- BANGALORE AIRPORT- SIEMENS HEALTHCARE PVT.LTD.",
//             "SHPL-APML CHENNAI- SIEMENS HEALTHCARE PVT.LTD.",
//             "SHPL-KOLKATA WAREHOUSE- SIEMENS HEALTHCARE PVT.LTD.",
//             "SHPL-BANGALORE WAREHOUSE- SIEMENS HEALTHCARE PVT.LTD.",
//             "SHPL-CHENNAI WAREHOUSE- SIEMENS HEALTHCARE PVT.LTD.",
//             "SHPL-DELHI WAREHOUSE- SIEMENS HEALTHCARE PVT.LTD.",
//             "SHPL - NAVA SHEVA- SIEMENS HEALTHCARE PVT LTD",
//             "SHPL- KOLKATA SEAPORT- SIEMENS HEALTHCARE PVT.LTD.",
//             "SHPL- CHENNAI AIRPORT- SIEMENS HEALTHCARE PVT.LTD",
//             "SHPL - BGR WAREHOUSE- SIEMENS HEALTHCARE PVT.LTD",
//             "SHPL-APML BANGALORE- SIEMENS HEALTHCARE PVT.LTD.",
//             "SHPL - APML CHOWK - SIEMENS HEALTHCARE PVT LTD",
//             "SHPL - MUMBAI AIRPORT - SIEMENS HEALTHCARE PVT LTD",
//             "SHPL - PRESS METAL COMPANY - SIEMENS HEALTHCARE PVT. LTD.",
//             "SHPL - RAJLAXMI LOGISTICS PARK- SIEMENS HEALTHCARE PVT LTD",
//             "SHPL-GURGAON HARIYANA-SEIMENS HEALTHCARE PVT. LTD."
//         ],
//         orderDate: {
//             from: 1680287400000,
//         },
//     },
//     limit: 5000,
// };

// const fltr3 = {
//     filters: {
//         consigner: [
//             "SHPL- KOLKATA AIRPORT- SIEMENS HEALTHCARE PVT.LTD.",
//             "SHPL- CHENNAI SEAPORT- SIEMENS HEALTHCARE PVT.LTD.",
//             "SHPL- DELHI AIRPORT- SIEMENS HEALTHCARE PVT.LTD.",
//             "SHPL - APML BHIWANDI- SIEMENS HEALTHCARE PVT LTD",
//             "SHPL- BANGALORE AIRPORT- SIEMENS HEALTHCARE PVT.LTD.",
//             "SHPL-APML CHENNAI- SIEMENS HEALTHCARE PVT.LTD.",
//             "SHPL-KOLKATA WAREHOUSE- SIEMENS HEALTHCARE PVT.LTD.",
//             "SHPL-BANGALORE WAREHOUSE- SIEMENS HEALTHCARE PVT.LTD.",
//             "SHPL-CHENNAI WAREHOUSE- SIEMENS HEALTHCARE PVT.LTD.",
//             "SHPL-DELHI WAREHOUSE- SIEMENS HEALTHCARE PVT.LTD.",
//             "SHPL - NAVA SHEVA- SIEMENS HEALTHCARE PVT LTD",
//             "SHPL- KOLKATA SEAPORT- SIEMENS HEALTHCARE PVT.LTD.",
//             "SHPL- CHENNAI AIRPORT- SIEMENS HEALTHCARE PVT.LTD",
//             "SHPL - BGR WAREHOUSE- SIEMENS HEALTHCARE PVT.LTD",
//             "SHPL-APML BANGALORE- SIEMENS HEALTHCARE PVT.LTD.",
//             "SHPL - APML CHOWK - SIEMENS HEALTHCARE PVT LTD",
//             "SHPL - MUMBAI AIRPORT - SIEMENS HEALTHCARE PVT LTD",
//             "SHPL - PRESS METAL COMPANY - SIEMENS HEALTHCARE PVT. LTD.",
//             "SHPL - RAJLAXMI LOGISTICS PARK- SIEMENS HEALTHCARE PVT LTD",
//         ],
//         orderDate: {
//             from: 1680287400000,
//         },
//     },
//     limit: 5000,
// };


// const url1="https://apis.fretron.com/automate/autoapi/run/255ab0db-70ed-4933-a0cc-b30b67b70955";
// const url2="https://apis.fretron.com/automate/autoapi/run/67953f4a-fb2d-4548-a86f-7b4ce2d710d2";



// function fetching(){
//     const promise1=axios.post(url1, headers,fltr3 );
//     const promise2=axios.post(url2, headers, fltr1)

//     Promise.all([promise1, promise2]).then((message)=>{
//         console.log(message)
//     })
// }

// fetching();