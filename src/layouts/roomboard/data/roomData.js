import { useLocation } from "react-router-dom";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import Grid from "@mui/material/Grid";
import Footer from "examples/Footer";
import MDBox from "components/MDBox";
import Header from "layouts/profile/components/Header";

import roomListData from "layouts/profile/data/roomListData";
import RoomList from "examples/Lists/RoomList";
import LasAcessOverview from "layouts/profile/components/LastAcessOverview";
import PaymentMethod from "layouts/billing/components/PaymentMethod";

import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";

function ComponentB() {
  const location = useLocation();
  const dataChart = reportsBarChartData();

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={3}>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <PaymentMethod />
                </Grid>
                <Grid item xs={12} md={6} xl={6}>
                  <LasAcessOverview
                    title="Últimos acessos"
                    profiles={roomListData}
                    shadow={false}
                  />
                </Grid>
                <Grid item xs={12} md={6} xl={6}>
                  <LasAcessOverview
                    title="Últimos acessos"
                    profiles={roomListData}
                    shadow={false}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}
export default ComponentB;
