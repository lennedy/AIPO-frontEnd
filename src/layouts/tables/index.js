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
import { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import Chip from "@mui/material/Chip";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";

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
import projectsTableData from "layouts/tables/data/projectsTableData";
import MySelect from "./myComponents";
import getApiAddress from "serverAddress";

function Tables() {
  const handleAddUser = (event) => {
    alert("teste agora");
  };

  const [form, setInputForm] = useState({
    matricula: "",
    nome: "",
    email: "",
  });
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
                    headers: { "Content-type": "application/json; charset=UTF-8" },
                  })
                    .then((response) => response.json())
                    .then((json) =>
                      json["status"] == "ok"
                        ? alert("Adição realizada com sucesso")
                        : alert("Erro:" + json["status"])
                    )
                    .catch((err) => console.log(err))
                    .finally(() => setIsToUpdate(true));
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
                    headers: { "Content-type": "application/json; charset=UTF-8" },
                  })
                    .then((response) => response.json())
                    .then((json) =>
                      json["status"] == "ok"
                        ? alert("Adição realizada com sucesso")
                        : alert("Erro:" + json["status"])
                    )
                    .catch((err) => console.log(err))
                    .finally(() => setIsToUpdate(true));
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

  const [isToUpdate, setIsToUpdate] = useState(true);

  const { columns, rows } = authorsTableData();
  const { columns: pColumns, rows: pRows } = projectsTableData();

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
                  entriesPerPage={false}
                  showTotalEntries={false}
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
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
