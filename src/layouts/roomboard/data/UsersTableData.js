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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

import React from "react";
import { useState, useEffect } from "react";
import Popup from "reactjs-popup";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Switch from "@mui/material/Switch";

import Card from "@mui/material/Card";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import Chip from "@mui/material/Chip";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useTheme } from "@mui/material/styles";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import LogoAsana from "assets/images/small-logos/logo-asana.svg";
import logoRobotica from "assets/images/lab-robotica.jpeg";
import logoRobotica2 from "assets/images/logo-robotica-small2.png";
import UserImg from "assets/images/usuario.png";
import logoTeste from "assets/images/logos/logo-teste.jpg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";

//meus componentes
import MySelect from "layouts/tables/myComponents";

import getApiAddress from "serverAddress";
import { Hidden } from "@mui/material";

export default function data(codigoSala, editState, usuariosParaEditar) {
  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

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

  const [currentTime, setCurrentTime] = useState(0);
  const [Usuarios, setUsuarios] = useState(0);
  const [editHabilitadoArray, setEditHabilitadoArray] = useState(usuariosParaEditar);
  const [Salas, setSalas] = useState(0);
  const [UsuariosSalas, setUsuariosSalas] = useState(0);

  const [isToUpdate, setIsToUpdate] = useState(true);
  const [isToUpdateUsers, setIsToUpdateUsers] = useState(true);

  useEffect(() => {
    const api = getApiAddress();
    fetch(api.database + "/time")
      .then((res) => res.json())
      .then((data) => {
        setCurrentTime(data.time);
      });
    if (isToUpdateUsers) {
      fetch(api.database + "/usuarios")
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          setUsuarios(data);
        });
    }

    // fetch(api.database + "/salas")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setSalas(data);
    //   });

    fetch(api.database + "/UsuariosSalas")
      .then((res) => res.json())
      .then((data) => {
        setUsuariosSalas(data);
      });
  }, [isToUpdate, isToUpdateUsers]);

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  const theme = useTheme();

  var temp2 = [];
  var usuarios_que_serao_editados = [];
  var usariosParaEditar = editHabilitadoArray;

  function ControlledCheckbox({ usuario }) {
    const initialChecked =
      editHabilitadoArray[usuario.matricula] == null
        ? false
        : editHabilitadoArray[usuario.matricula];
    const [checked, setChecked] = useState(initialChecked);
    const handleChange = (event) => {
      if (editHabilitadoArray[usuario.matricula] == null) {
        usariosParaEditar[usuario.matricula] = true;
        setEditHabilitadoArray(usariosParaEditar);
      } else {
        usariosParaEditar[usuario.matricula] = !usariosParaEditar[usuario.matricula];
        setEditHabilitadoArray(usariosParaEditar);
      }
      setChecked(event.target.checked);
    };

    return (
      <Checkbox
        checked={checked}
        onChange={handleChange}
        inputProps={{ "aria-label": "controlled" }}
      />
    );
  }

  for (let key in Usuarios) {
    let usuarioSalas = [];
    // setEditHabilitadoArray([editHabilitadoArray, false]);
    for (let i in UsuariosSalas[Usuarios[key].matricula]) {
      usuarioSalas.push([logoRobotica2, UsuariosSalas[Usuarios[key].matricula][i]]);
    }
    temp2[key] = {
      author: <Author image={UserImg} name={Usuarios[key].nome} email={Usuarios[key].matricula} />,
      function: <Job title={Usuarios[key].tipoUsuario} description={Usuarios[key].nivelGerencia} />,
      // Editar: <Checkbox enabled />,
      Editar: <ControlledCheckbox usuario={Usuarios[key]} />,
      search: Usuarios[key].nome + Usuarios[key].matricula,
    };
    if (editHabilitadoArray[Usuarios[key].matricula] != null) {
      if (editHabilitadoArray[Usuarios[key].matricula] == true) {
        const temp = {
          author: (
            <Author image={UserImg} name={Usuarios[key].nome} email={Usuarios[key].matricula} />
          ),
        };
        usuarios_que_serao_editados.push(temp);
      }
    }
  }
  // console.log(usuarios_que_serao_editados);
  return {
    columns: [
      { Header: "", accessor: "Editar", width: "1%", align: "left", hidden: false },
      {
        Header: "Usuário",
        accessor: "author",
        width: "45%",
        align: "left",
      },
      { Header: "função", accessor: "function", align: "left", hidden: true },
      { Header: "search", accessor: "search", align: "center", hidden: true },
    ],

    rows: temp2,
    usersToEdit: {
      columns: [
        {
          Header: "Usuário",
          accessor: "author",
          width: "45%",
          align: "left",
        },
      ],
      rows: usuarios_que_serao_editados,
    },
  };
}
