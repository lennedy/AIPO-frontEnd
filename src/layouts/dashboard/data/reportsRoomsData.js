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

import { getDate_last30Days } from "util";

export default function RoomsData(acessosPorSala) {
  const [numAcessos, setNumAcessos] = useState([]);
  const [salasAcessadas, setSalasAcessadas] = useState([]);
  const [acessos, setAcessos] = useState(
    {
      salasAcessadas:["","","",""],
      numAcessos:[0,0,0,0],
    }
  );

  const NUM_MAXIMO_SALAS = 4;

  const data_inicia_final = useMemo(() => getDate_last30Days(),[]);

  useEffect(() => {
    console.log("acessosPorSala");
    console.log(acessosPorSala);
    let numAcessosSala=[];
    let salas=[];
    for (const sala of acessosPorSala){
      salas.push(sala.codigo);
      numAcessosSala.push(sala.qtd);
    }
    let a={salasAcessadas:[], numAcessos:[]};
    a.salasAcessadas = salas;
    a.numAcessos = numAcessosSala;

    setAcessos(a);

    // const api = getApiAddress();
    // fetch(api.database + "/getTodosAcessosPorSala", {
    //   method: "POST",
    //   body: JSON.stringify(data_inicia_final),
    //   headers: { "Content-type": "application/json; charset=UTF-8" },
    // })
    //   .then((res) => res.json())
    //   .then((json) => {
    //     if (json["status"] == "ok") {
    //       const dados = json["numAccess"];
    //       let todasSalas = Object.keys(dados);
    //       var acessos = [];
    //       var salasParaInterface = [];

    //       todasSalas.forEach((sala, i) => {
    //         if (todasSalas.length < NUM_MAXIMO_SALAS) {
    //           acessos.push(dados[sala]);
    //           salasParaInterface.push(sala);
    //         } else {
    //           if (i < NUM_MAXIMO_SALAS) {
    //             acessos.push(dados[sala]);
    //             salasParaInterface.push(sala);
    //           } else {
    //             let min = Math.min(...acessos);
    //             if (min < dados[sala]) {
    //               const minIndex = acessos.indexOf(min);
    //               acessos.splice(minIndex, 1);
    //               salasParaInterface.splice(minIndex, 1);

    //               acessos.push(dados[sala]);
    //               salasParaInterface.push(sala);
    //             }
    //           }
    //         }
    //       });
    //       setNumAcessos(acessos);
    //       setSalasAcessads(salasParaInterface);
    //     } else {
    //       alert("erro ao adquirir dados");
    //     }
    //   });
  }, [acessosPorSala]);

  const data = useMemo(() => ({
    acessosSalas: {
      labels: acessos.salasAcessadas,
      datasets: { label: "nº de acessos", data: acessos.numAcessos },
    },
  }), [acessos.salasAcessadas, acessos.numAcessos]);

  return data;
}