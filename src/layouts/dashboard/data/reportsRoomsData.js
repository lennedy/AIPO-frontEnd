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

function formatDate(date, format) {
  const map = {
    mm: date.getMonth() + 1,
    dd: date.getDate(),
    aa: date.getFullYear().toString().slice(-2),
    aaaa: date.getFullYear(),
  };

  return format.replace(/mm|dd|aa|aaaa/gi, (matched) => map[matched]);
}

export default function roomsData() {
  const [numAcessos, setNumAcessos] = useState([]);
  const [salasAcessadas, setSalasAcessads] = useState([]);

  const NUM_MAXIMO_SALAS = 2;
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  //const formatedToday = formatDate(today, "aa-mm-dd");

  const ano_inicial = today.getFullYear();
  const mes_inicial = today.getMonth() - 1;

  const d_inicial = new Date(ano_inicial, mes_inicial);

  const data_inicia_final = {
    data_inicial: formatDate(d_inicial, "aa-mm-dd"),
    data_final: formatDate(today, "aa-mm-dd"),
  };

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
          console.log("json");
          // console.log(data_inicia_final);
          console.log(json);
          const dados = json["numAccess"];
          console.log(dados);
          console.log(dados["A111"]);
          let todasSalas = Object.keys(dados);
          var acessos = [];
          var salasParaInterface = [];

          todasSalas.forEach((sala, i) => {
            if (todasSalas.length < NUM_MAXIMO_SALAS) {
              console.log(sala);
              console.log(i);
              console.log(dados);
              acessos.push(dados[sala]);
              salasParaInterface.push(sala);
            } else {
              if (i < NUM_MAXIMO_SALAS) {
                acessos.push(dados[sala]);
                salasParaInterface.push(sala);
              } else {
                let min = Math.min(...acessos);
                console.log(min);
                console.log("acessos");
                console.log(acessos);
                if (min < dados[sala]) {
                  // acessos = acessos.filter((num) => num !== min);
                  acessos = acessos.reduce((newArray, currentElement, index) => {
                    if (currentElement !== min) {
                      newArray.push(currentElement);
                      console.log("index");
                      console.log(index);
                    } else {
                      console.log(index);
                      salasParaInterface = salasParaInterface.filter(
                        (value) => value != salasParaInterface[index]
                      );
                    }
                    return newArray;
                  }, []);
                  acessos.push(dados[sala]);
                  salasParaInterface.push(sala);
                }
              }
            }
          });
          setNumAcessos(acessos);
          setSalasAcessads(salasParaInterface);
          console.log(acessos);
          console.log(salasParaInterface);
        }
      });
  }, []);
  console.log("what the fuck is going on");
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
