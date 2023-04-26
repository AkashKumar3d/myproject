import React, { useState } from "react";
// import "../../login.css";
import img from "../../assets/logo1.png";
import { PropagateLoader } from "react-spinners";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../Redux/fetures/authentication.js';


export default function LoginForm() {
  const [inputs, setInputs] = useState({});
  const [loading, setloading] = useState(false);

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { error, status } = useSelector((state) => state.auth)
  // console.log(loading, "loading")
  console.log(error, "error")
  const handleChanges = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };



  const handleSubmit = async (event) => {
    event.preventDefault();
    let resData
    setloading(true)
    let rowData = await dispatch(login(inputs));

    if (rowData.payload.status === 202) {
      setloading(false)
      if (inputs.username === "admin") {
        sessionStorage.setItem("user", "VIEW BY ALL");

      } else {
        sessionStorage.setItem("user", inputs.username);
      }
      setloading(false)
      navigate("/home");
      
    }else{
      alert("invalid password or username");
      setloading(false)
    }
  };


  return (
    <>
      <div className="video-login">
        <img src="https://images.unsplash.com/photo-1494412519320-aa613dfb7738?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" />
      </div>
      <div className="hello">
        <form
          onSubmit={handleSubmit}
          style={{ margin: "0px" }}
          className="login-form"
        >
          <div
            className="form_contain1"
            style={{ display: "flex", backgroundColor: "transparent" }}
          >
            <img src={img} alt="apml" />
            <br />
            <br />
            <div className="vl"></div>+
            <div className="login_contain">
              <div
                className="form-outline mb-4"
                style={{
                  display: "flex",
                  alignContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <label className="form-label" htmlFor="form2Example1">
                  Username
                </label>
                <input
                  type="text"
                  id="form2Example1"
                  className="form-input"
                  name="username"

                  placeholder=" Username"
                  onChange={handleChanges}
                />
              </div>
              <br /> <br />
              <div
                className="form-outline mb-4"
                style={{
                  display: "flex",
                  alignContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <label className="form-label" htmlFor="form2Example2">
                  Password
                </label>
                <input
                  type="password"
                  id="form2Example2"
                  className="form-input"
                  name="password"

                  placeholder=" Password"
                  onChange={handleChanges}
                />
              </div>
              <br />
              <div
                style={{
                  display: "flex",
                  jusityContent: "center",
                  marginTop: "1.7rem",
                }}
              >
                <button
                  type="submit"
                  style={{
                    fontSize: "1.5rem",
                    color: "white",
                    backgroundColor: "transparent" //: "black",
                  }}
                  className="btn btn-primary btn-block mb-4"
                >
                  {loading? (
                    <PropagateLoader color={"rgb(3, 204, 255,1)"} size={10} />
                  ) : (
                    <>Sign in</>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
