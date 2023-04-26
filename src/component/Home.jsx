import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Main from "./Main";

export default function Home() {
  const token = sessionStorage.getItem("token");
  const nagivate = useNavigate();

  return (
    <>
      <main>
        <Main />
      </main>
    </>
  );
}
