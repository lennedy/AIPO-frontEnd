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

import React from "react";
import { useState, useEffect } from "react";

import getApiAddress from "serverAddress";

import { getDate_last30Days } from "util";

export default function RoomsData() {
  const [numAcessos, setNumAcessos] = useState([]);
  const [salasAcessadas, setSalasAcessads] = useState([]);

  const NUM_MAXIMO_SALAS = 4;

  const data_inicia_final = getDate_last30Days();

  useEffect(() => {
    const api = getApiAddress();
    fetch(api.database + "/getTodosAcessosPorSala", {
      method: "POST",
      body: JSON.stringify(data_inicia_final),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json["status"] == "ok") {
          const dados = json["numAccess"];
          let todasSalas = Object.keys(dados);
          var acessos = [];
          var salasParaInterface = [];

          todasSalas.forEach((sala, i) => {
            if (todasSalas.length < NUM_MAXIMO_SALAS) {
              acessos.push(dados[sala]);
              salasParaInterface.push(sala);
            } else {
              if (i < NUM_MAXIMO_SALAS) {
                acessos.push(dados[sala]);
                salasParaInterface.push(sala);
              } else {
                let min = Math.min(...acessos);
                if (min < dados[sala]) {
                  const minIndex = acessos.indexOf(min);
                  acessos.splice(minIndex, 1);
                  salasParaInterface.splice(minIndex, 1);

                  acessos.push(dados[sala]);
                  salasParaInterface.push(sala);
                }
              }
            }
          });
          setNumAcessos(acessos);
          setSalasAcessads(salasParaInterface);
        } else {
          alert("erro ao adquirir dados");
        }
      });
  }, []);
  console.log(numAcessos);
  console.log(salasAcessadas);
  const data = {
    acessosSalas: {
      labels: salasAcessadas,
      datasets: { label: "nº de acessos", data: numAcessos },
    },
  };

  return data;
}

// export default {
//   labels: ["M", "T", "W", "T", "F", "S", "S"],
//   datasets: { label: "Sales", data: [50, 20, 10, 22, 50, 10, 40] },
// };
