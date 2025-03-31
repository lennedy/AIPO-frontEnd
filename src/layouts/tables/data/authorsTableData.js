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

export default function data() {
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
          setUsuarios(data);
        });
    }

    fetch(api.database + "/salas")
      .then((res) => res.json())
      .then((data) => {
        setSalas(data);
      });

    fetch(api.database + "/UsuariosSalas")
      .then((res) => res.json())
      .then((data) => {
        setUsuariosSalas(data);
      });
  }, [isToUpdate, isToUpdateUsers]);

  function EditUserForm({ identificadorUsuario, defaultValue }) {
    const [inputMatr, setInputMatr] = useState(defaultValue.matricula);
    const [inputName, setInputName] = useState(defaultValue.nome);
    const [inputTipoUsario, setInputTipoUsuario] = useState([defaultValue.tipoUsuario]);
    const [inputTipoGeren, setInputTipoGeren] = useState([defaultValue.nivelGerencia]);
    const [inputChave, setInputChave] = useState(defaultValue.chave);
    const [inputUsuarioAtivo, setInputUsuarioAtivo] = useState(defaultValue.usuarioAtivo);

    const handleMatr = (event) => {
      setInputMatr(event.target.value);
    };
    const handleName = (event) => {
      setInputName(event.target.value);
    };
    const handleTipoUsuario = (event) => {
      const {
        target: { value },
      } = event;
      setInputTipoUsuario(typeof value === "string" ? value.split(",") : value);
    };
    const handleTipoGeren = (event) => {
      const {
        target: { value },
      } = event;
      setInputTipoGeren(typeof value === "string" ? value.split(",") : value);
    };
    const handleChave = (event) => {
      setInputChave(event.target.value);
    };
    const handleUsuarioAtivo = (event) => {
      setInputUsuarioAtivo(!inputUsuarioAtivo);
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
                <MDTypography variant="h6">Edição de usuário</MDTypography>
              </MDBox>
            </MDBox>
            <MDBox pt={3}></MDBox>
            <MDInput
              type="text"
              label="Matrícula"
              required="true"
              onChange={handleMatr}
              defaultValue={defaultValue.matricula}
              fullWidth
            ></MDInput>
            <MDBox pt={1}></MDBox>
            <MDInput
              type="text"
              label="Nome"
              required="true"
              onChange={handleName}
              defaultValue={defaultValue.nome}
              fullWidth
            ></MDInput>
            <MDBox pt={1}></MDBox>
            <MySelect
              labelName={"Tipo de usuário"}
              selectOptions={["aluno", "TAE", "docente", "terceirizado", "externo"]}
              onChange={handleTipoUsuario}
              value={inputTipoUsario}
            />
            <MDBox pt={1}></MDBox>
            <MySelect
              labelName="Tipo de gerenciamento"
              selectOptions={["usuário", "gerente", "administrador"]}
              onChange={handleTipoGeren}
              value={inputTipoGeren}
            />
            <MDBox display="flex" alignItems="center">
              <MDInput
                type="text"
                label="Chave de acesso"
                onChange={handleChave}
                defaultValue={defaultValue.chave}
                fullWidth
              ></MDInput>
              <MDButton
                variant="contained"
                onClick={() => {
                  const api = getApiAddress();
                  setIsToUpdateUsers(false);
                  fetch(api.database + "/chave/" + identificadorUsuario, {
                    method: "DELETE",
                    body: JSON.stringify(identificadorUsuario),
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
                    .finally(() => setIsToUpdateUsers(true));
                }}
              >
                <MDTypography variant="button" fontWeight="regular" color="text">
                  Apagar chave
                </MDTypography>
              </MDButton>
            </MDBox>
            <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
              <MDBox mt={0.5}>
                <Switch checked={inputUsuarioAtivo} onChange={handleUsuarioAtivo} />
              </MDBox>
              <MDBox width="80%" ml={0.5}>
                <MDTypography variant="button" fontWeight="regular" color="text">
                  Usuário ativo
                </MDTypography>
              </MDBox>
            </MDBox>
            <div className="actions">
              <MDButton
                className="button"
                onClick={() => {
                  console.log(inputMatr);
                  console.log(inputName);
                  console.log(inputTipoUsario);
                  console.log(inputTipoGeren);
                  console.log(inputChave);
                  const data = {
                    matr: inputMatr,
                    nome: inputName,
                    tipoUsuario: inputTipoUsario[0],
                    tipoGerencia: inputTipoGeren[0],
                    usuarioAtivo:
                      inputUsuarioAtivo == true
                        ? 1
                        : inputUsuarioAtivo == false
                        ? 0
                        : inputUsuarioAtivo,
                  };
                  setIsToUpdateUsers(false);
                  const api = getApiAddress();
                  fetch(api.database + "/usuario/" + identificadorUsuario, {
                    method: "PUT",
                    body: JSON.stringify(data),
                    headers: { "Content-type": "application/json; charset=UTF-8" },
                  })
                    .then((response) => response.json())
                    .then((json) => {
                      if (json["status"] == "ok") {
                        alert("modificação realizada");
                      } else {
                        if (json["status"] == "sem chave") {
                          alert("cadastre uma chave para autorizar o usuário");
                          close();
                        } else {
                          alert("erro:" + json["status"]);
                        }
                      }
                    })
                    .catch((err) => console.log(err))
                    .finally(() => setIsToUpdateUsers(true));
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
                  console.log("/usuario/" + identificadorUsuario);
                  setIsToUpdateUsers(false);
                  const api = getApiAddress();
                  fetch(api.database + "/usuario/" + identificadorUsuario, {
                    method: "DELETE",
                    body: JSON.stringify(identificadorUsuario),
                    headers: { "Content-type": "application/json; charset=UTF-8" },
                  })
                    .then((response) => response.json())
                    .then((json) => console.log(json))
                    .catch((err) => console.log(err))
                    .finally(() => setIsToUpdateUsers(true));
                }}
              >
                Apagar
              </MDButton>
            </div>
          </Card>
        )}
      </Popup>
    );
  }

  function AutorizeForm({ identificadorUsuario, salas }) {
    let codigos = [];
    const [SelectSala, setSala] = useState([]);

    for (let key in salas) {
      codigos.push(salas[key].codigo);
    }
    const handleSelect = (event) => {
      const {
        target: { value },
      } = event;
      setSala(
        // On autofill we get a stringified value.
        typeof value === "string" ? value.split(",") : value
      );
    };

    return (
      <Popup
        trigger={
          <MDTypography component="a" href="#" color="text">
            <Icon>more_vert</Icon>
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
                <MDTypography variant="h6">Permissão de Portas</MDTypography>
              </MDBox>
            </MDBox>
            <MDBox pt={3}></MDBox>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-chip-label">Salas autorizadas</InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={SelectSala}
                onChange={handleSelect}
                input={<OutlinedInput id="select-multiple-chip" label="salas autorizadas" />}
                renderValue={(selected) => (
                  <MDBox sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </MDBox>
                )}
              >
                {codigos.map((name) => (
                  <MenuItem key={name} value={name} style={getStyles(name, SelectSala, theme)}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div className="actions">
              <MDButton
                className="button"
                onClick={() => {
                  console.log(JSON.stringify(SelectSala));
                  setIsToUpdateUsers(false);
                  const api = getApiAddress();
                  fetch(api.database + "/autorizarUsuario/" + identificadorUsuario, {
                    method: "PUT",
                    body: JSON.stringify(SelectSala),
                    headers: { "Content-type": "application/json; charset=UTF-8" },
                  })
                    .then((response) => response.json())
                    .then((json) => {
                      if (json["status"] == "ok") {
                        alert("autorização concedida");
                      } else {
                        if (json["status"] == "sem chave") {
                          alert("cadastre uma chave para autorizar o usuário");
                          close();
                        } else {
                          alert("erro:" + json["status"]);
                        }
                      }
                    })
                    .catch((err) => console.log(err))
                    .finally(() => setIsToUpdateUsers(true));
                }}
              >
                enviar autorização
              </MDButton>
              <MDButton
                className="button"
                onClick={() => {
                  console.log(SelectSala);
                  close();
                }}
              >
                Cancelar
              </MDButton>
              <MDButton
                className="button"
                onClick={() => {
                  console.log("/autorizarUsuario/" + identificadorUsuario);
                  setIsToUpdateUsers(false);
                  const api = getApiAddress();
                  fetch(api.database + "/autorizarUsuario/" + identificadorUsuario, {
                    method: "DELETE",
                    body: JSON.stringify(identificadorUsuario),
                    headers: { "Content-type": "application/json; charset=UTF-8" },
                  })
                    .then((response) => response.json())
                    .then((json) => {
                      if (json["status"] == "ok") {
                        alert("remoção realizada");
                      } else {
                        alert("erro:" + json["status"]);
                      }
                    })
                    .catch((err) => console.log(err))
                    .finally(() => setIsToUpdateUsers(true));
                }}
              >
                Remover autorizações
              </MDButton>
            </div>
          </Card>
        )}
      </Popup>
    );
  }

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  const theme = useTheme();

  let text =
    '{ "usuarios" : [' +
    '{ "nome":"Lennedy C Soares" , "matricula":"1934567" , "tipoUsuario":"Docente" , "nivelGerencia":"Administrador" , "chave":"09 08 07 06"},' +
    '{ "nome":"Anna" , "matricula":"123456789" , "tipoUsuario":"Discente" , "nivelGerencia":"Gerente" , "chave":""},' +
    '{ "nome":"Peter" , "matricula":"09876543" , "tipoUsuario":"TAE" , "nivelGerencia":"Usuário" , "chave":""} ]}';

  // let temp = [
  //   [logoRobotica, "teste"],
  //   [logoRobotica, "teste34"],
  // ];
  var temp2 = [];

  for (let key in Usuarios) {
    let usuarioSalas = [];
    for (let i in UsuariosSalas[Usuarios[key].matricula]) {
      usuarioSalas.push([logoRobotica2, UsuariosSalas[Usuarios[key].matricula][i]]);
    }
    temp2[key] = {
      author: <Author image={UserImg} name={Usuarios[key].nome} email={Usuarios[key].matricula} />,
      function: <Job title={Usuarios[key].tipoUsuario} description={Usuarios[key].nivelGerencia} />,
      status: (
        <MDBox ml={-1}>
          <MDButton
            badgeContent={
              Usuarios[key].ativo == 0
                ? "inativo"
                : Usuarios[key].chave == null
                ? "não cadastrado"
                : "cadastrado"
            }
            color={
              Usuarios[key].ativo == 0
                ? "error"
                : Usuarios[key].chave == null
                ? "warning"
                : "success"
            }
            variant="gradient"
            size="small"
            onClick={() => {
              if (Usuarios[key].ativo == 1) {
                console.log("/chave/" + Usuarios[key].matricula);
                setIsToUpdateUsers(false);
                const api = getApiAddress();
                fetch(api.database + "/chave/" + Usuarios[key].matricula, {
                  method: "PUT",
                  body: JSON.stringify(Usuarios[key].matricula),
                  headers: { "Content-type": "application/json; charset=UTF-8" },
                })
                  .then((response) => response.json())
                  .then((json) =>
                    json["status"] == "ok" ? alert("chave lida") : alert("erro:" + json["status"])
                  )
                  .catch((err) => console.log(err))
                  .finally(() => setIsToUpdateUsers(true));
              }
            }}
          >
            {Usuarios[key].chave == null
              ? "não cadastrado"
              : Usuarios[key].ativo == 0
              ? "inativo"
              : "cadastrado"}
          </MDButton>
        </MDBox>
      ),
      employed: (
        <MDBox display="flex" py={1}>
          {avatars(usuarioSalas)}
          <AutorizeForm identificadorUsuario={Usuarios[key].matricula} salas={Salas} />
        </MDBox>
      ),
      action: (
        <EditUserForm
          identificadorUsuario={Usuarios[key].matricula}
          defaultValue={{
            matricula: Usuarios[key].matricula,
            nome: Usuarios[key].nome,
            tipoUsuario: Usuarios[key].tipoUsuario,
            nivelGerencia: Usuarios[key].nivelGerencia,
            chave: Usuarios[key].chave,
            usuarioAtivo: Usuarios[key].ativo,
          }}
        />
      ),
    };
  }

  return {
    columns: [
      { Header: "Usuário", accessor: "author", width: "45%", align: "left" },
      { Header: "função", accessor: "function", align: "left" },
      { Header: "status da chave", accessor: "status", align: "center" },
      { Header: "Salas autorizadas", accessor: "employed", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: temp2,
  };
}
