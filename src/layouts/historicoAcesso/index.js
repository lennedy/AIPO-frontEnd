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

import { useEffect, useMemo, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TextField from "@mui/material/TextField";

// icons
import FilterListIcon from "@mui/icons-material/FilterList";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { useAuth } from "context/AuthProvider";
import { errorHandlingAPI, errorHandlingConnection} from "util";
import getApiAddress from "serverAddress";

// Date pickers (MUI X)
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { ptBR } from "date-fns/locale";
import {getDate_lastDays, getDate_last30Days } from "util";

import { startOfDay, subDays, format } from "date-fns";

// Data
import authorsTableData from "layouts/historicoAcesso/data/acessoPorUsuario";
import MDButton from "components/MDButton";

function FilterDrawer({open, initialValue, onClose, onApply}){
  const [preset, setPreset] = useState(initialValue);
  const [filterAplied, setFilterAplied] = useState(preset);
  const [customFrom, setCustomFrom] = useState(startOfDay(subDays(new Date(), 7))); // data inicial custom
  const [customUntil, setCustomUntil] = useState(startOfDay(new Date())); // data inicial custom

  useEffect(() => {
    if (open) setPreset(initialValue); // reabre com valores atuais
  }, [open, initialValue]);

  const fromDate = useMemo(() => {
    const now = new Date();

    if (preset === "custom") return startOfDay(customFrom);

    const d = new Date(now);
    d.setHours(0, 0, 0, 0);


    if (preset === "1d") {
      // hoje (0:00) até agora
      return d;
    }
    if (preset === "7d") {
      d.setDate(d.getDate() - 6); // inclui hoje + 6 dias anteriores
      return d;
    }
    if (preset === "30d") {
      d.setDate(d.getDate() - 29);
      return d;
    }
    if (preset === "12m") {
      d.setMonth(d.getMonth() - 12);
      return d;
    }
    return d;
  }, [preset, customFrom]);

  return (
    <Drawer 
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { width: 360, p: 2 } }}
    >
      <MDTypography variant="h6" gutterBottom>
        Filtros
      </MDTypography>
      <Divider sx={{ mb: 2 }} />

      <Stack spacing={2}>
        <MDTypography variant="button" fontWeight="medium">
          Período
        </MDTypography>

        <ToggleButtonGroup
          value={preset}
          exclusive
          onChange={(_, v) => v && setPreset(v)}
          size="small"
          orientation="vertical"
        >
          <ToggleButton value="1d">
            <MDTypography variant="button" color="dark" fontWeight="small">
              1 dia
            </MDTypography>
          </ToggleButton>
          <ToggleButton value="7d">
            <MDTypography variant="button" color="dark" fontWeight="small">
              7 dias
            </MDTypography>
          </ToggleButton>
          <ToggleButton value="30d">
            <MDTypography variant="button" color="dark" fontWeight="small">
              30 dias
            </MDTypography>
          </ToggleButton>
          <ToggleButton value="12m">
            <MDTypography variant="button" color="dark" fontWeight="small">
              12 meses
            </MDTypography>
          </ToggleButton>
          <ToggleButton value="custom">
            <MDTypography variant="button" color="dark" fontWeight="small">
              Personalizado
            </MDTypography>
          </ToggleButton>
        </ToggleButtonGroup>

        {preset === "custom" && (
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
            <DatePicker
              label="A partir de"
              value={customFrom}
              onChange={(v) => v && setCustomFrom(startOfDay(v))}
              slots={{
                textField: (params) => <TextField {...params} fullWidth size="small" />,
              }}
            />
            <DatePicker
              label="Até o dia"
              value={customUntil}
              onChange={(v) => v && setCustomUntil(startOfDay(v))}
              slots={{
                textField: (params) => <TextField {...params} fullWidth size="small" />,
              }}
            />
          </LocalizationProvider>
        )}
        
        {preset !== "custom" && (
          <MDInput
            label="Filtrando desde"
            value={fromDate.toLocaleDateString("pt-BR")}
            color="light"
            size="small"
            variant="standard"
            readonly
          />
        )}

        <MDButton
          variant="outlined"
          color="dark"
          onClick={() => onApply({ preset, customFrom, customUntil, fromDate })}
        >
          <MDTypography variant="button" color="dark" fontWeight="medium">
            Aplicar
          </MDTypography>
        </MDButton>

        <MDButton
          variant="outlined"
          color="dark"
          onClick={() => {
            setPreset(initialValue);
            setCustomFrom(startOfDay(new Date()));
            onClose();
          }}
        >
          <MDTypography variant="button" color="dark" fontWeight="medium">
            Limpar
          </MDTypography>
        </MDButton>
      </Stack>
    </Drawer>
  );
}

