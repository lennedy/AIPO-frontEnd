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

import Popup from "reactjs-popup";
import React, { useMemo, useState, useEffect } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// @mui material components
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import Chip from "@mui/material/Chip";
import OutlinedInput from "@mui/material/OutlinedInput";
// import MenuItem from "@mui/material/MenuItem";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import usersTableData from "layouts/tables/data/usersTableData";
import roomsTableData from "layouts/tables/data/roomsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import MySelect from "./myComponents";
import getApiAddress from "serverAddress";
import { useAuth } from "context/AuthProvider";
import { errorHandling } from "util";

import EditUserForm from "layouts/tables/forms/EditUserForm";
import EditRoomForm from "layouts/tables/forms/EditRoomForm";
import AuthorizeUserForm from "layouts/tables/forms/authorizeForm";
import WaitTagRead from "layouts/tables/forms/WaitTagRead"


// import { log } from "console";

  //   // matricula: rowMenu.row.matricula,
  //   // nome: rowMenu.row.nome,
  //   usuarioAtivo: rowMenu.row.ativo,
  //   chave: rowMenu.row.chave,
  //   nivelGerencia: rowMenu.row.nivelGerencia,
  //   tipoUsuario: rowMenu.row.tipoUsuario,

function Tables() {

  // Estado único e estável do popup (fora da tabela)
  const [rowMenu, setRowMenu] = useState({ anchorEl: null, row: {matricula: "", nome: "", ativo: "", chave: "", nivelGerencia: "", tipoUsuario: ""} });
  const open = Boolean(rowMenu.anchorEl);
  
  const [usuarios, setUsuarios] = useState();
  const [salas, setSalas] = useState(0);
  const [usuariosSalas, setUsuariosSalas] = useState(0);
  const [identUsuarioEditar, setIdentUsuarioEditar] = useState("");
  const [dadosUsuarioEditar, setDadosUsuarioEditar] = useState();
  const [exibirEditUsuario, setExibirEditUsuario] = useState(false);
  const [exibirAutorizacaoUsuario, setExibirAutorizacaoUsuario] = useState(false);
  const [exibirTagWait, setExibirTagWait] = useState(false);
  const [exibirSalaEditar, setExibirSalaEditar] = useState(false);
  const [dadosSalaEditar, setDadosSalaEditar] = useState();

  const handleCloseRowMenu = () => setRowMenu({ anchorEl: null, row: {matricula: "", nome: "", ativo: "", chave: "", nivelGerencia: "", tipoUsuario: ""}});

  const handleAddUser = (event) => {
    alert("teste agora");
  };


  function AddUserForm() {
    const [SelectSala, selectedSala] = useState([]);

    const [inputName, setInputName] = useState("");
    const [inputMatr, setInputMatr] = useState("");
    const [inputTipoUsuario, setInputTipoUsuario] = useState(["aluno"]);
    const [inputNivelGeren, setInputNivelGeren] = useState(["usuário"]);

    const handleName = (event) => {
      setInputName(event.target.value);
    };
    const handleMatr = (event) => {
      setInputMatr(event.target.value);
    };
    const handleTipoUsuario = (event) => {
      setInputTipoUsuario(
        typeof event.target.value === "string" ? event.target.value.split(",") : event.target.value
      );
    };
    const handleNivelGeren = (event) => {
      setInputNivelGeren(
        typeof event.target.value === "string" ? event.target.value.split(",") : event.target.value
      );
    };

    const authData = useAuth();

    return (
      <Popup
        trigger={
          <MDBox
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="1.5rem"
            height="1.5rem"
            bgColor="white"
            shadow="sm"
            borderRadius="50%"
            //position="fixed"
            right="2rem"
            bottom="2rem"
            zIndex={99}
            color="dark"
            sx={{ cursor: "pointer" }}
          >
            <Icon fontSize="small" color="inherit">
              add
            </Icon>
          </MDBox>
        }
        modal
        nested
      >
        {(close) => (
          <Card>
            <MDBox
              mx={2}
              mt={-3}
              py={3}
              px={2}
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="info"
              alignItems="left"
              justifyContent="left"
              //display="flex"
            >
              <MDButton
                className="close"
                onClick={() => {
                  close();
                }}
              >
                &times;
              </MDButton>
              <MDBox display="flex" alignItems="center" justifyContent="center">
                <MDTypography variant="h6" color="white">
                  Adição de novo usuário
                </MDTypography>
              </MDBox>
            </MDBox>
            <MDBox pt={3}></MDBox>
            <MDInput type="text" label="Matrícula" required="true" onChange={handleMatr}></MDInput>
            <MDBox pt={1}></MDBox>
            <MDInput
              type="text"
              label="Nome"
              required="true"
              //value={form.nome}
              onChange={handleName}
            ></MDInput>
            <MDBox pt={1}></MDBox>
            <MySelect
              labelName={"Tipo de usuário"}
              selectOptions={["aluno", "TAE", "docente", "terceirizado", "externo"]}
              onChange={handleTipoUsuario}
              value={inputTipoUsuario}
            />
            <MDBox pt={1}></MDBox>
            {/* <MDInput
              type="text"
              label="Tipo de gerenciamento"
              required="true"
              onChange={handleNivelGeren}
            ></MDInput> */}
            <MySelect
              labelName={"Tipo de gerenciamento"}
              selectOptions={["usuário", "gerente", "administrador"]}
              onChange={handleNivelGeren}
              value={inputNivelGeren}
            />
            <MDBox pt={3} display="flex" alignItems="center" justifyContent="center">
              <MDButton
                className="button"
                onClick={() => {
                  setIsToUpdateUsers(false);
                  const _data = {
                    nome: inputName,
                    matricula: inputMatr,
                    tipoUsuario: inputTipoUsuario[0],
                    nivelGerencia: inputNivelGeren[0],
                  };
                  console.log(_data);
                  const api = getApiAddress();

                  fetch(api.database + "/adicionarUsuarios", {
                    method: "POST",
                    body: JSON.stringify(_data),
                    headers: {
                      "Content-type": "application/json; charset=UTF-8",
                      Authorization: "Bearer " + authData.tokenLocal,
                    },
                  })
                    .then((response) => response.json())
                    .then((json) => {
                      errorHandling(authData, json, "Adição realizada com sucesso");
                      setIsToUpdateUsers(!isToUpdateUsers);
                    })
                    .catch((err) => console.log(err))
                    .finally(() => setIsToUpdateUsers(true));
                }}
              >
                Adicionar
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
            </MDBox>
          </Card>
        )}
      </Popup>
    );
  }

  function AddRoomForm() {
    const [inputSala, setInputSala] = useState("");
    const [inputCodSala, setInputCodSala] = useState("");
    const [inputLocalSala, setInputLocalSala] = useState("");
    const [inputFechadura, setInputFechadura] = useState("");

    const handleSala = (event) => {
      setInputSala(event.target.value);
    };
    const handleCodSala = (event) => {
      setInputCodSala(event.target.value);
    };
    const handleLocalSala = (event) => {
      setInputLocalSala(event.target.value);
    };
    const handleFechadura = (event) => {
      setInputFechadura(event.target.value);
    };

    const authData = useAuth();

    return (
      <Popup
        trigger={
          <MDBox
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="1.5rem"
            height="1.5rem"
            bgColor="white"
            shadow="sm"
            borderRadius="50%"
            //position="fixed"
            right="2rem"
            bottom="2rem"
            zIndex={99}
            color="dark"
            sx={{ cursor: "pointer" }}
          >
            <Icon fontSize="small" color="inherit">
              add
            </Icon>
          </MDBox>
        }
        modal
        nested
      >
        {(close) => (
          <Card>
            <MDBox
              mx={2}
              mt={-3}
              py={3}
              px={2}
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="info"
              alignItems="left"
              justifyContent="left"
              //display="flex"
            >
              <MDButton
                className="close"
                onClick={() => {
                  close();
                }}
              >
                &times;
              </MDButton>
              <MDBox display="flex" alignItems="center" justifyContent="center">
                <MDTypography variant="h6" color="white">
                  Adição de nova sala
                </MDTypography>
              </MDBox>
            </MDBox>
            <MDBox pt={3}></MDBox>
            <MDInput
              type="text"
              label="Nome da Sala"
              required="true"
              onChange={handleSala}
            ></MDInput>
            <MDInput
              type="text"
              label="Código da Sala"
              required="true"
              onChange={handleCodSala}
            ></MDInput>
            <MDInput
              type="text"
              label="Localização da Sala"
              required="true"
              onChange={handleLocalSala}
            ></MDInput>
            <MDInput
              type="text"
              label="Fechadura"
              required="true"
              onChange={handleFechadura}
            ></MDInput>
            <MDBox pt={3} display="flex" alignItems="center" justifyContent="center">
              <MDButton
                className="button"
                onClick={() => {
                  setIsToUpdateRooms(false);
                  const _data = {
                    nome: inputSala,
                    codigo: inputCodSala,
                    local: inputLocalSala,
                    fechadura: inputFechadura,
                  };
                  console.log(_data);
                  const api = getApiAddress();
                  fetch(api.database + "/adicionarSala", {
                    method: "POST",
                    body: JSON.stringify(_data),
                    headers: {
                      "Content-type": "application/json; charset=UTF-8",
                      Authorization: "Bearer " + authData.tokenLocal,
                    },
                  })
                    .then((response) => response.json())
                    .then((json) => errorHandling(authData, json, "Adição realizada com sucesso"))
                    .catch((err) => console.log(err))
                    .finally(() => setIsToUpdateRooms(true));
                }}
              >
                Adicionar
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
            </MDBox>
          </Card>
        )}
      </Popup>
    );
  }

  const [isToUpdateUsers, setIsToUpdateUsers] = useState(true);
  const [isToUpdateRooms, setIsToUpdateRooms ] = useState(true);
  // --- estado do formulário de edição (elevado!)
  const [editingUser, setEditingUser] = React.useState({editing: null, userData: {matricula: "", nome: "", ativo: "", chave: "", nivelGerencia: "usuário", tipoUsuario: "aluno"} });

  const authData = useAuth();
  useEffect(() => {
    const api = getApiAddress();
    

    if(isToUpdateUsers){
      fetch(api.database + "/usuarios", {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: "Bearer " + authData.tokenLocal,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUsuarios(data);
        });
      fetch(api.database + "/UsuariosSalas")
        .then((res) => res.json())
        .then((data) => {
          setUsuariosSalas(data);
        });
      setIsToUpdateUsers(false);
    }

    if(isToUpdateRooms){
      fetch(api.database + "/salas")
        .then((res) => res.json())
        .then((data) => {
          setSalas(data);
        });
      setIsToUpdateRooms(false);
    }

  }, [isToUpdateUsers,isToUpdateRooms]);

  const handleUserEdit = (event, dadosUsuario) => {
    
    console.log("handleEdit");
    const dados = {
      matricula: dadosUsuario.matricula,
      nome: dadosUsuario.nome,
      usuarioAtivo: dadosUsuario.ativo,
      chave: dadosUsuario.chave,
      nivelGerencia: dadosUsuario.nivelGerencia,
      tipoUsuario: dadosUsuario.tipoUsuario,
    };
    console.log(dados);
    setDadosUsuarioEditar(dados);
    setIdentUsuarioEditar(dados.matricula);
    setExibirEditUsuario(true);
    // setIsToUpdate(!isToUpdate);
    // setIsToUpdate(false);
    
  };

  const handleAuthorizeEdit = (event, dadosUsuario, dadosSalas) => {
    console.log("handleAuthorize");
    setIdentUsuarioEditar(dadosUsuario.matricula);
    setExibirAutorizacaoUsuario(true);
  };

  const handleReadTag = (event, dadosUsuario) => {
    const api = getApiAddress();

    console.log("handlTag");
    setExibirTagWait(true);
    fetch(api.serial + "/readKey")
      .then((response) => response.json())
      .then((json) => {
        if (json["status"] == "ok") {
          // alert("chave lida")
          fetch(api.database + "/setChave/" + dadosUsuario.matricula, {
            method: "PUT",
            body: JSON.stringify({ chave: json["chave"] }),
            headers: { "Content-type": "application/json; charset=UTF-8" },
          })
            .then((response) => response.json())
            .then((json) =>
              json["status"] == "ok"
                ? alert("chave cadastrada no banco")
                : alert("erro:" + json["status"])
            )
            .catch((err) => console.log(err))
            .finally(() => setIsToUpdateUsers(!isToUpdateUsers));
        } else {
          alert("erro:" + json["status"]);
        }
        // setUpdateChave(false);
      })
      .catch((err) => console.log(err));
    // .finally(() => setIsToUpdateUsers(true));
  };

  const handleRoomEdit = (event, dadosSala) => {
    const dados = {
      nomeSala: dadosSala.nome,
      codSala: dadosSala.codigo,
      codFechadura: dadosSala.fechadura,
      localizacao: dadosSala.local,
    }
    setDadosSalaEditar(dados);
    setExibirSalaEditar(true);
    console.log("handleRoomEdit");
  };

  const { columns, rows } = usersTableData( usuarios, usuariosSalas, handleUserEdit, handleAuthorizeEdit,  handleReadTag );
  
  // const { columns: pColumns, rows: pRows } = projectsTableData();
  const { columns: pColumns, rows: pRows } = roomsTableData(salas,handleRoomEdit);

  console.log("usuariosSala");
  console.log(usuariosSalas);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Users Table
                </MDTypography>
                <AddUserForm />
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={true}
                  showTotalEntries={false}
                  canSearch
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Rooms Table
                </MDTypography>
                <AddRoomForm />
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: pColumns, rows: pRows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
     {/* Menu ÚNICO fora da tabela => não desmonta no resize */}
     <Menu
       id="row-actions-menu"
       anchorEl={rowMenu.anchorEl}
       open={open}
       onClose={handleCloseRowMenu}
       keepMounted
       // deixe via Portal (padrão) para ficar fora da árvore da tabela
       // disablePortal={false}
       anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
       transformOrigin={{ vertical: "top", horizontal: "right" }}
     >
       {/* USE AQUI as mesmas ações que você tinha antes */}
       <MenuItem onClick={() => { 
          setEditingUser({editing: true, userData: rowMenu.row});
          handleCloseRowMenu();
        }}>
         Editar
       </MenuItem>
       <MenuItem onClick={() => { /* … */ handleCloseRowMenu(); }}>
         Remover
       </MenuItem>
     </Menu>
      <EditUserForm 
        identificadorUsuario = {identUsuarioEditar}
        defaultValue = {dadosUsuarioEditar}
        editingUser = {exibirEditUsuario}
        setEditingUser = {setExibirEditUsuario}
        isToUpdate = {isToUpdateUsers}
        setIsToUpdate = {setIsToUpdateUsers}
      />
      <AuthorizeUserForm
        identificadorUsuario = {identUsuarioEditar}
        salas = {salas}
        exibirForm = {exibirAutorizacaoUsuario}
        setExibirForm = {setExibirAutorizacaoUsuario}
        isToUpdate = {isToUpdateUsers}
        setIsToUpdate = {setIsToUpdateUsers}
      />
      <WaitTagRead  
        exibir = {exibirTagWait}
        setExibir = {setExibirTagWait}
      />
      <EditRoomForm
        exibir = {exibirSalaEditar}
        defaultValue = {dadosSalaEditar}
        setExibir = {setExibirSalaEditar}
        isToUpdate = {isToUpdateRooms}
        setIsToUpdate = {setIsToUpdateRooms}
      />
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
