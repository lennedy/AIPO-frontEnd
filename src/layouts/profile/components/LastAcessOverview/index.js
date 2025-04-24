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

function LasAcessOverview() {
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

    fetch(api.database + "/dataAcessosPorDataPorUsuario/" + authData.user.matricula, {
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
        {ultimosAcessos.map((acesso, i, ultimosAcessos) => (
          <TimelineItem
            key={acesso.matricula}
            color={acesso.autorizado ? "success" : "error"}
            icon="vpn_key"
            title={acesso.nomeSala}
            dateTime={acesso.diahorario}
            lastItem={i + 1 >= ultimosAcessos.length ? true : false}
          />
        ))}
      </MDBox>
    </Card>
  );
}

export default LasAcessOverview;
