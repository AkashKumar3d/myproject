import img1 from "../assets/logo1.png";
import {
  MdOutlinePendingActions,
  MdOutlinePayment,
  MdSpatialTracking,
  MdOutlineEscalator,
} from "react-icons/md";
import {
  AiOutlineFileDone,
  AiOutlineAreaChart,
  AiOutlineLineChart,
  AiOutlineLogout,
} from "react-icons/ai";
import {
  FaTruckPickup,
  FaTruckLoading,
  FaCreativeCommonsSa,
  FaWpforms,
} from "react-icons/fa";
import { BsMinecartLoaded } from "react-icons/bs";
import { GiTruck } from "react-icons/gi";
import { RxDashboard } from "react-icons/rx";
import { RiBilliardsFill } from "react-icons/ri";
import {  NavLink, useNavigate } from "react-router-dom";
import logo1 from "../assets/Siemens_Healthineers_logo.png";
import { aside_option } from "../common/tablevariabls.js";
import { useDispatch, useSelector } from "react-redux";
import {  fetchingdata } from "../Redux/fetures/tablesclice";
import { useEffect } from "react";
const Aside = () => {
const navigate=useNavigate()
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="container">
      <div className="back-style">
        <aside>
          <div className="top">
            <div className="logo">
              <img src={img1} alt="" className="img1" />
              <>
               
                <img src={logo1} alt="" className="logo1" />
              </>
            </div>
          </div>

          <div className="side-bar">
            <NavLink
              to="/home"
              className="active"
            >
              <span>
                <RxDashboard className="custome-svg" />
              </span>
              <h3>DASHBOARD </h3>
            </NavLink>

            <div
              style={{
                borderBottom: "1px solid #0ff",
                marginTop: "1rem",
                marginBottom: "1rem",
              }}
            ></div>
            <div className="aside_select-main">
              <select
                onChange={(e) => {
                  sessionStorage.setItem("user", e.target.value);
                  // setUser(e.target.value);
                }}
                // value={user}
                className="aside-select"
              >
                {aside_option.map((res)=>{
                  return(
                    <option value={res.value}>{res.name}</option>
                  )
                })
                }
              </select>
            </div>

            <div
              style={{
                borderBottom: "1px solid #0ff",
                marginTop: "1rem",
                marginBottom: "1rem",
              }}
            ></div>

            <NavLink
              to="/orderform"
              className="active"
            >
              <span>
                {" "}
                <FaWpforms className="custome-svg" />
              </span>
              <h3>ORDER FORM</h3>
            </NavLink>

            <NavLink
              to="/pendingorder"
              className="active"
            >
              <span>
                <MdOutlinePendingActions className="custome-svg" />
              </span>
              <h3>PENDING ORDERS </h3>
            </NavLink>

            <NavLink
              to="/enrouteforpicup"
              className="active"
            >
              <span>
                {" "}
                <FaTruckPickup className="custome-svg" />
              </span>
              <h3>ENROUTE FOR PICKUP </h3>
            </NavLink>

            <NavLink
              to="/atpickup"
              className="active"
            >
              <span>
                {" "}
                <FaTruckLoading className="custome-svg" />
              </span>
              <h3>AT PICKUP </h3>
            </NavLink>

            <NavLink
              to="/intransit"
              className="active"
            >
              <span>
                {" "}
                <GiTruck className="custome-svg" />
              </span>
              <h3>INTRANSIT </h3>
            </NavLink>

            <NavLink
              to="/atunloading"
              className="active"
            >
              <span>
                {" "}
                <BsMinecartLoaded className="custome-svg" />
              </span>
              <h3>AT UNLOADING </h3>
            </NavLink>

            <NavLink
              to="/completed"
              className="active"
            >
              <span>
                {" "}
                <AiOutlineFileDone className="custome-svg" />
              </span>
              <h3>COMPLETED </h3>
            </NavLink>

            <NavLink
              to="/tentativecalculator"
              className="active"
            >
              <span>
                {" "}
                <AiOutlineFileDone className="custome-svg" />
              </span>
              <h3>TENTATIVE CALCULATOR</h3>
            </NavLink>

            

            <NavLink
              to="/billing"
              className="active"
            >
              <span>
                {" "}
                <RiBilliardsFill className="custome-svg" />
              </span>
              <h3>BILLING </h3>
            </NavLink>

            <NavLink
              to="/payment"
              className="active"
            >
              <span>
                {" "}
                <MdOutlinePayment className="custome-svg" />
              </span>
              <h3>PAYMENT</h3>
            </NavLink>

            <NavLink
              to="/charts"
              className="active"
            >
              <span>
                {" "}
                <AiOutlineAreaChart className="custome-svg" />
              </span>
              <h3>CHARTS</h3>
            </NavLink>

            <NavLink
              to="/mbr"
              className="active"
            >
              <span>
                {" "}
                <AiOutlineLineChart className="custome-svg" />
              </span>
              <h3>MBR</h3>
            </NavLink>


            <div
              style={{
                borderBottom: "1px solid #0ff",
                marginTop: "1rem",
                marginBottom: "1rem",
              }}
            ></div>

            <NavLink
              to="/trackingupdate"
              className="active"
            >
              <span>
                {" "}
                <MdSpatialTracking className="custome-svg" />
              </span>
              <h3>TRACKING UPDATE</h3>
            </NavLink>

            <NavLink
              to="/escalations"
              className="active"
            >
              <span>
                {" "}
                <MdOutlineEscalator className="custome-svg" />
              </span>
              <h3>ESCALATIONS</h3>
            </NavLink>

            <NavLink
              to="/abnormalities"
              className="active"
            >
              <span>
                {" "}
                <FaCreativeCommonsSa className="custome-svg" />
              </span>
              <h3>ABNORMALITIES</h3>
            </NavLink>

            <div
              style={{
                borderBottom: "1px solid #0ff",
                marginTop: "1rem",
                marginBottom: "1rem",
              }}
            ></div>
            <div className="logout-main">
              <span>
                <AiOutlineLogout className="custome-svg" />
              </span>
              <button className="button__logout" onClick={handleLogout}>
                LOG OUT
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Aside;
