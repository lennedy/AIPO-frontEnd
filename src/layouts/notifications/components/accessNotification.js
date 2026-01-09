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


// Material Dashboard 2 React components
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import MDSnackbar from "components/MDSnackbar";

function AccessNotification() {

  const [acessoSB, setAcessoSB] = useState(false);

  const openAcessoSB = () => setAcessoSB(true);
  const closeAcessoSB = () => setAcessoSB(false);

  const SOCKET_URL = "http://localhost:5000";

  const authData = useAuth();
  const token  = authData.tokenLocal;

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
      openAcessoSB();
    });

    return () => {
      socket.offAny();
      socket.off("connect");
      socket.off("server_message");
      socket.off("mqtt_message");
    };
  }, []);

  const acessoComSucesso = (
    <MDSnackbar
      color="success"
      icon="notifications"
      title="Material Dashboard"
      content="Acesso realizado"
      dateTime="11 mins ago"
      open={acessoSB}
      onClose={closeAcessoSB}
      close={closeAcessoSB}
    />
  );


  return (
    <MDBox>
      {acessoComSucesso}
    </MDBox>
  );
}

export default AccessNotification;
