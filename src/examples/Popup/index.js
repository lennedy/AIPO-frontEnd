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

export default function FormDialog({ message }) {
  const [open, setOpen] = React.useState(false);

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
    handleClose();
  };

  return (
    <React.Fragment>
      {/* <Button onClick={handleClickOpen}> Adicionar usuarios do SUAP </Button> */}
      <Tooltip title={message} placement="top">
        <IconButton sx={{ cursor: "pointer" }} fontSize="small" onClick={handleClickOpen}>
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Adicionar usuário do SUAP</DialogTitle>
        <DialogContent sx={{ paddingBottom: 0 }}>
          <DialogContentText>Adicione a matrícula e pressione o botão de procura</DialogContentText>
          <form onSubmit={handleSubmit}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="matricula"
              label="Matrícula do suap"
              type="search"
              fullWidth
              variant="standard"
            />
            <DialogActions>
              <Button onClick={handleClose}>cancelar</Button>
              <Button type="submit">procurar</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

FormDialog.propTypes = {
  message: PropTypes.string.isRequired,
};
