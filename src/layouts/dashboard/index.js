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

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";
import reportsRoomsData from "layouts/dashboard/data/reportsRoomsData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";

import getApiAddress from "serverAddress";
import formatDate from "util";

function Dashboard() {
  const [currentTime, setCurrentTime] = useState(0);
  const [numberAccess, setAccessToday] = useState(0);
  const [numUsuariosAtivos, serNumUsariosAtivos] = useState(0);
  const [numAcessosMes, setNumAcessosMes] = useState(0);

  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);

  const temp = new Date().setDate(today.getDate() - 30);
  const d_inicial = new Date(temp);

  console.log("ter");
  console.log(temp);
  const data_inicia_final = {
    data_inicial: formatDate(d_inicial, "aa-mm-dd"),
    data_final: formatDate(today, "aa-mm-dd"),
  };

  useEffect(() => {
    // fetch("/time")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setCurrentTime(data.time);
    //   });
    const api = getApiAddress();
    fetch(api.database + "/acessosHoje")
      .then((res) => res.json())
      .then((data) => {
        setAccessToday(data.numAcessos);
      });

    fetch(api.database + "/getUsuariosAtivos")
      .then((res) => res.json())
      .then((data) => {
        serNumUsariosAtivos(data.users.length);
        // setAccessToday(data.numAcessos);
      });
    fetch(api.database + "/acessosData", {
      method: "PUT",
      body: JSON.stringify(data_inicia_final),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Terminal");
        console.log(data_inicia_final);
        setNumAcessosMes(data.numResults);
      });
  });

  const { sales, tasks } = reportsLineChartData();
  const { acessosSalas } = reportsRoomsData();
  const dataChart = reportsBarChartData();
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Acessos em 7 dias"
                count={120}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Nº de acessos hoje"
                count={numberAccess}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Acesso em 30 dias"
                count={numAcessosMes}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person"
                title="Usuários"
                count={numUsuariosAtivos}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
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
                  description="Número de acessos por mês"
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
                  description="As salas mais acessadas nos últimos 30 dias"
                  date="just updated"
                  chart={acessosSalas}
                />
              </MDBox>
            </Grid>
          </Grid>
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

export default Dashboard;
