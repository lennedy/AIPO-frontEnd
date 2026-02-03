/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import UserImg from "assets/images/usuario.png";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import { Search } from "@mui/icons-material";

export default function data(historicoAcessos) {
  const Usuario = ({ image, name, matricula }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{matricula}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Sala = ({ simbolo, nomeSala }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {simbolo}
      </MDTypography>
      <MDTypography variant="caption">{nomeSala}</MDTypography>
    </MDBox>
  );

  // console.log("Acessos:");
  // console.log(historicoAcessos);

  let acessos=[];
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  for(const acesso of historicoAcessos){
    const data = new Date(acesso.timestamp);
    data.setHours(data.getHours() + 3);
    const dia  = data.toLocaleDateString("pt-BR");
    const hora = data.toLocaleTimeString("pt-BR");
    const alvo = new Date(data);
    alvo.setHours(0, 0, 0, 0);
    const diffDias = (alvo - hoje) / (1000 * 60 * 60 * 24);
    const linha = 
    {
      usuario: <Usuario image={UserImg} name={acesso.usuario_nome} matricula={acesso.usuario_matricula} />,
      sala: <Sala simbolo={acesso.sala_codigo} nomeSala={acesso.sala_nome} />,
      status: (
        <MDBox ml={-1}>
          <MDBadge
            badgeContent={acesso.autorizado ? "autorizado": "não autorizado"} 
            color={acesso.autorizado ? "success": "error"}  
            variant="gradient" 
            size="sm" 
          />
        </MDBox>
        ),
        diaHorario: (
          <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
            { diffDias===0 ? "hoje":
              ( 
                diffDias===-1 ? "ontem" : dia
              )
            } às {hora}
          </MDTypography>
        ),
        search: acesso.usuario_nome+acesso.usuario_matricula+acesso.sala_nome+acesso.sala_codigo, 
    };
    acessos.push(linha);
    
  }

  return {
    columns: [
      { Header: "Usuario", accessor: "usuario", width: "45%", align: "left" },
      { Header: "Sala", accessor: "sala", align: "left" },
      { Header: "Status", accessor: "status", align: "center" },
      { Header: "Horario de Acesso", accessor: "diaHorario", align: "center" },
      { Header: "search", accessor: "search", align: "center", hidden: true },
  
    ],
    rows: acessos, 
  };
}
