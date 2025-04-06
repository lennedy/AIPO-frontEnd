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
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SendIcon from "@mui/icons-material/Send";

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

import { useMaterialUIController } from "context";

function AuthorizedUsers({ title, profiles, shadow }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const [editEnable, setEditEnable] = useState(false);
  const [configToSend, setConfigToSend] = useState(false);
  const [usersEdit, setUsersEdit] = useState({});

  const autorizados = AuthorizedTableData(editEnable, usersEdit);

  var { columns: pColumns, rows: pRows, usersToEdit: pUsersToEdit } = autorizados;

  const { columns: edColumns, rows: edRows } = autorizados.usersToEdit;

  console.log("usuariosAutorizados");

  // if (autorizados.usersToEdit != usersEdit) {
  //   console.log(autorizados.usersToEdit);
  //   setUsersEdit(autorizados.usersToEdit);
  // }

  const handleEditClick = (event) => {
    if (configToSend) {
      setEditEnable(true);
    } else {
      setEditEnable(!editEnable);
    }
    setConfigToSend(false);
  };

  const handleSendClick = (event) => {
    setConfigToSend(true);
    console.log("enviei os dados");
    console.log(edColumns);
    console.log(autorizados.usersToEdit);
  };

  return (
    <Card sx={{ height: "100%", boxShadow: !shadow && "none" }}>
      <MDBox pt={2} px={2}>
        <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
          <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
            {title}
          </MDTypography>
          <MDBox ml="auto" lineHeight={0} color={darkMode ? "white" : "dark"}>
            <Tooltip title="Editar autorização" placement="top">
              <IconButton sx={{ cursor: "pointer" }} fontSize="small" onClick={handleEditClick}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          </MDBox>
          <MDBox ml="auto" lineHeight={0} color={darkMode ? "white" : "dark"}>
            <Tooltip title="Enviar modificação" placement="top">
              <IconButton sx={{ cursor: "pointer" }} fontSize="small" onClick={handleSendClick}>
                <SendIcon />
              </IconButton>
            </Tooltip>
          </MDBox>
        </MDBox>
      </MDBox>
      {configToSend == false ? (
        <DataTable
          table={{ columns: pColumns, rows: pRows }}
          isSorted={false}
          entriesPerPage={false}
          showTotalEntries={false}
          canSearch
          noEndBorder
        />
      ) : (
        <DataTable
          table={{ columns: edColumns, rows: edRows }}
          isSorted={false}
          entriesPerPage={false}
          showTotalEntries={false}
          noEndBorder
        />
      )}
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
};

export default AuthorizedUsers;
