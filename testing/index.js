

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




const fltr2= {
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
            "SHPL-GURGAON HARIYANA-SEIMENS HEALTHCARE PVT. LTD."
        ],
        orderDate: {
            from: 1680287400000,
        },
    },
    limit: 5000,
};

const fltr3 = {
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


const url1="https://apis.fretron.com/automate/autoapi/run/255ab0db-70ed-4933-a0cc-b30b67b70955";
const url2="https://apis.fretron.com/automate/autoapi/run/67953f4a-fb2d-4548-a86f-7b4ce2d710d2";



function fetching(){
    const promise1=axios.post(url1, headers,fltr3 );
    const promise2=axios.post(url2, headers, fltr1)

    Promise.all([promise1, promise2]).then((message)=>{
        console.log(message)
    })
}

fetching();