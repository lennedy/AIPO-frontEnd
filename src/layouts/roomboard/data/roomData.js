import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";

import { useLocation } from "react-router-dom";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Footer from "examples/Footer";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

import roomListData from "layouts/profile/data/roomListData";
import RoomList from "examples/Lists/RoomList";
import AuthorizedUsers from "../components/AuthorizedUsers";
import ListToAuthorize from "../components/ListToAuthorize";
import LasAcessOverview from "layouts/profile/components/LastAcessOverview";
import PaymentMethod from "layouts/billing/components/PaymentMethod";
import RoomHead from "layouts/roomboard/components/RoomHead";

import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";

import DataTable from "examples/Tables/DataTable";
import authorsTableData from "layouts/tables/data/authorsTableData";
import RoomInfo from "layouts/roomboard/components/RoomInfo";
import robotica from "assets/images/lab-robotica.jpeg";
// import { DateRangePicker, DateRange } from "mui-daterange-picker";

import { useMaterialUIController } from "context";
import { useState } from "react";

function RoomData() {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const location = useLocation();
  // const { pathname, hash, key } = useLocation();
  const dataChart = reportsBarChartData();
  const authorizedUsers = [];
  const { columns: pColumns, rows: pRows } = authorsTableData();
  const codigo = location.state.codigo;
  const nome = location.state.nome;
  const [addAuthorization, setAddAuthorization] = useState(false);

  const handleClick = (event) => {
    console.log(nome);
    setAddAuthorization(!addAuthorization);
  };

  const handleSwitch = (event) => {
    setAddAuthorization(!addAuthorization);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={3}>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  {/* <RoomHead codigo={location.state.codigo} nome={location.state.nome} /> */}
                  <Card id="delete-account">
                    <MDBox
                      pt={2}
                      px={2}
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Grid>
                        {codigo == null ? (
                          <MDTypography variant="h6" fontWeight="medium">
                            Salas
                          </MDTypography>
                        ) : (
                          <RoomInfo image={robotica} name={nome} codigo={codigo} />
                        )}
                      </Grid>
                      <Grid>
                        <MDBox>
                          <Grid container spacing={0}>
                            <MDTypography>
                              {addAuthorization == true
                                ? "Conceder Autorização"
                                : "Remover Autorização"}
                            </MDTypography>
                            <Switch onChange={handleSwitch} />
                          </Grid>
                        </MDBox>
                        <MDBox py={1}>
                          <MDButton variant="gradient" color="dark" onClick={handleClick}>
                            <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                            &nbsp;{codigo == null ? "Adicionar Sala" : "Autorizar acesso"}
                          </MDButton>
                        </MDBox>
                      </Grid>
                    </MDBox>
                    <MDBox p={1}>
                      <Grid container spacing={3}></Grid>
                    </MDBox>
                  </Card>
                </Grid>
                {!addAuthorization ? (
                  <Grid item xs={12} md={6} xl={6}>
                    {<AuthorizedUsers title={"Usuários Autorizados"} profiles={location.state} />}
                  </Grid>
                ) : (
                  <Grid item xs={12} md={12} xl={12}>
                    {
                      <ListToAuthorize
                        title={"Usuários para Autorizar"}
                        profiles={location.state}
                      />
                    }
                  </Grid>
                )}
                {!addAuthorization ? (
                  <Grid item xs={12} md={6} xl={6}>
                    <LasAcessOverview
                      title="Últimos acessos"
                      profiles={roomListData}
                      shadow={false}
                    />
                  </Grid>
                ) : null}
              </Grid>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default RoomData;
