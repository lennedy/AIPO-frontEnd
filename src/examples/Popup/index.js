/* import React from "react";
import Popup from "reactjs-popup";

const Modal = () => (
  <Popup trigger={<button className="button"> Open Modal </button>} modal>
    <span> Modal content </span>
  </Popup>
);

        <MDTypography component="a" href="#" color="text">
          <Icon>more_vert</Icon>
        </MDTypography>


 */
import * as React from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import PropTypes from "prop-types";
import getApiAddress from "serverAddress";
import dialogAddUser from "examples/PopupAddUser";

export default function FormDialog({ message, label, handleAddUser }) {
  const [open, setOpen] = React.useState(false);
  const [addUser, setAddUser] = React.useState(false);
  const [nome, setNome] = React.useState("");
  const [matr, setMatr] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const matricula = formJson.matricula;
    console.log(matricula);
    const api = getApiAddress();
    const endereco = api.database + "/procurarUsuarioSUAP/" + matricula.replace(/\s/g, "");
    // console.log(endereco);
    fetch(endereco)
      .then((response) => response.json())
      .then((json) => {
        // console.log(json);
        if (json.status != "ok") {
          alert(json.status);
        } else {
          console.log(json.dados.nome);
          setNome(json.dados.nome);
          setMatr(json.dados.matricula);
          setAddUser(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // .finally(() => setIsToUpdateUsers(true));
    // handleClose();
  };

  const handleSubmitDatabase = (event) => {
    event.preventDefault();
    const api = getApiAddress();
    const dataToServer = {
      nome: nome,
      matricula: matr,
      tipoUsuario: "Aluno",
      nivelGerencia: "Usuário",
    };
    console.log(dataToServer);
    fetch(api.database + "/adicionarUsuarios", {
      method: "POST",
      body: JSON.stringify(dataToServer),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        // console.log(json.dados.nome);
        setAddUser(false);
        if (json["status"] == "ok") {
          alert("Adição realizada com sucesso");
          handleClose();
        } else {
          alert("Erro:" + json["status"]);
        }
      })
      // .then((json) =>
      //   json["status"] == "ok"
      //     ? alert("Adição realizada com sucesso")
      //     : alert("Erro:" + json["status"])
      // )
      .catch((err) => console.log(err));
    // .finally(() => setIsToUpdateUsers(true));
  };

  const handleAddUserLocal = (event) => {
    event.preventDefault();
    const userData = {
      nome: nome,
      matricula: matr,
      nivelGerencia: "Aluno",
      tipoUsuario: "Usuário",
    };
    handleAddUser(userData);
    handleClose();
  };

  return (
    <React.Fragment>
      {/* <Button onClick={handleClickOpen}> Adicionar usuarios do SUAP </Button> */}
      <Tooltip title={message} placement="top">
        {/* <IconButton sx={{ cursor: "pointer" }} fontSize="small" onClick={handleClickOpen}>
          <AddIcon />
        </IconButton> */}
        <Button
          sx={{ cursor: "pointer" }}
          fontSize="small"
          onClick={handleClickOpen}
          startIcon={<AddIcon />}
        >
          {label}
        </Button>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {addUser == false ? "Procure usuário no SUAP" : "Adicionar usuário do SUAP no banco"}
        </DialogTitle>
        <DialogContent sx={{ paddingBottom: 0 }}>
          <DialogContentText>
            {addUser == false ? "" : "Dados do usuário para ser adicionado"}
          </DialogContentText>
          <form onSubmit={addUser == false ? handleSubmit : handleAddUserLocal}>
            {addUser == false ? (
              <TextField
                autoFocus
                required={addUser ? false : true}
                disabled={addUser ? true : false}
                margin="dense"
                id="name"
                name="matricula"
                label="Matrícula do suap"
                type="search"
                fullWidth
                variant="standard"
              />
            ) : (
              <TextField
                autoFocus
                required={addUser ? false : true}
                disabled={addUser ? true : false}
                margin="dense"
                id="name"
                value={matr}
                name="matricula"
                label="Matrícula do suap"
                type="search"
                fullWidth
                variant="standard"
              />
            )}
            {addUser == false ? null : (
              <TextField
                autoFocus
                margin="dense"
                id="name"
                name="nome"
                label="Nome"
                disabled
                value={nome}
                type="text"
                fullWidth
                variant="standard"
              />
            )}
            {addUser == false ? null : (
              <TextField
                autoFocus
                margin="dense"
                id="name"
                name="Tipo usuario"
                label="Tipo de usuário"
                disabled
                value="Aluno"
                type="text"
                fullWidth
                variant="standard"
              />
            )}
            {addUser == false ? null : (
              <TextField
                autoFocus
                margin="dense"
                id="name"
                name="Nível gerenciamento"
                label="Nível de gerenciamento"
                disabled
                value="Usuário"
                type="text"
                fullWidth
                variant="standard"
              />
            )}
            <DialogActions>
              <Button onClick={handleClose}>cancelar</Button>
              <Button type="submit">{addUser == false ? "procurar" : "adcionar no banco"}</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

FormDialog.propTypes = {
  message: PropTypes.string.isRequired,
  label: PropTypes.string,
  handleAddUser: PropTypes.func.isRequired,
};
