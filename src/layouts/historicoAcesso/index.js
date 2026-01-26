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


// Data
import authorsTableData from "layouts/historicoAcesso/data/acessoPorUsuario";

function startOfDay(d) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function Historico() {

  const authData = useAuth();
  const [historicoAcessos, sethistoricoAcessos] = useState([]);
    
  // Drawer
  const [openFilter, setOpenFilter] = useState(false);

   // filtro: presets + data personalizada (data inicial)
  const [preset, setPreset] = useState("7d"); // "1d" | "7d" | "30d" | "12m" | "custom"
  const [customFrom, setCustomFrom] = useState(startOfDay(new Date())); // data inicial custom

  useEffect(() => {
    const api = getApiAddress();

    fetch(api.database + "/getHistoricoAcessos", {
      method: "GET",
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
  },[]);

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

  // filtra no front antes de montar a tabela
  const historicoFiltrado = useMemo(() => {
    return historicoAcessos.filter((a) => {
      const ts = new Date(a.timestamp);
      ts.setHours(ts.getHours() + 3); //converte para o horário de brasilia

      return ts >= fromDate;
    });
  }, [historicoAcessos, fromDate]);

  const { columns, rows } = authorsTableData(historicoFiltrado);

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

                <Button
                  onClick={() => setOpenFilter(true)}
                  variant="outlined" 
                  size="small"
                  sx={{ color: "white" }}
                  aria-label="Abrir filtros"
                  startIcon={<CalendarTodayIcon />}
                >
                  {" | "+date_message}
                  {/* <FilterListIcon /> */}
                </Button>
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

      <Drawer
        anchor="right"
        open={openFilter}
        onClose={() => setOpenFilter(false)}
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
            <ToggleButton value="1d">1 dia</ToggleButton>
            <ToggleButton value="7d">7 dias</ToggleButton>
            <ToggleButton value="30d">30 dias</ToggleButton>
            <ToggleButton value="12m">12 meses</ToggleButton>
            <ToggleButton value="custom">Personalizado</ToggleButton>
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
            </LocalizationProvider>
          )}

          <TextField
            label="Filtrando desde"
            value={fromDate.toLocaleDateString("pt-BR")}
            size="small"
            fullWidth
            disabled
          />

          <Button variant="contained" onClick={() => setOpenFilter(false)}>
            Aplicar
          </Button>

          <Button
            variant="text"
            onClick={() => {
              setPreset("7d");
              setCustomFrom(startOfDay(new Date()));
            }}
          >
            Limpar
          </Button>
        </Stack>
      </Drawer>

      <Footer />
    </DashboardLayout>
  );
}

export default Historico;
