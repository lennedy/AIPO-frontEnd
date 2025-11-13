import backgroundImage from "assets/images/bg-profile.jpeg";

import Icon from "@mui/material/Icon";
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Tooltip from "@mui/material/Tooltip";

import { useLocation } from "react-router-dom";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AppBar from "@mui/material/AppBar";
import Footer from "examples/Footer";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import AuthorizedUsers from "../components/AuthorizedUsers";
import ListToAuthorize from "../components/ListToAuthorize";

import authorsTableData from "layouts/tables/data/authorsTableData";
import RoomInfo from "layouts/roomboard/components/RoomInfo";
import robotica from "assets/images/lab-robotica.jpeg";
import ifrn from "assets/images/IFRN_medio.png";
import breakpoints from "assets/theme/base/breakpoints";


import { useMaterialUIController } from "context";
import { useState, useEffect } from "react";
import getApiAddress from "serverAddress";

function RoomData() {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const location = useLocation();
  const authorizedUsers = [];
  const { columns: pColumns, rows: pRows } = authorsTableData();
  const codigo = location.state.codigo;
  const nome = location.state.nome;
  const [addAuthorization, setAddAuthorization] = useState(false);
  const [isToUpdate, setIsToUpdate] = useState(false);
  var usersData = { enableToSend: false };

  const handleClick = (event) => {
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
          methodToApi = "delete";
          dataToServer = {
            usuarios: usersData.usersToRemove,
          };
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

  function handleListToAuthorizedData(data) {
    usersData = data;
  }

  function handleListToRemoveData(data) {
    usersData = data;
  }

  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [value, setValue] = useState(0);

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleTabsChange = (event, newValue) => {
    setValue(newValue);
    setAddAuthorization(!addAuthorization);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox position="relative" mb={5}>
        {/* <MDBox mb={3}> */}
          {/* <Grid container spacing={3}> */}
            {/* <Grid item xs={12} lg={8}> */}
        <MDBox
          display="flex"
          alignItems="center"
          position="relative"
          minHeight="4.75rem"
          borderRadius="xl"
          // sx={{
          //   backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
          //     `${linearGradient(
          //       rgba(gradients.info.main, 0.6),
          //       rgba(gradients.info.state, 0.6)
          //     )}, url(${backgroundImage})`,
          //   backgroundSize: "cover",
          //   backgroundPosition: "50%",
          //   overflow: "hidden",
          // }}
        />
              {/* <Grid container spacing={3}> */}
                {/* <Grid item xs={12}> */}
                  {/* <RoomHead codigo={location.state.codigo} nome={location.state.nome} /> */}
                  <Card
                    sx={{
                      position: "relative",
                      mt: -8,
                      // mx: 3,
                      py: 2,
                      px: 2,
                    }}
                  >
                    {/* <MDBox
                      pt={2}
                      px={2}
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    > */}
                    <Grid container spacing={3} alignItems="center">
                       <Grid item>
                        {codigo == null ? (
                          <MDTypography variant="h6" fontWeight="medium">
                            Salas
                          </MDTypography>
                        ) : (
                          <RoomInfo image={codigo=="A208"?robotica:ifrn} name={nome} codigo={codigo} />
                        )}
                      </Grid>
                      <Grid item  xs={12} md={6} lg={4} sx={{ ml: "auto" }}>
                        <AppBar position="static">
                          <Tabs
                            value={value}
                            onChange={handleTabsChange}
                            // orientation="vertical"
                            orientation={tabsOrientation}
                            aria-label="basic tabs example"
                          >
                            <Tab 
                              label="Aba para Remoção"
                              icon={<GroupRemoveIcon fontSize="medium" sx={{ mt: -0.25 }}/>                                }
                            />
                            <Tab
                              label="Aba para Acesso"
                              icon={<GroupAddIcon fontSize="medium" sx={{ mt: -0.25 }}/>}
                            />
                          </Tabs>
                        </AppBar>
                        {/* <MDBox py={1}>
                          <MDButton
                            variant="gradient"
                            color="dark"
                            onClick={handleClick}
                            disabled={usersData.enableToSend ? false : true}
                          >
                            {codigo == null
                              ? "Adicionar Sala"
                              : addAuthorization == true
                              ? "Autorizar acesso"
                              : "Remover acesso"}
                          </MDButton>
                        </MDBox> */}
                      </Grid>
                    </Grid>
                    {/* </MDBox> */}
                    <MDBox p={1}>
                      <Grid container spacing={3}></Grid>
                    </MDBox>
                  </Card>
                {/* </Grid> */}
                {!addAuthorization ? (
                  <Grid item xs={12} md={12} xl={12}>
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
                    {/* <LasAcessOverview
                      title="Últimos acessos"
                      profiles={roomListData}
                      codigo_salas={codigo}
                      shadow={false}
                    /> */}
                  </Grid>
                ) : null}
              {/* </Grid> */}
            {/* </Grid> */}
          {/* </Grid> */}
        {/* </MDBox> */}
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default RoomData;
