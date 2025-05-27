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

import { useState, useEffect } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import VerticalAlignTopIcon from "@mui/icons-material/VerticalAlignTop";
import ClearIcon from "@mui/icons-material/Clear";
import * as React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useAuth } from "context/AuthProvider";
import getApiAddress from "serverAddress";

function PlatformSettings() {
  const [followsMe, setFollowsMe] = useState(true);
  const [answersPost, setAnswersPost] = useState(false);
  const [updateChave, setUpdateChave] = useState(false);
  const [chaveCadastrada, setChaveCadastrada] = useState(false);
  const [usuarioAtivo, setUsuarioAtivo] = useState(false);
  const [enableRegisterCard, setEnableRegisterCard] = useState(false);

  const [loaded, setLoaded] = React.useState(true);

  const authData = useAuth();

  useEffect(() => {
    const api = getApiAddress();
    fetch(api.serial + "/serialAvailable")
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "ok") {
          setEnableRegisterCard(true);
        } else {
          setEnableRegisterCard(false);
        }
      })
      .catch((error) => {
        setEnableRegisterCard(false);
      });

    fetch(api.database + "/usuario/" + authData.user.matricula)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.data[0].ativo);
        const ativo = data.data[0].ativo == 1 ? true : false;
        setUsuarioAtivo(ativo);
        const chaveCadastrada = data.data[0].chave == null ? false : true;
        setChaveCadastrada(chaveCadastrada);
      });
  }, [updateChave]);

  function handleUpdateClick() {
    setLoaded(true);
    setUpdateChave(true);

    const api = getApiAddress();
    fetch(api.database + "/chave/" + authData.user.matricula, {
      method: "PUT",
      body: JSON.stringify(authData.user.matricula),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((response) => response.json())
      .then((json) => {
        json["status"] == "ok" ? alert("chave lida") : alert("erro:" + json["status"]);
        setUpdateChave(false);
      })
      .catch((err) => console.log(err));
    // .finally(() => setIsToUpdateUsers(true));
  }
  function handleDeleteClick() {
    setLoaded(false);
    setUpdateChave(true);
    //alert("Funcionalidade não implementada!");
    const identificadorUsuario = authData.user.matricula;
    const api = getApiAddress();
    fetch(api.database + "/chave/" + identificadorUsuario, {
      method: "DELETE",
      body: JSON.stringify(identificadorUsuario),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json["status"] == "ok") {
          alert("modificação realizada");
        } else {
          alert("erro:" + json["status"]);
        }
        setUpdateChave(false);
      })
      .catch((err) => console.log(err));
    // .finally(() => setIsToUpdateUsers(true));
  }

  return (
    <Card sx={{ boxShadow: "none" }}>
      <MDBox p={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          Configurações
        </MDTypography>
      </MDBox>
      <MDBox pt={1} pb={2} px={2} lineHeight={1.25}>
        <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
          <MDBox mt={0.5}>
            <Checkbox disabled checked={usuarioAtivo} />
          </MDBox>
          <MDBox width="80%" ml={0.5}>
            <MDTypography variant="button" fontWeight="regular" color="text">
              Usuário ativo
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
          <MDBox mt={0.5}>
            <Checkbox disabled checked={chaveCadastrada} />
          </MDBox>
          <MDBox width="80%" ml={0.5}>
            <MDTypography variant="button" fontWeight="regular" color="text">
              Chave cadastrada
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
          <Button
            fullWidth
            disabled={!enableRegisterCard}
            loading={true}
            loadingPosition="end"
            endIcon={<VerticalAlignTopIcon />}
            variant="outlined"
            onClick={handleUpdateClick}
          >
            <MDTypography variant="button" fontWeight="regular" color="text">
              Registrar Chave
            </MDTypography>
          </Button>
        </MDBox>
        <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
          <Button
            fullWidth
            disabled={false}
            loading={loaded}
            loadingPosition="end"
            endIcon={<ClearIcon />}
            variant="outlined"
            onClick={handleDeleteClick}
          >
            <MDTypography variant="button" fontWeight="regular" color="text">
              Apagar Chave
            </MDTypography>
          </Button>
        </MDBox>
        {/* <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
          <MDBox mt={0.5}>
            <Switch checked={mentionsMe} onChange={() => setMentionsMe(!mentionsMe)} />
          </MDBox>
          <MDBox width="80%" ml={0.5}>
            <MDTypography variant="button" fontWeight="regular" color="text">
              Email me when someone mentions me
            </MDTypography>
          </MDBox>
        </MDBox> */}
        {/* <MDBox mt={3}>
          <MDTypography variant="caption" fontWeight="bold" color="text" textTransform="uppercase">
            application
          </MDTypography>
        </MDBox>
        <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
          <MDBox mt={0.5}>
            <Switch checked={newLaunches} onChange={() => setNewLaunches(!newLaunches)} />
          </MDBox>
          <MDBox width="80%" ml={0.5}>
            <MDTypography variant="button" fontWeight="regular" color="text">
              New launches and projects
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
          <MDBox mt={0.5}>
            <Switch checked={productUpdate} onChange={() => setProductUpdate(!productUpdate)} />
          </MDBox>
          <MDBox width="80%" ml={0.5}>
            <MDTypography variant="button" fontWeight="regular" color="text">
              Monthly product updates
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
          <MDBox mt={0.5}>
            <Switch checked={newsletter} onChange={() => setNewsletter(!newsletter)} />
          </MDBox>
          <MDBox width="80%" ml={0.5}>
            <MDTypography variant="button" fontWeight="regular" color="text">
              Subscribe to newsletter
            </MDTypography>
          </MDBox>
        </MDBox> */}
      </MDBox>
    </Card>
  );
}

export default PlatformSettings;
