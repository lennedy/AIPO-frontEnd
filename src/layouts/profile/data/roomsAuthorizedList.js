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

// Images
import kal from "assets/images/kal-visuals-square.jpg";
import marie from "assets/images/marie.jpg";
import ivana from "assets/images/ivana-square.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import robotica from "assets/images/lab-robotica.jpeg";

function formatDate(date, format) {
  const map = {
    mm: date.getMonth() + 1,
    dd: date.getDate(),
    aa: date.getFullYear().toString().slice(-2),
    aaaa: date.getFullYear(),
  };

  return format.replace(/mm|dd|aa|aaaa/gi, (matched) => map[matched]);
}

export default function Data() {
  const [Salas, setSalas] = useState([]);
  const [Acessos, setAcessos] = useState([]);
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

    fetch(api.database + "/acessosPorUsuario/" + authData.user.matricula, {
      method: "POST",
      body: JSON.stringify(data_inicia_final),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json["status"] == "ok") {
          const data = json["data"];
          setAcessos(data);
        } else {
          alert("erro:" + json["status"]);
        }
      })
      .catch((err) => console.log(err));

    fetch(api.database + "/salasAutorizadas/" + authData.user.matricula, {
      method: "POST",
      body: JSON.stringify(""),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json["status"] == "ok") {
          const data = json["data"];
          let dadosSala = [];
          for (let key in data) {
            dadosSala.push({ nomeSala: data[key].nome, codSala: data[key].codigo });
          }
          setSalas(dadosSala);
        } else {
          alert("erro:" + json["status"]);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  let salasAutorizadas = [];
  let sala;
  for (let key in Salas) {
    sala = {
      image: robotica,
      nomeSala: Salas[key].nomeSala,
      numSala: Salas[key].codSala,
      // numAcessos: Acessos[Salas[key].codSala] == null ? 0 : Acessos[Salas[key].codSala],
      action: {
        type: "internal",
        route: "/pages/profile/profile-overview",
        color: "info",
        label: "reply",
      },
    };
    salasAutorizadas.push(sala);
  }

  return salasAutorizadas;
}
