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
import LasAcessOverview from "layouts/roomboard/components/LastAcessOverview";
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
import getApiAddress from "serverAddress";

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
  const [isToUpdate, setIsToUpdate] = useState(false);
  // const [listToAuthorize, setListToAuthorize] = useState({});
  var usersData = { enableToSend: false };

  const handleClick = (event) => {
    console.log(nome);
    // setAddAuthorization(!addAuthorization);
    if (codigo != null) {
      var methodToApi = "PUT";
      var dataToServer = {};
      if (usersData.enableToSend) {
        if (addAuthorization == true) {
          setIsToUpdate(false);
          methodToApi = "PUT";
          dataToServer = {
            usuarios: usersData.usersToAuthorize,
            dataInicio: usersData.beginDate,
            dataFim: usersData.endDate,
            horarioInicio: usersData.beginTime,
            horarioFim: usersData.endTime,
          };
        } else {
          alert("É para deletar");
          methodToApi = "delete";
          dataToServer = {
            usuarios: usersData.usersToRemove,
          };
          console.log(dataToServer);
        }
        const api = getApiAddress();
        fetch(api.database + "/autorizarUsuariosPorSala/" + codigo, {
          method: methodToApi,
          body: JSON.stringify(dataToServer),
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
          .finally(() => setIsToUpdate(true));
      } else {
        alert("Seleção não confirmada ou usuários não selecionados");
      }
    }
  };

  const handleSwitch = (event) => {
    setAddAuthorization(!addAuthorization);
  };

  function handleListToAuthorizedData(data) {
    console.log("Informação de um child");
    console.log(data);
    usersData = data;
  }

  function handleListToRemoveData(data) {
    usersData = data;
  }

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
                            {codigo == null
                              ? "Adicionar Sala"
                              : addAuthorization == true
                              ? "Autorizar acesso"
                              : "Remover acesso"}
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
                  <Grid item xs={12} md={8} xl={8}>
                    {
                      <AuthorizedUsers
                        title={"Usuários Autorizados"}
                        profiles={location.state}
                        sendDataToParent={handleListToRemoveData}
                      />
                    }
                  </Grid>
                ) : (
                  <Grid item xs={12} md={12} xl={12}>
                    {
                      <ListToAuthorize
                        title={"Usuários para Autorizar"}
                        profiles={location.state}
                        sendDataToParent={handleListToAuthorizedData}
                      />
                    }
                  </Grid>
                )}
                {!addAuthorization ? (
                  <Grid item xs={12} md={4} xl={4}>
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
