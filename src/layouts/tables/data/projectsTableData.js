/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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

// @mui material components
import Card from "@mui/material/Card";
import MenuItem from "@mui/material/MenuItem";
import Icon from "@mui/material/Icon";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";
//import FormComponent from "components/Form";

// Images
import LogoAsana from "assets/images/small-logos/logo-asana.svg";
import logoGithub from "assets/images/small-logos/github.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";
import React from "react";
import Popup from "reactjs-popup";
import ReactDom from "react-dom";
//import Popup from "react-popup";
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";
//import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "myContext";
//import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import Form from "examples/FormDoor";
import { useState, useEffect } from "react";

import getApiAddress from "serverAddress";

import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import robotica from "assets/images/lab-robotica.jpeg";

let disableUpdate = true;
let nameChanged = false;
var codeChanged = false;
let localChanged = false;
let fechaduraChanged = false;

const avatars = (members) =>
  members.map(([image, name]) => (
    <Tooltip key={name} title={name} placeholder="bottom">
      <MDAvatar
        src={image}
        alt="name"
        size="xs"
        sx={{
          border: ({ borders: { borderWidth }, palette: { white } }) =>
            `${borderWidth[2]} solid ${white.main}`,
          cursor: "pointer",
          position: "relative",

          "&:not(:first-of-type)": {
            ml: -1.25,
          },

          "&:hover, &:focus": {
            zIndex: "10",
          },
        }}
      />
    </Tooltip>
  ));

