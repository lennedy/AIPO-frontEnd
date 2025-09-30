
import PropTypes from "prop-types";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDButton from "components/MDButton";

import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";

import logoRobotica2 from "assets/images/logo-robotica-small2.png";
import UserImg from "assets/images/usuario.png";

export default function UsersTableData(Usuarios, UsuariosSalas, onEdit, onAuthorize, onReadTag) {
  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

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

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  var temp2 = [];

  for (let key in Usuarios) {
    let usuarioSalas = [];
    for (let i in UsuariosSalas[Usuarios[key].matricula]) {
      usuarioSalas.push([logoRobotica2, UsuariosSalas[Usuarios[key].matricula][i]]);
    }
    temp2[key] = {
      author: <Author image={UserImg} name={Usuarios[key].nome} email={Usuarios[key].matricula} />,
      function: <Job title={Usuarios[key].tipoUsuario} description={Usuarios[key].nivelGerencia} />,
      search: Usuarios[key].nome + Usuarios[key].matricula,
      status: (
        <MDBox ml={-1}>
          <MDButton
            badgeContent={
              Usuarios[key].ativo == 0
                ? "inativo"
                : Usuarios[key].chave == null
                ? "não cadastrado"
                : "cadastrado"
            }
            color={
              Usuarios[key].ativo == 0
                ? "error"
                : Usuarios[key].chave == null
                ? "warning"
                : "success"
            }
            variant="gradient"
            size="small"
            onClick={() => {
              if (Usuarios[key].ativo == 1) {
                onReadTag();
              } 
            }}
          >
            {Usuarios[key].chave == null
              ? "não cadastrado"
              : Usuarios[key].ativo == 0
              ? "inativo"
              : "cadastrado"}
          </MDButton>
        </MDBox>
      ),
      employed: (
        <MDBox display="flex" py={1}>
          {avatars(usuarioSalas)}
          <IconButton
            onClick={(e) => onAuthorize(e, Usuarios[key])}
          >
            <Icon>more_vert</Icon>
          </IconButton>
        </MDBox>
      ),
      action: (
        <IconButton
          onClick={(e) => onEdit(e, Usuarios[key])}
        >
          {/* {avatars(usuarioSalas)}
          <AutorizeForm identificadorUsuario={Usuarios[key].matricula} salas={Salas} /> */}
          <Icon>more_vert</Icon>
        </IconButton>
      ),
    };
  }

  return {
    columns: [
      {
        Header: "Usuário",
        accessor: "author",
        width: "45%",
        align: "left",
        customFilterAndSearch: (term, rowData) => {
          console.log("Teste");
          return term == rowData.name;
        },
      },
      { Header: "função", accessor: "function", align: "left" },
      { Header: "status da chave", accessor: "status", align: "center" },
      { Header: "Salas autorizadas", accessor: "employed", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
      { Header: "search", accessor: "search", align: "center", hidden: true },
    ],

    rows: temp2,
  };
}

UsersTableData.propTypes = {
  Usuarios: PropTypes.arrayOf(PropTypes.object).isRequired,
  UsuariosSalas: PropTypes.arrayOf(PropTypes.object).isRequired,
  onEdit: PropTypes.func.isRequired,
  onAuthorize: PropTypes.func.isRequired,
  onReadTag: PropTypes.func.isRequired,
};