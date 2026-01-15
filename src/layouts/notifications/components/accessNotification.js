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

import { useAuth } from "context/AuthProvider";


// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDSnackbar from "components/MDSnackbar";

import getApiAddress from "serverAddress";

function AccessNotification() {
  function timestamp2DataHora(timestamp){
    const dataHora = new Date(timestamp);
    const diasSemana = [
      "domingo",
      "segunda-feira",
      "terça-feira",
      "quarta-feira",
      "quinta-feira",
      "sexta-feira",
      "sábado"
    ];

    const diaSemana = diasSemana[dataHora.getUTCDay()];
    const hora = String(dataHora.getUTCHours()).padStart(2, "0");
    const minuto = String(dataHora.getUTCMinutes()).padStart(2, "0");
    const segundo = String(dataHora.getUTCSeconds()).padStart(2, "0");

    const dataHoraFormatado = `${diaSemana}, ${hora}:${minuto}:${segundo}`;
    return dataHoraFormatado;
  }

  const [acessoSB, setAcessoSB] = useState(false);
  // const [payload, setPayload] = useState({usuario:"", sala:"", horario: "", sucesso:"false"});
  const [mensagem, setMensagem] = useState("");
  const [sucessoAcesso, setSucessoAcesso] = useState("");
  const [horario, setHorario] =useState("");

  const openAcessoSB = () => setAcessoSB(true);
  const closeAcessoSB = () => setAcessoSB(false);

  const authData = useAuth();

  useEffect(() => {

    const socket = authData.socket;
    if (!socket) return;

    socket.onAny((event, ...args) => {
      // console.log("[socket.io] evento recebido:", event, args);
    });

    socket.on("connect", () => {
      console.log("Conectado ao backend via WebSocket. ID:", socket.id);
    });

    socket.on("server_message", (msg) => {
      console.log("Mensagem do servidor:", msg);
    });

    socket.on("access_message", (payload) => {
      const api = getApiAddress();
      
      if(payload.data.erro == true){
        setMensagem("Porta não cadastrada");
        setSucessoAcesso("erro");
        const dataHora = timestamp2DataHora(payload.data.timestamp);
        setHorario(dataHora);

      } else if(payload.data.chaveCadastrada == false){
        setMensagem("Chave não cadastrada para qualquer usuário");
        setSucessoAcesso("warning");
        const dataHora = timestamp2DataHora(payload.data.timestamp);
        setHorario(dataHora);
      } else {
        fetch(api.database + "/dataAcessos/"+payload.data.id, {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            // Authorization: "Bearer " + authData.tokenLocal,
          },
        })
        .then((res) => res.json())
        .then((data) => {
          const dadosBanco = data.data;

          setMensagem(dadosBanco.nome+" acessou a sala "+dadosBanco.codigo);
          const dataHoraFormatado = timestamp2DataHora(dadosBanco.timestamp);

          setHorario(dataHoraFormatado);
          setSucessoAcesso("notification");
        });
      }
      openAcessoSB();
    });

    return () => {
      socket.offAny();
      socket.off("connect");
      socket.off("server_message");
      socket.off("mqtt_message");
    };

  }, [authData.socket]);

  const acessoComSucesso = (
    <MDSnackbar
      color={sucessoAcesso==="erro"? "error": (sucessoAcesso=="warning" ? "warning" : "success")}
      icon={sucessoAcesso==="erro"? "error": (sucessoAcesso=="warning" ? "warning" : "notifications")}
      title={sucessoAcesso==="erro"? "error": (sucessoAcesso=="warning" ? "Advertência" : "Acesso realizado")}
      content={mensagem}
      dateTime={horario}
      open={acessoSB}
      onClose={closeAcessoSB}
      close={closeAcessoSB}
      bgWhite
    />
  );


  return (
    <MDBox>
      {acessoComSucesso}
    </MDBox>
  );
}

export default AccessNotification;
