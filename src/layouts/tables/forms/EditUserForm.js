import PropTypes, { bool } from "prop-types";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";

import { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";

import Popup from "reactjs-popup";
import Switch from "@mui/material/Switch";
import Card from "@mui/material/Card";
import MySelect from "layouts/tables/myComponents";

import getApiAddress from "serverAddress";

function EditUserForm({ identificadorUsuario, defaultValue, editingUser, setEditingUser, isToUpdate, setIsToUpdate}) {
  const [inputMatr, setInputMatr] = useState(defaultValue.matricula);
  const [inputName, setInputName] = useState(defaultValue.nome);
  const [inputTipoUsario, setInputTipoUsuario] = useState([defaultValue.tipoUsuario]);
  const [inputTipoGeren, setInputTipoGeren] = useState([defaultValue.nivelGerencia]);
  const [inputChave, setInputChave] = useState(defaultValue.chave);
  const [inputUsuarioAtivo, setInputUsuarioAtivo] = useState(defaultValue.usuarioAtivo);

  useEffect(()=>{
    setInputMatr(defaultValue?.matricula ?? "");
    setInputName(defaultValue?.nome ?? "");
    setInputTipoUsuario([defaultValue.tipoUsuario]);
    setInputTipoGeren([defaultValue.nivelGerencia]);
    setInputChave(defaultValue.chave);
    setInputUsuarioAtivo(defaultValue.usuarioAtivo);
  }, [identificadorUsuario]);

  const handleMatr = (event) => {
    setInputMatr(event.target.value);
  };
  const handleName = (event) => {
    setInputName(event.target.value);
  };
  const handleTipoUsuario = (event) => {
    const {
      target: { value },
    } = event;
    setInputTipoUsuario(typeof value === "string" ? value.split(",") : value);
  };
  const handleTipoGeren = (event) => {
    const {
      target: { value },
    } = event;
    setInputTipoGeren(typeof value === "string" ? value.split(",") : value);
  };
  const handleChave = (event) => {
    setInputChave(event.target.value);
  };
  const handleUsuarioAtivo = (event) => {
    setInputUsuarioAtivo(!inputUsuarioAtivo);
  };

  const dadosVaziosUsuario = {matricula: "", nome: "", ativo: "", chave: "", nivelGerencia: "usuário", tipoUsuario: "aluno"}

  return (

  <Dialog
    open={Boolean(editingUser)}
    onClose={() => setEditingUser(false)}
    // evita que o clique dentro do Dialog borbulhe e dispare handlers da linha/tabela
    onClick={(e) => e.stopPropagation()}
    fullWidth
    maxWidth="sm"
  >
  <DialogTitle>Editar usuário</DialogTitle>
    <DialogContent dividers>
      <Card>
        <MDInput
          type="text"
          label="Matrícula"
          required="true"
          onChange={handleMatr}
          defaultValue={defaultValue.matricula}
          fullWidth
        ></MDInput>
        <MDBox pt={1}></MDBox>
        <MDInput
          type="text"
          label="Nome"
          required="true"
          onChange={handleName}
          defaultValue={defaultValue.nome}
          fullWidth
        ></MDInput>
        <MDBox pt={1}></MDBox>
        <MySelect
          labelName={"Tipo de usuário"}
          selectOptions={["aluno", "TAE", "docente", "terceirizado", "externo"]}
          onChange={handleTipoUsuario}
          value={inputTipoUsario}
        />
        <MDBox pt={1}></MDBox>
        <MySelect
          labelName="Tipo de gerenciamento"
          selectOptions={["usuário", "gerente", "administrador"]}
          onChange={handleTipoGeren}
          value={inputTipoGeren}
        />
        <MDBox display="flex" alignItems="center">
          <MDInput
            type="text"
            label="Chave de acesso"
            onChange={handleChave}
            defaultValue={defaultValue.chave}
            fullWidth
          ></MDInput>
          <MDButton
            variant="contained"
            onClick={() => {
              const api = getApiAddress();
              // setIsToUpdateUsers(false);
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
                })
                .catch((err) => console.log(err));
                // .finally(() => setIsToUpdateUsers(true));
            }}
          >
            <MDTypography variant="button" fontWeight="regular" color="text">
              Apagar chave
            </MDTypography>
          </MDButton>
        </MDBox>
        <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
          <MDBox mt={0.5}>
            <Switch checked={inputUsuarioAtivo} onChange={handleUsuarioAtivo} />
          </MDBox>
          <MDBox width="80%" ml={0.5}>
            <MDTypography variant="button" fontWeight="regular" color="text">
              Usuário ativo
            </MDTypography>
          </MDBox>
        </MDBox>
        <div className="actions">
          <MDButton
            className="button"
            onClick={() => {
              console.log(inputMatr);
              console.log(inputName);
              console.log(inputTipoUsario);
              console.log(inputTipoGeren);
              console.log(inputChave);
              const data = {
                matr: inputMatr,
                nome: inputName,
                tipoUsuario: inputTipoUsario[0],
                tipoGerencia: inputTipoGeren[0],
                usuarioAtivo:
                  inputUsuarioAtivo == true
                    ? 1
                    : inputUsuarioAtivo == false
                    ? 0
                    : inputUsuarioAtivo,
              };
              // setIsToUpdateUsers(false);
              const api = getApiAddress();
              fetch(api.database + "/usuario/" + identificadorUsuario, {
                method: "PUT",
                body: JSON.stringify(data),
                headers: { "Content-type": "application/json; charset=UTF-8" },
              })
                .then((response) => response.json())
                .then((json) => {
                  if (json["status"] == "ok") {
                    setIsToUpdate(true);
                    alert("modificação realizada");
                    setEditingUser(false);
                  } else {
                    if (json["status"] == "sem chave") {
                      alert("cadastre uma chave para autorizar o usuário");
                      setEditingUser(false);
                    } else {
                      alert("erro:" + json["status"]);
                    }
                  }
                })
                .catch((err) => console.log(err));
                // .finally(() => setIsToUpdateUsers(true));
            }}
          >
            atualizar
          </MDButton>
          <MDButton
            className="button"
            onClick={() => {
              setEditingUser(false);
            }}
          >
            Cancelar
          </MDButton>
          <MDButton
            className="button"
            onClick={() => {
              console.log("/usuario/" + identificadorUsuario);
              // setIsToUpdateUsers(false);
              const api = getApiAddress();
              fetch(api.database + "/usuario/" + identificadorUsuario, {
                method: "DELETE",
                body: JSON.stringify(identificadorUsuario),
                headers: { "Content-type": "application/json; charset=UTF-8" },
              })
                .then((response) => response.json())
                .then((json) => console.log(json))
                .catch((err) => console.log(err))
                .finally(() => setIsToUpdate(true));
            }}
          >
            Apagar
          </MDButton>
        </div>
      </Card>
    </DialogContent>
  </Dialog>
  );
}

// Setting default values for the props of DefaultInfoCard
EditUserForm.defaultProps = {
  identificadorUsuario: "",
  defaultValue: {
    matricula: "",
    nome: "",
    tipoUsuario: "",
    nivelGerencia: "",
    chave: "",
    usuarioAtivo: "",
  },
};

// Typechecking props for the DefaultInfoCard
EditUserForm.propTypes = {
  identificadorUsuario: PropTypes.string,
  defaultValue: {
    matricula: PropTypes.string,
    nome: PropTypes.string,
    tipoUsuario: PropTypes.string,
    nivelGerencia: PropTypes.string,
    chave: PropTypes.string,
    usuarioAtivo: PropTypes.string,
  },
  editingUser: PropTypes.bool.isRequired,    // obrigatório e precisa ser string
  setEditingUser: PropTypes.func.isRequired,   // obrigatório e precisa ser função
};

export default EditUserForm;
