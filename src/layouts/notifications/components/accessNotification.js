/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useEffect, useState } from "react";

import { io } from "socket.io-client";

import { useAuth } from "context/AuthProvider";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAlert from "components/MDAlert";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function AccessNotification() {
  const [successSB, setSuccessSB] = useState(false);
  const [infoSB, setInfoSB] = useState(false);
  const [warningSB, setWarningSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);

  const [acessoSB, setAcessoSB] = useState(false);

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const openInfoSB = () => setInfoSB(true);
  const closeInfoSB = () => setInfoSB(false);
  const openWarningSB = () => setWarningSB(true);
  const closeWarningSB = () => setWarningSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  const openAcessoSB = () => setAcessoSB(true);
  const closeAcessoSB = () => setAcessoSB(false);

  const SOCKET_URL = "http://localhost:5000";

  const authData = useAuth();
  const token  = authData.tokenLocal;

  // const socket = io(SOCKET_URL);

  const socket =  io(SOCKET_URL, {
                    auth: { token },
                    transports: ["websocket"], // opcional
                  });

  useEffect(() => {
    socket.onAny((event, ...args) => {
      console.log("[socket.io] evento recebido:", event, args);
    });

    socket.on("connect", () => {
      console.log("Conectado ao backend via WebSocket. ID:", socket.id);
    });

    socket.on("server_message", (msg) => {
      console.log("Mensagem do servidor:", msg);
    });

    socket.on("mqtt_message", (payload) => {
      console.log("Recebi do backend (mqtt_message):", payload);
      // openInfoSB();
      openAcessoSB();
      // setLastMessage(payload);
      // setMessages((old) => [payload, ...old]);
    });

    return () => {
      socket.offAny();
      socket.off("connect");
      socket.off("server_message");
      socket.off("mqtt_message");
    };
  }, []);

  const alertContent = (name) => (
    <MDTypography variant="body2" color="white">
      A simple {name} alert with{" "}
      <MDTypography component="a" href="#" variant="body2" fontWeight="medium" color="white">
        an example link
      </MDTypography>
      . Give it a click if you like.
    </MDTypography>
  );

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="Material Dashboard"
      content="Hello, world! This is a notification message"
      dateTime="11 mins ago"
      open={successSB}
      onClose={closeSuccessSB}
      close={closeSuccessSB}
      bgWhite
    />
  );

  const renderInfoSB = (
    <MDSnackbar
      icon="notifications"
      title="Material Dashboard"
      content="Hello, world! This is a notification message"
      dateTime="11 mins ago"
      open={infoSB}
      onClose={closeInfoSB}
      close={closeInfoSB}
    />
  );

  const acessoComSucesso = (
    <MDSnackbar
      icon="notifications"
      title="Material Dashboard"
      content="Acesso realizado"
      dateTime="11 mins ago"
      open={acessoSB}
      onClose={closeAcessoSB}
      close={closeAcessoSB}
    />
  );


  const renderWarningSB = (
    <MDSnackbar
      color="warning"
      icon="star"
      title="Material Dashboard"
      content="Hello, world! This is a notification message"
      dateTime="11 mins ago"
      open={warningSB}
      onClose={closeWarningSB}
      close={closeWarningSB}
      bgWhite
    />
  );

  const renderErrorSB = (
    <MDSnackbar
      color="error"
      icon="warning"
      title="Material Dashboard"
      content="Hello, world! This is a notification message"
      dateTime="11 mins ago"
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );

  return (
    <DashboardLayout>
      {acessoComSucesso}
      <Footer />
    </DashboardLayout>
  );
}

export default AccessNotification;
