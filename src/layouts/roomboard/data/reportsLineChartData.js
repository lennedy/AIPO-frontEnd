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

function formatDate(date, format) {
  const map = {
    mm: date.getMonth() + 1,
    dd: date.getDate(),
    aa: date.getFullYear().toString().slice(-2),
    aaaa: date.getFullYear(),
  };

  return format.replace(/mm|dd|aa|aaaa/gi, (matched) => map[matched]);
}

export default function chartData() {
  const [acessosJaneiro, setAcessosJaneiro] = useState(100);
  const [acessosFevereiro, setAcessosFeveriero] = useState(0);
  const [acessosMarco, setAcessosMarco] = useState(0);
  const [acessosAbril, setAcessosAbril] = useState(0);
  const [acessosMaio, setAcessosMaio] = useState(0);
  const [acessosJunho, setAcessosJunho] = useState(0);
  const [acessosJulho, setAcessosJulho] = useState(0);
  const [acessosAgosto, setAcessosAgosto] = useState(0);
  const [acessosSetembro, setAcessosSetembro] = useState(0);
  const [acessosOutrubro, setAcessosOutubro] = useState(0);
  const [acessosNovembro, setAcessosNovembro] = useState(0);
  const [acessosDezembro, setAcessosDezembro] = useState(0);

  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);

  const ano_inicial = today.getFullYear() - 1;
  const mes_inicial = today.getMonth() + 1;

  const d_inicial = new Date(ano_inicial, mes_inicial);

  const data_inicia_final = {
    data_inicial: formatDate(d_inicial, "aa-mm-dd"),
    data_final: formatDate(today, "aa-mm-dd"),
  };

  useEffect(() => {
    const api = getApiAddress();
    fetch(api.database + "/acessosData", {
      method: "PUT",
      body: JSON.stringify(data_inicia_final),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((res) => res.json())
      .then((json) => {
        var jan = 0;
        var fev = 0;
        var mar = 0;
        var abr = 0;
        var mai = 0;
        var jun = 0;
        var jul = 0;
        var ago = 0;
        var set = 0;
        var out = 0;
        var nov = 0;
        var dez = 0;

        if (json["status"] == "ok") {
          const dados = json["Dados"];
          for (var i = 0; i < json["numResults"]; i++) {
            const acessDate = new Date(dados[i]["timestamp"]);
            const mes = acessDate.getMonth();
            switch (mes) {
              case 0:
                jan++;
                break;
              case 1:
                fev++;
                break;
              case 2:
                mar++;
                break;
              case 3:
                abr++;
                break;
              case 4:
                mai++;
                break;
              case 5:
                jun++;
                break;
              case 6:
                jul++;
                break;
              case 7:
                ago++;
                break;
              case 8:
                set++;
                break;
              case 9:
                out++;
                break;
              case 10:
                nov++;
                break;
              case 11:
                dez++;
                break;
            }
          }
          setAcessosJaneiro(jan);
          setAcessosFeveriero(fev);
          setAcessosMarco(mar);
          setAcessosAbril(abr);
          setAcessosMaio(mai);
          setAcessosJunho(jun);
          setAcessosJulho(jul);
          setAcessosAgosto(ago);
          setAcessosSetembro(set);
          setAcessosNovembro(nov);
          setAcessosOutubro(out);
          setAcessosDezembro(dez);
        }
      });
  }, []);

  const data = {
    sales: {
      labels: ["Jan", "Fev", "Mar", "Apr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
      datasets: {
        label: "acessos por mês",
        data: [
          acessosJaneiro,
          acessosFevereiro,
          acessosMarco,
          acessosAbril,
          acessosMaio,
          acessosJunho,
          acessosJulho,
          acessosAgosto,
          acessosSetembro,
          acessosOutrubro,
          acessosNovembro,
          acessosDezembro,
        ],
      },
    },
    tasks: {
      labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: { label: "Desktop apps", data: [50, 40, 300, 220, 500, 250, 400, 230, 500] },
    },
  };

  return data;
}
