import Card from "@mui/material/Card";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import Icon from "@mui/material/Icon";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import robotica from "assets/images/lab-robotica.jpeg";

const avatars = (members) =>
  members.map(([image, name]) => (
    <Tooltip key={name} title={name} placeholder="bottom">
      <MDAvatar
        src={image}
        alt="name"
        size="xs"
        sx={{
          border: ({ borders: { borderWidth }, palette: { white } }) =>
            `${borderWidth[2]} solid ${white.main}`,
          cursor: "pointer",
          position: "relative",

          "&:not(:first-of-type)": {
            ml: -1.25,
          },

          "&:hover, &:focus": {
            zIndex: "10",
          },
        }}
      />
    </Tooltip>
  ));


export default function roomsTableData(Salas, onEdit, onAuthorize, onReadTag) {
  const Project = ({ image, name, codigo }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{codigo}</MDTypography>
      </MDBox>
    </MDBox>
  );

  // let Salas =
  //   [
  //   { "codigo":"a208" , "nome":"Robótica" , "local":"anexo" , "fechadura":"a3 98 45 b3" },
  //   { "codigo":"212" , "nome":"Estudo Informática" , "local":"prédio principal" , "fechadura":"" },
  //   { "codigo":"a111" , "nome":"Maker" , "local":"anexo" , "fechadura":"cd ef f4 4d" } 
  //   ];
  
  // const obj = JSON.parse(data);
  var salas = [];
  
  for (let key in Salas) {
    salas[key] = {
      sala: <Project image={robotica} name={Salas[key].nome} codigo={Salas[key].codigo} />,
      codigo: (
        <MDBox display="flex" py={1}>
          {avatars([
            [team1, "Ryan Tompson"],
            [team2, "Romina Hadid"],
            [team3, "Alexander Smith"],
            [team4, "Jessica Doe"],
          ])}
          <MDTypography component="a" href="#" color="text">
            <Icon>more_vert</Icon>
          </MDTypography>
        </MDBox>
      ),
      local: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {Salas[key].local}
        </MDTypography>
      ),
      fechadura: (
        <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
          {Salas[key].fechadura}
        </MDTypography>
      ),
      action: (
        <MDBox display="flex" py={1}>
          {/* {avatars(usuarioSalas)} */}
          <IconButton
            onClick={(e) => onEdit(e, Salas[key])}
          >
            {/* <Icon>more_vert</Icon> */}
            <EditIcon/>
          </IconButton>
        </MDBox>
        // <EditRoomForm
        //   identificador={Salas[key].id}
        //   defaultValue={{
        //     nomeSala: Salas[key].nome,
        //     codSala: Salas[key].codigo,
        //     localizacao: Salas[key].local,
        //     codFechadura: Salas[key].fechadura,
        //   }}
        // />
      ),
    };
  }

  return {
    columns: [
      { Header: "Sala", accessor: "sala", width: "30%", align: "left" },
      { Header: "Código", accessor: "codigo", align: "left" },
      { Header: "Localização", accessor: "local", align: "center" },
      { Header: "fechadura", accessor: "fechadura", align: "center" },
      { Header: "Editar", accessor: "action", align: "center" },
    ],

    rows: salas,
  };
}