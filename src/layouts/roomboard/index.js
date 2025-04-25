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
import React from "react";
import { useState, useEffect } from "react";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
import RoomCard from "layouts/roomboard/components/InfoCards/RoomCard";
import PaymentMethod from "layouts/billing/components/PaymentMethod";
// import RoomHead from "layouts/roomboard/components/RoomHead";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";

import getApiAddress from "serverAddress";
import RoomHead from "./components/RoomHead";

function Roomboard() {
  const [currentTime, setCurrentTime] = useState(0);
  const [numberAccess, setAccessToday] = useState(0);
  const [rooms, setRooms] = useState(0);

  useEffect(() => {
    // fetch("/time")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setCurrentTime(data.time);
    //   });
    const api = getApiAddress();
    fetch(api.database + "/salas")
      .then((res) => res.json())
      .then((data) => {
        // setAccessToday(data.numAcessos);
        setRooms(data);
      });
  }, []);

  const { sales, tasks } = reportsLineChartData();
  const dataChart = reportsBarChartData();
  // console.log(rooms[0].codigo);

  var salas = [];
  for (let key in rooms) {
    salas.push(rooms[key]);
  }
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <RoomHead />
                </Grid>
                {salas.map((salas) =>
                  salas.ativo ? (
                    <Grid key={salas.id} item xs={12} md={6} xl={3}>
                      <RoomCard icon="key" codigo={salas.codigo} nome={salas.nome} />
                    </Grid>
                  ) : null
                )}
              </Grid>
            </Grid>
          </Grid>
          {/* <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="Acessos por dia"
                  description="Número de acesso na semana"
                  date="just updated"
                  chart={dataChart}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="Acessos por mês"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="just updated"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="dark"
                  title="Acesso por Sala"
                  description="As quatro sals mais acessadas"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid> */}
        </MDBox>
        {/* <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox> */}
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Roomboard;
