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
import { useState, useEffect, useMemo } from "react";

import getApiAddress from "serverAddress";

import formatDate from "util";

export default function ChartData(numAcessosPorDiaNaSemana) {
  const [acessosDomingo, setAcessosDomingo] = useState(0);
  const [acessosSegunda, setAcessosSegunda] = useState(0);
  const [acessosTerca, setAcessosTerca] = useState(0);
  const [acessosQuarta, setAcessosQuarta] = useState(0);
  const [acessosQuinta, setAcessosQuinta] = useState(0);
  const [acessosSexta, setAcessosSexta] = useState(0);
  const [acessosSabado, setAcessosSabado] = useState(0);
  const [numAcessos, setNumAcessos] = useState(
    [
      {"domingo": 5},
      {"segunda": 0},
      {"terca": 0},
      {"quarta": 0},
      {"quinta": 0},
      {"sexta": 0},
      {"sabado": 0},
    ]
  );

  useEffect(() => {
    let acessoSemana =[
      {"domingo": 5},
      {"segunda": 0},
      {"terca": 0},
      {"quarta": 0},
      {"quinta": 0},
      {"sexta": 0},
      {"sabado": 0},
    ];
    for (const acesso of numAcessosPorDiaNaSemana) {
      const dataSemana = new Date(acesso.dia);
      dataSemana.setHours(dataSemana.getHours() + 3);
      switch(dataSemana.getDay()){
        case 0:
          acessoSemana.domingo = acesso.qtd;
          break;
        case 1:
          acessoSemana.segunda = acesso.qtd;
          break;
        case 2:
          acessoSemana.terca = acesso.qtd;
          break;
        case 3:
          acessoSemana.quarta = acesso.qtd;
          break;
        case 4:
          acessoSemana.quinta = acesso.qtd;
          break;
        case 5:
          acessoSemana.sexta = acesso.qtd;
          break;
        case 6:
          acessoSemana.sabado = acesso.qtd;
          break;
      }
    }
    setNumAcessos(acessoSemana);
    setAcessosDomingo(acessoSemana.domingo);

  }, [numAcessosPorDiaNaSemana]);

  return useMemo(() =>({
    labels: ["S", "T", "Q", "Q", "S", "S", "D"],
    datasets: {
      label: "Acessos",
      data: [
        numAcessos.segunda,
        numAcessos.terca,
        numAcessos.quarta,
        numAcessos.quinta,
        numAcessos.sexta,
        numAcessos.sabado,
        numAcessos.domingo,
        acessosDomingo,
      ],
    },
  }), [numAcessos.domingo, numAcessos.segunda, numAcessos.terca, numAcessos.quarta, numAcessos.quinta, numAcessos.sexta, numAcessos.sabado]);
}

// export default {
//   labels: ["M", "T", "W", "T", "F", "S", "S"],
//   datasets: { label: "Sales", data: [50, 20, 10, 22, 50, 10, 40] },
// };
