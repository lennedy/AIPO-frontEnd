import PropTypes, { bool } from "prop-types";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";


import { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";

import getApiAddress from "serverAddress";

function EditRoomForm({ identificador, defaultValue, exibir, setExibir, isToUpdate, setIsToUpdate }) {
  const [inputName, setInputName] = useState(defaultValue.nomeSala);
  const [inputCode, setInputCode] = useState(defaultValue.codSala);
  const [inputLocal, setInputLocal] = useState(defaultValue.localizacao);
  const [inputFechadura, setInputFechadura] = useState(defaultValue.codFechadura);

  const handleName = (event) => {
    // disableUpdate = false;
    // nameChanged = true;
    setInputName(event.target.value);
  };
  const handleCode = (event) => {
    // disableUpdate = false;
    // codeChanged = true;
    setInputCode(event.target.value);
  };
  const handleLocal = (event) => {
    // disableUpdate = false;
    // localChanged = true;
    setInputLocal(event.target.value);
  };
  const handleFechadura = (event) => {
    // disableUpdate = false;
    // fechaduraChanged = true;
    setInputFechadura(event.target.value);
  };

  // return (
  //   <Popup
  //     trigger={
  //       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
  //         Edit
  //       </MDTypography>
  //     }
  //     onClose={() => {}}
  //     modal
  //     nested
  //   >
  //     {(close) => (
  //       <Card>
  //         <MDBox className="modal">
  //           <MDButton
  //             className="close"
  //             onClick={() => {
  //               close();
  //             }}
  //           >
  //             &times;
  //           </MDButton>
  //           <MDBox display="flex" alignItems="center" justifyContent="center">
  //             <MDTypography variant="h6">Edição de Sala</MDTypography>
  //           </MDBox>
  //         </MDBox>
          // <MDBox pt={3}></MDBox>
          // <MDInput
          //   type="text"
          //   label="Nome da Sala"
          //   required="false"
          //   onChange={handleName}
          //   defaultValue={defaultValue.nomeSala}
          //   fullWidth
          // ></MDInput>
          // <MDInput
          //   name="teste"
          //   type="text"
          //   label="Código da Sala"
          //   required="false"
          //   onChange={handleCode}
          //   defaultValue={defaultValue.codSala}
          //   fullWidth
          // ></MDInput>
          // <MDInput
          //   label="Localização"
          //   required="false"
          //   size="large"
          //   onChange={handleLocal}
          //   defaultValue={defaultValue.localizacao}
          //   fullWidth
          // ></MDInput>
          // <MDInput
          //   type="text"
          //   label="Código da Fechadura"
          //   required="true"
          //   onChange={handleFechadura}
          //   defaultValue={defaultValue.codFechadura}
          //   fullWidth
          // ></MDInput>
          // <div className="actions">
          //   <MDButton
          //     className="button"
          //     onClick={() => {
          //       console.log(inputName);
          //       console.log(inputCode);
          //       console.log(inputLocal);
          //       console.log(inputFechadura);
          //       console.log(identificador);
          //       const dadosSala = {
          //         nome: inputName,
          //         codigo: inputCode,
          //         local: inputLocal,
          //         fechadura: inputFechadura,
          //       };
          //       // alert("Funcionalidade não implementada!");
          //       setIsToUpdateRoom(false);
          //       const api = getApiAddress();
          //       fetch(api.database + "/sala/" + identificador, {
          //         method: "PUT",
          //         body: JSON.stringify(dadosSala),
          //         headers: { "Content-type": "application/json; charset=UTF-8" },
          //       })
          //         .then((response) => response.json())
          //         .then((json) => {
          //           if (json["status"] == "ok") {
          //             alert("modificação realizada");
          //           } else {
          //             alert("erro:" + json["status"]);
          //           }
          //         })
          //         .catch((err) => console.log(err))
          //         .finally(() => setIsToUpdateRoom(true));
          //     }}
          //   >
          //     atualizar
          //   </MDButton>
          //   <MDButton
          //     className="button"
          //     onClick={() => {
          //       console.log("modal closed ");
          //       close();
          //     }}
          //   >
          //     Cancelar
          //   </MDButton>
          //   <MDButton
          //     className="button"
          //     onClick={() => {
          //       setIsToUpdateRoom(false);
          //       const api = getApiAddress();
          //       console.log(api.database + "/sala/" + identificador);
          //       fetch(api.database + "/sala/" + identificador, {
          //         method: "DELETE",
          //         body: JSON.stringify(identificador),
          //         headers: { "Content-type": "application/json; charset=UTF-8" },
          //       })
          //         .then((response) => response.json())
          //         .then((json) => console.log(json))
          //         .catch((err) => console.log(err))
          //         .finally(() => setIsToUpdateRoom(true));
          //     }}
          //   >
          //     Apagar Registro
          //   </MDButton>
          // </div>
  //       </Card>
  //     )}
  //   </Popup>
  // );
  return (
    <Dialog
    open={Boolean(exibir)}
    onClose={() => setExibir(false)}
    // evita que o clique dentro do Dialog borbulhe e dispare handlers da linha/tabela
    onClick={(e) => e.stopPropagation()}
    fullWidth
    maxWidth="sm"
    >
      <DialogTitle>Editar usuário</DialogTitle>
      <DialogContent dividers>
        <card>
          <MDBox pt={1}></MDBox>
          <MDInput
            type="text"
            label="Nome da Sala"
            required="false"
            onChange={handleName}
            defaultValue={defaultValue.nomeSala}
            fullWidth
          ></MDInput>
          <MDBox pt={1}></MDBox>
          <MDInput
            name="teste"
            type="text"
            label="Código da Sala"
            required="false"
            onChange={handleCode}
            defaultValue={defaultValue.codSala}
            fullWidth
          ></MDInput>
          <MDBox pt={1}></MDBox>
          <MDInput
            label="Localização"
            required="false"
            size="large"
            onChange={handleLocal}
            defaultValue={defaultValue.localizacao}
            fullWidth
          ></MDInput>
          <MDBox pt={1}></MDBox>
          <MDInput
            type="text"
            label="Código da Fechadura"
            required="true"
            onChange={handleFechadura}
            defaultValue={defaultValue.codFechadura}
            fullWidth
          ></MDInput>
          <div className="actions">
            <MDButton
              className="button"
              onClick={() => {
                console.log(inputName);
                console.log(inputCode);
                console.log(inputLocal);
                console.log(inputFechadura);
                console.log(identificador);
                const dadosSala = {
                  nome: inputName,
                  codigo: inputCode,
                  local: inputLocal,
                  fechadura: inputFechadura,
                };
                // alert("Funcionalidade não implementada!");
                // setIsToUpdate(false);
                const api = getApiAddress();
                fetch(api.database + "/sala/" + identificador, {
                  method: "PUT",
                  body: JSON.stringify(dadosSala),
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
                  .catch((err) => console.log(err))
                  .finally(() => setIsToUpdate(true));
              }}
            >
              atualizar
            </MDButton>
            <MDButton
              className="button"
              onClick={() => {
                console.log("modal closed ");
                setExibir(false);
                // close();
              }}
            >
              Cancelar
            </MDButton>
            <MDButton
              className="button"
              onClick={() => {
                // setIsToUpdate(false);
                const api = getApiAddress();
                console.log(api.database + "/sala/" + identificador);
                fetch(api.database + "/sala/" + identificador, {
                  method: "DELETE",
                  body: JSON.stringify(identificador),
                  headers: { "Content-type": "application/json; charset=UTF-8" },
                })
                  .then((response) => response.json())
                  .then((json) => console.log(json))
                  .catch((err) => console.log(err))
                  .finally(() => setIsToUpdate(true));
              }}
            >
              Apagar Registro
            </MDButton>
          </div>
        </card>
      </DialogContent>
    </Dialog>
  );
}

EditRoomForm.defaultProps = {
  identificadorUsuario: "",
  defaultValue: {
    codSala: "",
    nomeSala: "",
    localizacao: "",
    codFechadura: "",
  },
};

EditRoomForm.propTypes = {
  identificadorUsuario: PropTypes.string,
  defaultValue: {
    codSala: PropTypes.string,
    nomeSala: PropTypes.string,
    localizacao: PropTypes.string,
    codFechadura: PropTypes.string,
  },
  exibir: PropTypes.bool.isRequired,    // obrigatório e precisa ser string
  setExibir: PropTypes.func.isRequired,   // obrigatório e precisa ser função
  isToUpdate: PropTypes.bool.isRequired,    // obrigatório e precisa ser string
  setIsToUpdate: PropTypes.func.isRequired,   // obrigatório e precisa ser função
};

export default EditRoomForm;