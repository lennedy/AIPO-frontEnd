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
import CheckIcon from "@mui/icons-material/Check";
import SendIcon from "@mui/icons-material/Send";
import Slider from "@mui/material/Slider";

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
import UsersTableData from "../../data/UsersTableData";

import { useMaterialUIController } from "context";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/pt-br";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";

function AuthorizedUsers({ title, profiles, shadow, sendDataToParent }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const [editEnable, setEditEnable] = useState(false);
  const [configToSend, setConfigToSend] = useState(false);
  const [usersEdit, setUsersEdit] = useState({});
  const [value2, setValue2] = useState([0, 24]);
  const [usersToAuthorize, setUsersToAuthorize] = useState([]);
  const [dataInicioValue, setDataInicioValue] = useState(dayjs());
  const [dataFimValue, setDataFimValue] = useState(null);
  // const [horarioInicioValue, setHorarioInicioValue] = useState(0);
  // const [horarioFimValue, setHorarioFimValue] = useState(24);

  const autorizados = UsersTableData(profiles.codigo, editEnable, usersEdit);

  var { columns: pColumns, rows: pRows, usersToEdit: pUsersToEdit } = autorizados;

  const { columns: edColumns, rows: edRows } = autorizados.usersToEdit;

  const minDistanceSlider = 0;
  const maxDistanceSlider = 24;

  var userToAuthorize = [];
  for (let key in edRows) {
    userToAuthorize.push({ matricula: edRows[key].author.props.email });
  }
  const horarioInicio = dayjs().set("hour", value2[0]).set("minute", 0).set("second", 0);
  const horarioFim = dayjs()
    .set("hour", value2[1] - 1)
    .set("minute", 59)
    .set("second", 59);
  const enableToSend = userToAuthorize.length > 0 ? configToSend : false;
  const dataToParent = {
    enableToSend: enableToSend,
    usersToAuthorize: userToAuthorize,
    beginDate: dayjs(dataInicioValue).format("YYYY-MM-DD HH:mm:ss"),
    endDate: dataFimValue == null ? null : dayjs(dataFimValue).format("YYYY-MM-DD HH:mm:ss"),
    beginTime: horarioInicio.format("HH:mm:ss"),
    endTime: horarioFim.format("HH:mm:ss"),
  };
  sendDataToParent(dataToParent);

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
  };

  const handleChange2 = (event, newValue, activeThumb) => {
    if (newValue[1] - newValue[0] < minDistanceSlider) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistanceSlider);
        setValue2([clamped, clamped + minDistanceSlider]);
      } else {
        const clamped = Math.max(newValue[1], minDistanceSlider);
        setValue2([clamped - minDistanceSlider, clamped]);
      }
    } else {
      setValue2(newValue);
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} xl={6}>
        <Card sx={{ height: "100%", boxShadow: !shadow && "none" }}>
          <MDBox pt={2} px={2}>
            <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
              <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
                {title}
              </MDTypography>
              <MDBox ml="auto" lineHeight={0} color={darkMode ? "white" : "dark"}>
                <Tooltip title="Selecionar autorização" placement="top">
                  <IconButton sx={{ cursor: "pointer" }} fontSize="small" onClick={handleEditClick}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </MDBox>
              <MDBox ml="auto" lineHeight={0} color={darkMode ? "white" : "dark"}>
                <Tooltip title="Confirmar autorização" placement="top">
                  <IconButton sx={{ cursor: "pointer" }} fontSize="small" onClick={handleSendClick}>
                    <CheckIcon />
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
              onChange={(newValue) => {
                console.log(newValue);
              }}
              onRangePositionChange={(newValue) => {
                console.log("newValue");
              }}
            />
          )}
        </Card>
      </Grid>
      <Grid item xs={12} md={6} xl={6}>
        <Card sx={{ height: "100%", boxShadow: !shadow && "none" }}>
          <MDBox pt={2} px={2}>
            <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
              <MDTypography variant="h6" fontWeight="medium">
                {"Datas de início e fim para acesso"}
              </MDTypography>
            </MDBox>
          </MDBox>
          <MDBox pt={2} px={10} display="flex" justifyContent="space-between" alignItems="center">
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
              <DemoContainer components={["DateTimePicker"]}>
                <DateTimePicker
                  label="Data de inicio"
                  defaultValue={dayjs()}
                  viewRenderers={{
                    hours: renderTimeViewClock,
                    minutes: renderTimeViewClock,
                    seconds: null,
                  }}
                  onChange={(newValue) => setDataInicioValue(newValue.toString())}
                />
              </DemoContainer>
            </LocalizationProvider>
          </MDBox>
          <MDBox pt={2} px={10} display="flex" justifyContent="space-between" alignItems="center">
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
              <DemoContainer components={["DateTimePicker"]}>
                <DateTimePicker
                  label="Data de fim"
                  viewRenderers={{
                    hours: renderTimeViewClock,
                    minutes: renderTimeViewClock,
                    seconds: null,
                  }}
                  onChange={(newValue) => setDataFimValue(newValue)}
                />
              </DemoContainer>
            </LocalizationProvider>
          </MDBox>
          <MDBox pt={2} px={2}>
            <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
              <MDTypography variant="h6" fontWeight="medium">
                {"Faixa de horário para acesso diário"}
              </MDTypography>
            </MDBox>
          </MDBox>
          <MDBox pt={2} px={10} display="flex" justifyContent="space-between" alignItems="center">
            <Slider
              aria-label="Horário de acesso"
              // getAriaValueText={"valuetext"}
              valueLabelDisplay="auto"
              shiftStep={1}
              step={1}
              marks
              min={minDistanceSlider}
              max={maxDistanceSlider}
              disableSwap
              value={value2}
              onChange={handleChange2}
            />
          </MDBox>
        </Card>
      </Grid>
    </Grid>
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
