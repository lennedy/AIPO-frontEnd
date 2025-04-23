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

import { useState, useEffect } from "react";
import getApiAddress from "serverAddress";
import { useAuth } from "context/AuthProvider";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import TimelineItem from "examples/Timeline/TimelineItem";
import formatDate from "util";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

function LasAcessOverview({ codigo_salas }) {
  const NUMERO_MAXIMO_ACESSOS_PARA_EXIBIR = 5;
  const [acessosMensais, setAcessosMensais] = useState(1);
  const [ultimosAcessos, setUltimosAcessos] = useState([]);
  const authData = useAuth();

  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);

  const ano_inicial = today.getFullYear();
  const mes_inicial = today.getMonth() - 1;

  const d_inicial = new Date(ano_inicial, mes_inicial);

  const data_inicia_final = {
    data_inicial: formatDate(d_inicial, "aa-mm-dd"),
    data_final: formatDate(today, "aa-mm-dd"),
  };

  useEffect(() => {
    const api = getApiAddress();

    fetch(api.database + "/getAcessosPorSala/" + codigo_salas, {
      method: "POST",
      body: JSON.stringify(data_inicia_final),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json["status"] == "ok") {
          const data = json["data"];
          const tamanhoVetor = data.length;
          let ArrayFrontEnd = [];
          const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          };
          console.log("usuarios autorizados por sala");
          console.log(data);

          if (tamanhoVetor > NUMERO_MAXIMO_ACESSOS_PARA_EXIBIR) {
            for (let i = 1; i <= NUMERO_MAXIMO_ACESSOS_PARA_EXIBIR; i++) {
              var dateTime = new Date(data[tamanhoVetor - i].timestamp);
              dateTime.setHours(dateTime.getHours() + 3); //corrigindo a hora para o horário de brasilia
              const diaHorario = dateTime.toLocaleTimeString("pt-br", options);
              const nomeSala = data[tamanhoVetor - i].nome;
              const autorizado = data[tamanhoVetor - i].autorizado;
              const codigo = data[tamanhoVetor - i].codigo;
              ArrayFrontEnd.push({
                diahorario: diaHorario,
                nomeSala: nomeSala,
                autorizado: autorizado,
                codigo: codigo,
              });
            }
            console.log(ArrayFrontEnd);
          } else {
            for (let i = 1; i <= tamanhoVetor; i++) {
              const dateTime = new Date(data[tamanhoVetor - i].timestamp);
              const diaHorario = dateTime.toLocaleTimeString("pt-br", options);
              const nomeSala = data[tamanhoVetor - i].nome;
              const autorizado = data[tamanhoVetor - i].autorizado;
              const codigo = data[tamanhoVetor - i].codigo;
              ArrayFrontEnd.push({
                diahorario: diaHorario,
                nomeSala: nomeSala,
                autorizado: autorizado,
                codigo: codigo,
              });
            }
          }
          setUltimosAcessos(ArrayFrontEnd);
        } else {
          alert("erro:" + json["status"]);
        }
      })
      .catch((err) => console.log(err));

    fetch(api.database + "/acessosPorUsuario/" + authData.user.matricula, {
      method: "POST",
      body: JSON.stringify(data_inicia_final),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json["status"] == "ok") {
          const data = json["data"];
          let numAcessos = 0;
          for (let key in data) {
            console.log(data[key]);
            numAcessos = data[key] + numAcessos;
          }
          setAcessosMensais(numAcessos);
        } else {
          alert("erro:" + json["status"]);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  console.log("TEste");
  console.log(ultimosAcessos.length);
  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={3} px={3}>
        <MDTypography variant="h6" fontWeight="medium">
          Últimos Acessos
        </MDTypography>
        <MDBox mt={0} mb={2}>
          <MDTypography variant="button" color="text" fontWeight="regular">
            &nbsp;
            <MDTypography variant="button" color="text" fontWeight="medium">
              {acessosMensais}
            </MDTypography>{" "}
            {acessosMensais == 1 ? "acesso nos últimos 30 dias" : "acessos nos últimos 30 dias"}
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox p={2}>
        <TimelineItem
          color={
            ultimosAcessos.length >= 5
              ? ultimosAcessos[ultimosAcessos.length - 5].autorizado
                ? "success"
                : "error"
              : "error"
          }
          icon="vpn_key"
          title={
            ultimosAcessos.length >= 5 ? ultimosAcessos[ultimosAcessos.length - 5].nomeSala : ""
          }
          dateTime={
            ultimosAcessos.length >= 5 ? ultimosAcessos[ultimosAcessos.length - 5].diahorario : "0"
          }
          display={ultimosAcessos.length >= NUMERO_MAXIMO_ACESSOS_PARA_EXIBIR ? true : false}
        />
        <TimelineItem
          color={
            ultimosAcessos.length >= 4
              ? ultimosAcessos[ultimosAcessos.length - 4].autorizado
                ? "success"
                : "error"
              : "error"
          }
          icon="vpn_key"
          title={
            ultimosAcessos.length >= 4 ? ultimosAcessos[ultimosAcessos.length - 4].nomeSala : ""
          }
          dateTime={
            ultimosAcessos.length >= 4 ? ultimosAcessos[ultimosAcessos.length - 4].diahorario : "0"
          }
          display={ultimosAcessos.length >= NUMERO_MAXIMO_ACESSOS_PARA_EXIBIR - 1 ? true : false}
        />
        <TimelineItem
          color={
            ultimosAcessos.length >= 3
              ? ultimosAcessos[ultimosAcessos.length - 3].autorizado
                ? "success"
                : "error"
              : "error"
          }
          icon="vpn_key"
          title={
            ultimosAcessos.length >= 3 ? ultimosAcessos[ultimosAcessos.length - 3].nomeSala : ""
          }
          dateTime={
            ultimosAcessos.length >= 3 ? ultimosAcessos[ultimosAcessos.length - 3].diahorario : "0"
          }
          display={ultimosAcessos.length >= NUMERO_MAXIMO_ACESSOS_PARA_EXIBIR - 2 ? true : false}
        />
        <TimelineItem
          color={
            ultimosAcessos.length >= 2
              ? ultimosAcessos[ultimosAcessos.length - 2].autorizado
                ? "success"
                : "error"
              : "error"
          }
          icon="vpn_key"
          title={
            ultimosAcessos.length >= 2 ? ultimosAcessos[ultimosAcessos.length - 2].nomeSala : ""
          }
          dateTime={
            ultimosAcessos.length >= 2 ? ultimosAcessos[ultimosAcessos.length - 2].diahorario : "0"
          }
          display={ultimosAcessos.length >= NUMERO_MAXIMO_ACESSOS_PARA_EXIBIR - 3 ? true : false}
        />
        <TimelineItem
          color={
            ultimosAcessos.length >= 1
              ? ultimosAcessos[ultimosAcessos.length - 1].autorizado
                ? "success"
                : "error"
              : "error"
          }
          icon="vpn_key"
          title={
            ultimosAcessos.length >= 1 ? ultimosAcessos[ultimosAcessos.length - 1].nomeSala : ""
          }
          dateTime={
            ultimosAcessos.length >= 1 ? ultimosAcessos[ultimosAcessos.length - 1].diahorario : "0"
          }
          lastItem
          display={ultimosAcessos.length >= NUMERO_MAXIMO_ACESSOS_PARA_EXIBIR - 4 ? true : false}
        />
      </MDBox>
    </Card>
  );
}

// Typechecking props for the RoomList
LasAcessOverview.propTypes = {
  codigo_salas: PropTypes.string.isRequired,
};

export default LasAcessOverview;
