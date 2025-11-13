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

import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

import RoomInfo from "../RoomInfo";

// Images
import masterCardLogo from "assets/images/logos/mastercard.png";
import visaLogo from "assets/images/logos/visa.png";
import robotica from "assets/images/lab-robotica.jpeg";

// Material Dashboard 2 React context
import { useMaterialUIController } from "context";

function RoomHead({ nome, codigo, localizacao }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  // console.log(codigo);
  return (
    <Card id="delete-account">
      <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
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
            {/* <MDButton variant="gradient" color="dark">
              <Icon sx={{ fontWeight: "bold" }}>add</Icon>
              &nbsp;{codigo == null ? "Adicionar Sala" : "Autorizar acesso"}
            </MDButton> */}
          </MDBox>
        </Grid>
      </MDBox>
      <MDBox p={1}>
        <Grid container spacing={3}></Grid>
      </MDBox>
    </Card>
  );
}

// Setting default values for the props of DefaultInfoCard
RoomHead.defaultProps = {
  nome: "",
  localizacao: "",
};

// Typechecking props for the DefaultInfoCard
RoomHead.propTypes = {
  codigo: PropTypes.string,
  nome: PropTypes.string,
  localizacao: PropTypes.string,
};

export default RoomHead;