function Historico() {

  const authData = useAuth();
  const [historicoAcessos, sethistoricoAcessos] = useState([]);
    
  // Drawer
  const [openFilter, setOpenFilter] = useState(false);

   // filtro: presets + data personalizada (data inicial)
  const [preset, setPreset] = useState("7d"); // "1d" | "7d" | "30d" | "12m" | "custom"
  const [customFrom, setCustomFrom] = useState(startOfDay(subDays(new Date(), 7))); // data inicial custom
  const [filterAplied, setFilterAplied] = useState(preset);
  const [customUntil, setCustomUntil] = useState(startOfDay(new Date())); // data inicial custom

  useEffect(() => {
    if (customFrom > customUntil) setCustomFrom(customUntil);
  }, [customFrom, customUntil]);

  useEffect(() => {
    const api = getApiAddress();

    if(!openFilter){
      var data_inicia_final = getDate_lastDays(30);
      
      if((preset === "1d")){
        data_inicia_final = getDate_lastDays(1);
      }
      else if((preset === "7d")){
        data_inicia_final = getDate_lastDays(7);
      }
      else if((preset === "30d")){
        data_inicia_final = getDate_lastDays(30);
      }
      else if((preset === "12m")){
        data_inicia_final = getDate_lastDays(365);
      }
      else if((preset === "custom")){
        data_inicia_final["data_inicial"] = format(customFrom, "yy-MM-dd");
        data_inicia_final["data_final"] = format(customUntil, "yy-MM-dd");
      }

      console.log("tartaruga");
      fetch(api.database + "/getHistoricoAcessos", {
        method: "POST",
        body: JSON.stringify(data_inicia_final),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: "Bearer " + authData.tokenLocal,
        },
      })
        .then((res) => {
          errorHandlingConnection(authData, res);
          return res.json();
        })
        .then((json) => {
          // errorHandlingAPI(authData, json, "");
          // console.log(json);
          sethistoricoAcessos(json.data);
        })
        .catch((err) => console.log(err));
    }
  },[filterAplied,customFrom, customUntil]);

  const { columns, rows } = authorsTableData(historicoAcessos);

  let date_message="Filtro de 7 dias"
  switch(preset){
    case "1d":
      date_message = "Filtro de 1 dia";
      break;
    case "7d":
      date_message= "Filtro de 7 dias";
      break;
    case "30d":
      date_message= "Filtro de 30 dias";
      break;
    case "12m":
      date_message= "Filtro de 12 meses";
      break;
    default:
      date_message= "Filtro personalizado";
  };

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
                  Histórico de Acessos
                </MDTypography>

                <MDButton
                  onClick={() =>{ 
                    setOpenFilter(true);
                    console.log("ipanguaçu");
                    console.log(openFilter);
                  }}
                  variant="outlined" 
                  size="small"
                  sx={{ color: "white" }}
                  aria-label="Abrir filtros"
                  startIcon={<CalendarTodayIcon />}
                >
                  {" | "+date_message}
                </MDButton>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  canSearch
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>

      <FilterDrawer
        open={openFilter}
        initialValue={preset}
        onApply = 
          {({ preset, customFrom, customUntil, fromDate }) => {
            setFilterAplied(preset);
            setPreset(preset);
            setCustomFrom(customFrom);
            setCustomUntil(customUntil);
            setOpenFilter(false);
          }}
        onClose={() => setOpenFilter(false)}
        
      />

      <Footer />
    </DashboardLayout>
  );
}

export default Historico;
