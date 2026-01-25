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

import { useEffect, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { useAuth } from "context/AuthProvider";
import { errorHandlingAPI, errorHandlingConnection} from "util";
import getApiAddress from "serverAddress";

// Data
import authorsTableData from "layouts/historicoAcesso/data/acessoPorUsuario";

function Historico() {

  const authData = useAuth();
  const [historicoAcessos, sethistoricoAcessos] = useState([]);

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

  const { columns, rows } = authorsTableData(historicoAcessos);

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
      <Footer />
    </DashboardLayout>
  );
}

export default Historico;
