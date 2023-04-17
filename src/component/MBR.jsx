import React, { useEffect, useState } from "react";
import { AiOutlineLineChart } from "react-icons/ai";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { Mbr } from "../common/tablevariabls";

const MBR = () => {


  return (
    <>
      <main>
        <div className="main_table-heading">
          <div className="heading">
            <AiOutlineLineChart
              className="heading-icon"
              style={{ color: "orange" }}
            />
            <h1>
              MBR <span>5</span>
            </h1>
          </div>
        </div>

        <>
          <iframe
            style={{
              background: "#252525",
              border: "none",
              borderRadius: "2px",
              boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
              width: "100vw",
              height: "100vh",
            }}
            src="https://charts.mongodb.com/charts-project-0-ixrdr/embed/dashboards?id=640fea27-e1ba-4465-8c63-3db4bc804f10&theme=dark&autoRefresh=true&maxDataAge=300&showTitleAndDesc=true&scalingWidth=fixed&scalingHeight=fixed"
          ></iframe>
          <table>
            <thead>
              <tr>
                {Mbr.map((res)=>{
                  return(
                    <th className="table-th">{res}</th>
                  )
                  
                })}
                
              </tr>
            </thead>
            <tbody>

              <tr>
                <td className="td-main">

                </td>
                <td className="td-main">

                </td>
                <td className="td-main">created</td>
                <td className="td-main">

                </td>
                <td
                  className="td-main"
                  style={{
                    fontWeight: "bolder",
                    color: "red"
                  }}
                >

                </td>
                <td
                  className="td-main"
                  style={{
                    fontWeight: "bolder",
                    color: "red"
                  }}
                >

                </td>
                <td
                  className="td-main"
                  style={{
                    fontWeight: "bolder",
                    color: "red"
                  }}
                >

                </td>
                <td className="td-main">

                </td>
                <td className="td-main">

                </td>
                <td className="td-main">

                </td>
                <td className="td-main">

                </td>
                <td className="td-main">-</td>
                <td className="td-main">-</td>
                <td className="td-main">

                </td>
                <td className="td-main">

                </td>
                <td className="td-main">

                </td>
                <td className="td-main">

                </td>
                <td className="td-main">

                </td>
                <td className="td-main">

                </td>
                <td className="td-main">

                </td>
                <td className="td-main">

                </td>
                <td className="td-main">

                </td>
                <td className="td-main">

                </td>
                <td className="td-main">

                </td>
                <td className="td-main">

                </td>
                <td className="td-main">

                </td>
                <td className="td-main">

                </td>
                <td className="td-main">

                </td>
                <td className="td-main" style={{ lineHeight: "2rem" }}>


                </td>
              </tr>
            </tbody>
          </table>
        </>

      </main>
    </>
  );
};

export default MBR;
