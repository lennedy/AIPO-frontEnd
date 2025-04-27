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

  const NUM_MAXIMO_SALAS = 5;
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  //const formatedToday = formatDate(today, "aa-mm-dd");

  const dates = [];
  const dates2 = [];
  const day = new Date();
  for (var i = 0; i < 7; i++) {
    day.setDate(today.getDate() - i);
    dates.push({ week: day.getDay(), date: formatDate(day, "aa-mm-dd") });
    dates2[day.getDay()] = formatDate(day, "aa-mm-dd");
  }

  const data_inicia_final = { data_inicial: dates[6]["date"], data_final: dates[0]["date"] };

  // console.log(dates);

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
          console.log(json);
          const dados = json["numAccess"];
          let salas = Object.keys(dados);
          var acessos = [];
          // for (var i = 0; i < dados.length; i++) {
          //   acessos.push(dados[i]);
          // }
          salas.forEach((sala) => {
            if (salas.length < NUM_MAXIMO_SALAS) {
              console.log(sala);
              console.log(dados);
              acessos.push(salas[sala]);
            }
          });
          setNumAcessos(acessos);
          console.log(acessos);

          // console.log(formatDate(new Date(dados[35]["timestamp"]), "aa-mm-dd"));
          // console.log(dates2[1]);
          // console.log(dados);
        }
      });
  }, []);

  const data = {
    acessosSalas: {
      labels: ["a208", "a111", "203", "201", "212"],
      datasets: { label: "nº de acessos", data: [50, 40, 300, 220, 500] },
    },
  };

  return data;
}

// export default {
//   labels: ["M", "T", "W", "T", "F", "S", "S"],
//   datasets: { label: "Sales", data: [50, 20, 10, 22, 50, 10, 40] },
// };