export default function Data() {
  const Project = ({ image, name, codigo }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{codigo}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const [Salas, setSalas] = useState(0);
  const [IsToUpdateRoom, setIsToUpdateRoom] = useState(true);

  useEffect(() => {
    if (IsToUpdateRoom) {
      const api = getApiAddress();
      fetch(api.database + "/salas")
        .then((res) => res.json())
        .then((data) => {
          setSalas(data);
        });
    }
  }, [IsToUpdateRoom]);

  function EditRoomForm({ identificador, defaultValue }) {
    const [inputName, setInputName] = useState(defaultValue.nomeSala);
    const [inputCode, setInputCode] = useState(defaultValue.codSala);
    const [inputLocal, setInputLocal] = useState(defaultValue.localizacao);
    const [inputFechadura, setInputFechadura] = useState(defaultValue.codFechadura);

    const handleName = (event) => {
      disableUpdate = false;
      nameChanged = true;
      setInputName(event.target.value);
    };
    const handleCode = (event) => {
      disableUpdate = false;
      codeChanged = true;
      setInputCode(event.target.value);
    };
    const handleLocal = (event) => {
      disableUpdate = false;
      localChanged = true;
      setInputLocal(event.target.value);
    };
    const handleFechadura = (event) => {
      disableUpdate = false;
      fechaduraChanged = true;
      setInputFechadura(event.target.value);
    };

    return (
      <Popup
        trigger={
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Edit
          </MDTypography>
        }
        onClose={() => {}}
        modal
        nested
      >
        {(close) => (
          <Card>
            <MDBox className="modal">
              <MDButton
                className="close"
                onClick={() => {
                  close();
                }}
              >
                &times;
              </MDButton>
              <MDBox display="flex" alignItems="center" justifyContent="center">
                <MDTypography variant="h6">Edição de Sala</MDTypography>
              </MDBox>
            </MDBox>
            <MDBox pt={3}></MDBox>
            <MDInput
              type="text"
              label="Nome da Sala"
              required="false"
              onChange={handleName}
              defaultValue={defaultValue.nomeSala}
              fullWidth
            ></MDInput>
            <MDInput
              name="teste"
              type="text"
              label="Código da Sala"
              required="false"
              onChange={handleCode}
              defaultValue={defaultValue.codSala}
              fullWidth
            ></MDInput>
            <MDInput
              label="Localização"
              required="false"
              size="large"
              onChange={handleLocal}
              defaultValue={defaultValue.localizacao}
              fullWidth
            ></MDInput>
            <MDInput
              type="text"
              label="Código da Fechadura"
              required="true"
              onChange={handleFechadura}
              defaultValue={defaultValue.codFechadura}
              fullWidth
            ></MDInput>
            <div className="actions">
              <MDButton
                className="button"
                onClick={() => {
                  console.log(inputName);
                  console.log(inputCode);
                  console.log(inputLocal);
                  console.log(inputFechadura);
                  console.log(identificador);
                  const dadosSala = {
                    nome: inputName,
                    codigo: inputCode,
                    local: inputLocal,
                    fechadura: inputFechadura,
                  };
                  // alert("Funcionalidade não implementada!");
                  setIsToUpdateRoom(false);
                  const api = getApiAddress();
                  fetch(api.database + "/sala/" + identificador, {
                    method: "PUT",
                    body: JSON.stringify(dadosSala),
                    headers: { "Content-type": "application/json; charset=UTF-8" },
                  })
                    .then((response) => response.json())
                    .then((json) => {
                      if (json["status"] == "ok") {
                        alert("modificação realizada");
                      } else {
                        alert("erro:" + json["status"]);
                      }
                    })
                    .catch((err) => console.log(err))
                    .finally(() => setIsToUpdateRoom(true));
                }}
              >
                atualizar
              </MDButton>
              <MDButton
                className="button"
                onClick={() => {
                  console.log("modal closed ");
                  close();
                }}
              >
                Cancelar
              </MDButton>
              <MDButton
                className="button"
                onClick={() => {
                  setIsToUpdateRoom(false);
                  const api = getApiAddress();
                  console.log(api.database + "/sala/" + identificador);
                  fetch(api.database + "/sala/" + identificador, {
                    method: "DELETE",
                    body: JSON.stringify(identificador),
                    headers: { "Content-type": "application/json; charset=UTF-8" },
                  })
                    .then((response) => response.json())
                    .then((json) => console.log(json))
                    .catch((err) => console.log(err))
                    .finally(() => setIsToUpdateRoom(true));
                }}
              >
                Apagar Registro
              </MDButton>
            </div>
          </Card>
        )}
      </Popup>
    );
  }

  const Progress = ({ color, value }) => (
    <MDBox display="flex" alignItems="center">
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {value}%
      </MDTypography>
      <MDBox ml={0.5} width="9rem">
        <MDProgress variant="gradient" color={color} value={value} />
      </MDBox>
    </MDBox>
  );

  let data =
    '{ "salas" : [' +
    '{ "codigo":"a208" , "Nome":"Robótica" , "Local":"anexo" , "Fechadura":"" },' +
    '{ "codigo":"212" , "Nome":"Estudo Informática" , "Local":"prédio principal" , "Fechadura":"" },' +
    '{ "codigo":"a111" , "Nome":"Maker" , "Local":"anexo" , "Fechadura":"" } ]}';

  const obj = JSON.parse(data);
  var salas = [];

  for (let key in Salas) {
    salas[key] = {
      sala: <Project image={robotica} name={Salas[key].nome} codigo={Salas[key].codigo} />,
      codigo: (
        <MDBox display="flex" py={1}>
          {avatars([
            [team1, "Ryan Tompson"],
            [team2, "Romina Hadid"],
            [team3, "Alexander Smith"],
            [team4, "Jessica Doe"],
          ])}
          <MDTypography component="a" href="#" color="text">
            <Icon>more_vert</Icon>
          </MDTypography>
        </MDBox>
      ),
      local: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {Salas[key].local}
        </MDTypography>
      ),
      fechadura: (
        <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
          {Salas[key].fechadura}
        </MDTypography>
      ),
      action: (
        <EditRoomForm
          identificador={Salas[key].id}
          defaultValue={{
            nomeSala: Salas[key].nome,
            codSala: Salas[key].codigo,
            localizacao: Salas[key].local,
            codFechadura: Salas[key].fechadura,
          }}
        />
      ),
    };
  }

  return {
    columns: [
      { Header: "Sala", accessor: "sala", width: "30%", align: "left" },
      { Header: "Código", accessor: "codigo", align: "left" },
      { Header: "Localização", accessor: "local", align: "center" },
      { Header: "fechadura", accessor: "fechadura", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: salas,
  };
}
