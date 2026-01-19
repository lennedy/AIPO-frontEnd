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

import { useState, useEffect, useMemo } from "react";

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

function getQtdPorMes(mes, dados) {
  const item = dados.find(obj => obj.mes === mes);
  return item ? item.qtd : 0; // ou 0, ou undefined
}

export default function ChartData(acessosPorMes) {
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
  const [numAcessos, setNumAcessos] = useState([100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

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
    let array = [];
    for (let i = 1; i <= 12; i++) {
      // console.log(i);
      array.push( getQtdPorMes(i,acessosPorMes) );
    }
    setAcessosJaneiro(array[0]);
    setNumAcessos(array);
    
  }, [acessosPorMes]);

  const data = useMemo(() => ({
    sales: {
      labels: ["Jan", "Fev", "Mar", "Apr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
      datasets: {
        label: "acessos por mês",
        data: [
          numAcessos[0],
          numAcessos[1],
          numAcessos[2],
          numAcessos[3],
          numAcessos[4],
          numAcessos[5],
          numAcessos[6],
          numAcessos[7],
          numAcessos[8],
          numAcessos[9],
          numAcessos[10],
          numAcessos[11],
        ],
      },
    },
    tasks: {
      labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: { label: "Desktop apps", data: [50, 40, 300, 220, 500, 250, 400, 230, 500] },
    },
  }),[acessosJaneiro, acessosFevereiro, acessosMarco, acessosAbril, acessosMaio, acessosJunho,
    acessosJulho, acessosAgosto, acessosSetembro, acessosOutrubro, acessosNovembro, acessosDezembro]);

  return data;
}
