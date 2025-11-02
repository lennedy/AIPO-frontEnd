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
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Button from '@mui/material/Button';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SendIcon from "@mui/icons-material/Send";
import CheckIcon from "@mui/icons-material/Check";

// react-routers components
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDButton from "components/MDButton";

import DataTable from "examples/Tables/DataTable";
import projectsTableData from "layouts/tables/data/projectsTableData";
import AuthorizedTableData from "../../data/AuthorizedUserTableData";
import ListOfUsers from "../ListPopUp";

import { useMaterialUIController } from "context";
import getApiAddress from "serverAddress";

function AuthorizedUsers({ title, profiles, shadow, sendDataToParent }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const [editEnable, setEditEnable] = useState(true);
  const [configToSend, setConfigToSend] = useState(false);
  const [usersEdit, setUsersEdit] = useState({});
  const [isToUpdate, setIsToUpdate] = useState(false);

  const autorizados = AuthorizedTableData(profiles.codigo, editEnable, usersEdit, isToUpdate);

  var { columns: pColumns, rows: pRows, usersToEdit: pUsersToEdit } = autorizados;

  const { columns: edColumns, rows: edRows } = autorizados.usersToEdit;

  console.log("usuariosAutorizados");

  var usersToRemove = [];
  for (let key in edRows) {
    usersToRemove.push({ matricula: edRows[key].author.props.email });
  }

  const enableToSend = usersToRemove.length > 0 ? configToSend : false;
  const dataToParent = {
    enableToSend: enableToSend,
    usersToRemove: usersToRemove,
  };
  sendDataToParent(dataToParent);

  // if (autorizados.usersToEdit != usersEdit) {
  //   console.log(autorizados.usersToEdit);
  //   setUsersEdit(autorizados.usersToEdit);
  // }

  const handleSendClick = (event) => {
    // setAddAuthorization(!addAuthorization);
    if (profiles.codigo != null) {
      var methodToApi = "PUT";
      var dataToServer = {};
      if (enableToSend) {
        methodToApi = "delete";
        dataToServer = {
          usuarios: usersToRemove,
        };
        const api = getApiAddress();
        fetch(api.database + "/autorizarUsuariosPorSala/" + profiles.codigo, {
          method: methodToApi,
          body: JSON.stringify(dataToServer),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        })
          .then((response) => response.json())
          .then((json) => {
            if (json["status"] == "ok") {
              alert("modificação realizada");
              setConfigToSend(false);
              setIsToUpdate(true);
            } else {
              alert("erro:" + json["status"]);
            }
          })
          .catch((err) => console.log(err));
        // .finally(() => setIsToUpdate(true));
      } else {
        alert("Seleção não confirmada ou usuários não selecionados");
      }
    }
  };

  const handleEditClick = (event) => {
    if (configToSend) {
      setEditEnable(true);
    } else {
      setEditEnable(!editEnable);
    }
    setConfigToSend(false);
  };

  const handleCheckClick = (event) => {
    setConfigToSend(true);
  };

  const handleSendClick2 = (event) => {
    console.log("estiveaqui");
    console.log(usersEdit);
    setConfigToSend(false);
  };

  return (
    <Card sx={{ height: "100%", boxShadow: !shadow && "none" }}>
      <MDBox pt={2} px={2}>
        <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
          <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
            {title}
          </MDTypography>
          {/* {configToSend == false ? null : (
            <MDBox ml="auto" lineHeight={0} color={darkMode ? "white" : "dark"}>
              <Tooltip title="Enviar desautorização" placement="top">
                <IconButton sx={{ cursor: "pointer" }} fontSize="small" onClick={handleSendClick}>
                  <SendIcon />
                </IconButton>
              </Tooltip>
            </MDBox>
          )} */}
          {/* {configToSend == false ? ( */}
            <MDBox>
              <Tooltip title="Confirmar seleção" placement="top">
                {/* <IconButton sx={{ cursor: "pointer" }} fontSize="small" onClick={handleCheckClick}>
                  <CheckIcon />
                </IconButton> */}
                <Button 
                  variant="contained"
                  color={darkMode ? "secondary" : "dark"}
                  startIcon={<CheckIcon />}
                  onClick={handleCheckClick}
                 >
                  Confirme seleção
                </Button>
              </Tooltip>
            </MDBox>
          {/* ) : (
            <MDBox ml="auto" lineHeight={0} color={darkMode ? "white" : "dark"}>
              <Tooltip title="Editar seleção" placement="top">
                <IconButton sx={{ cursor: "pointer" }} fontSize="small" onClick={handleEditClick}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </MDBox>
          )} */}
        </MDBox>
      </MDBox>
      {/* {configToSend == false ? ( */}
        <DataTable
          table={{ columns: pColumns, rows: pRows }}
          isSorted={false}
          entriesPerPage={false}
          showTotalEntries={false}
          canSearch
          noEndBorder
        />
      {/* ) : (
        <DataTable
          table={{ columns: edColumns, rows: edRows }}
          isSorted={false}
          entriesPerPage={false}
          showTotalEntries={false}
          noEndBorder
        />
      )} */}
      <ListOfUsers
        title = "Lista de usuários para desautoriar"
        exibir = {configToSend}
        setExibir = {setConfigToSend}
        columns = {edColumns}
        rows = {edRows}
        handleSendClick = {handleSendClick}
        shadow={shadow}
      />
    </Card>
  );
}

// Setting default props for the RoomList
AuthorizedUsers.defaultProps = {
  shadow: true,
};

// Typechecking props for the RoomList
AuthorizedUsers.propTypes = {
  title: PropTypes.string.isRequired,
  profiles: PropTypes.arrayOf(PropTypes.object).isRequired,
  shadow: PropTypes.bool,
  sendDataToParent: PropTypes.func.isRequired,
};

export default AuthorizedUsers;
