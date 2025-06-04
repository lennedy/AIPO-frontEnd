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

export default function ChartData() {
  const [acessosDomingo, setAcessosDomingo] = useState(0);
  const [acessosSegunda, setAcessosSegunda] = useState(0);
  const [acessosTerca, setAcessosTerca] = useState(0);
  const [acessosQuarta, setAcessosQuarta] = useState(0);
  const [acessosQuinta, setAcessosQuinta] = useState(0);
  const [acessosSexta, setAcessosSexta] = useState(0);
  const [acessosSabado, setAcessosSabado] = useState(0);

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
    fetch(api.database + "/acessosData", {
      method: "PUT",
      body: JSON.stringify(data_inicia_final),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((res) => res.json())
      .then((json) => {
        var domingo = 0;
        var segunda = 0;
        var terca = 0;
        var quarta = 0;
        var quinta = 0;
        var sexta = 0;
        var sabado = 0;
        if (json["status"] == "ok") {
          const dados = json["Dados"];
          for (var i = 0; i < json["numResults"]; i++) {
            const acessDate = new Date(dados[i]["timestamp"]);
            switch (formatDate(acessDate, "aa-mm-dd")) {
              case dates2[0]:
                domingo++;
                break;
              case dates2[1]:
                segunda++;
                break;
              case dates2[2]:
                terca++;
                break;
              case dates2[3]:
                quarta++;
                break;
              case dates2[4]:
                quinta++;
                break;
              case dates2[5]:
                sexta++;
                break;
              case dates2[6]:
                sabado++;
                break;
            }
          }
          setAcessosDomingo(domingo);
          setAcessosSegunda(segunda);
          setAcessosTerca(terca);
          setAcessosQuarta(quarta);
          setAcessosQuinta(quinta);
          setAcessosSexta(sexta);
          setAcessosSabado(sabado);

          // console.log(formatDate(new Date(dados[35]["timestamp"]), "aa-mm-dd"));
          // console.log(dates2[1]);
          // console.log(dados);
        }
      });
  }, []);

  return {
    labels: ["S", "T", "Q", "Q", "S", "S", "D"],
    datasets: {
      label: "Acessos",
      data: [
        acessosSegunda,
        acessosTerca,
        acessosQuarta,
        acessosQuinta,
        acessosSexta,
        acessosSabado,
        acessosDomingo,
      ],
    },
  };
}

// export default {
//   labels: ["M", "T", "W", "T", "F", "S", "S"],
//   datasets: { label: "Sales", data: [50, 20, 10, 22, 50, 10, 40] },
// };
