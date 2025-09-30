import PropTypes, { bool } from "prop-types";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";

import Card from "@mui/material/Card";

import { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import Chip from "@mui/material/Chip";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@mui/material/styles";

import getApiAddress from "serverAddress";

function AuthorizeUser({ identificadorUsuario, salas, exibirForm, setExibirForm, isToUpdate, setIsToUpdate}){   
  let codigos = [];
  const [SelectSala, setSala] = useState([]);

  for (let key in salas) {
    codigos.push(salas[key].codigo);
  }
  const handleSelect = (event) => {
    const {
      target: { value },
    } = event;
    setSala(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  const theme = useTheme();

  return (
    <Dialog
      open={Boolean(exibirForm)}
      onClose={() => setExibirForm(false)}
      // evita que o clique dentro do Dialog borbulhe e dispare handlers da linha/tabela
      onClick={(e) => e.stopPropagation()}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Permissão de Portas</DialogTitle>

      <DialogContent dividers>
        <Card>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-chip-label">Salas autorizadas</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={SelectSala}
              onChange={handleSelect}
              input={<OutlinedInput id="select-multiple-chip" label="salas autorizadas" />}
              renderValue={(selected) => (
                <MDBox sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </MDBox>
              )}
            >
              {codigos.map((name) => (
                <MenuItem key={name} value={name} style={getStyles(name, SelectSala, theme)}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div className="actions">
            <MDButton
              className="button"
              onClick={() => {
                console.log(JSON.stringify(SelectSala));
                const api = getApiAddress();
                fetch(api.database + "/autorizarUsuario/" + identificadorUsuario, {
                  method: "PUT",
                  body: JSON.stringify(SelectSala),
                  headers: { "Content-type": "application/json; charset=UTF-8" },
                })
                  .then((response) => response.json())
                  .then((json) => {
                    if (json["status"] == "ok") {
                      alert("autorização concedida");
                    } else {
                      if (json["status"] == "sem chave") {
                        alert("cadastre uma chave para autorizar o usuário");
                        setExibirForm(false)
                      } else {
                        alert("erro:" + json["status"]);
                      }
                    }
                  })
                  .catch((err) => console.log(err))
                  .finally(() => setIsToUpdate(!isToUpdate));
              }}
            >
              enviar autorização
            </MDButton>
            <MDButton
              className="button"
              onClick={() => {
                console.log(SelectSala);
                setExibirForm(false)
              }}
            >
              Cancelar
            </MDButton>
            <MDButton
              className="button"
              onClick={() => {
                console.log("/autorizarUsuario/" + identificadorUsuario);
                const api = getApiAddress();
                fetch(api.database + "/autorizarUsuario/" + identificadorUsuario, {
                  method: "DELETE",
                  body: JSON.stringify(identificadorUsuario),
                  headers: { "Content-type": "application/json; charset=UTF-8" },
                })
                  .then((response) => response.json())
                  .then((json) => {
                    if (json["status"] == "ok") {
                      alert("remoção realizada");
                    } else {
                      alert("erro:" + json["status"]);
                    }
                  })
                  .catch((err) => console.log(err))
                  .finally(() => setIsToUpdate(!isToUpdate));
              }}
            >
              Remover autorizações
            </MDButton>
          </div>
        </Card>
      </DialogContent>
    </Dialog>

    // <Popup
    //   trigger={
    //     <MDTypography component="a" href="#" color="text">
    //       <Icon>more_vert</Icon>
    //     </MDTypography>
    //   }
    //   onClose={() => {}}
    //   modal
    //   nested
    // >
    //   {(close) => (
    //     <Card>
    //       <MDBox className="modal">
    //         <MDButton
    //           className="close"
    //           onClick={() => {
    //             close();
    //           }}
    //         >
    //           &times;
    //         </MDButton>
    //         <MDBox display="flex" alignItems="center" justifyContent="center">
    //           <MDTypography variant="h6">Permissão de Portas</MDTypography>
    //         </MDBox>
    //       </MDBox>
    //       <MDBox pt={3}></MDBox>
    //       <FormControl sx={{ m: 1, width: 300 }}>
    //         <InputLabel id="demo-multiple-chip-label">Salas autorizadas</InputLabel>
    //         <Select
    //           labelId="demo-multiple-chip-label"
    //           id="demo-multiple-chip"
    //           multiple
    //           value={SelectSala}
    //           onChange={handleSelect}
    //           input={<OutlinedInput id="select-multiple-chip" label="salas autorizadas" />}
    //           renderValue={(selected) => (
    //             <MDBox sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
    //               {selected.map((value) => (
    //                 <Chip key={value} label={value} />
    //               ))}
    //             </MDBox>
    //           )}
    //         >
    //           {codigos.map((name) => (
    //             <MenuItem key={name} value={name} style={getStyles(name, SelectSala, theme)}>
    //               {name}
    //             </MenuItem>
    //           ))}
    //         </Select>
    //       </FormControl>
    // <div className="actions">
    //   <MDButton
    //     className="button"
    //     onClick={() => {
    //       console.log(JSON.stringify(SelectSala));
    //       setIsToUpdateUsers(false);
    //       const api = getApiAddress();
    //       fetch(api.database + "/autorizarUsuario/" + identificadorUsuario, {
    //         method: "PUT",
    //         body: JSON.stringify(SelectSala),
    //         headers: { "Content-type": "application/json; charset=UTF-8" },
    //       })
    //         .then((response) => response.json())
    //         .then((json) => {
    //           if (json["status"] == "ok") {
    //             alert("autorização concedida");
    //           } else {
    //             if (json["status"] == "sem chave") {
    //               alert("cadastre uma chave para autorizar o usuário");
    //               close();
    //             } else {
    //               alert("erro:" + json["status"]);
    //             }
    //           }
    //         })
    //         .catch((err) => console.log(err))
    //         .finally(() => setIsToUpdateUsers(true));
    //     }}
    //   >
    //     enviar autorização
    //   </MDButton>
    //   <MDButton
    //     className="button"
    //     onClick={() => {
    //       console.log(SelectSala);
    //       close();
    //     }}
    //   >
    //     Cancelar
    //   </MDButton>
    //   <MDButton
    //     className="button"
    //     onClick={() => {
    //       console.log("/autorizarUsuario/" + identificadorUsuario);
    //       setIsToUpdateUsers(false);
    //       const api = getApiAddress();
    //       fetch(api.database + "/autorizarUsuario/" + identificadorUsuario, {
    //         method: "DELETE",
    //         body: JSON.stringify(identificadorUsuario),
    //         headers: { "Content-type": "application/json; charset=UTF-8" },
    //       })
    //         .then((response) => response.json())
    //         .then((json) => {
    //           if (json["status"] == "ok") {
    //             alert("remoção realizada");
    //           } else {
    //             alert("erro:" + json["status"]);
    //           }
    //         })
    //         .catch((err) => console.log(err))
    //         .finally(() => setIsToUpdateUsers(true));
    //     }}
    //   >
    //     Remover autorizações
    //   </MDButton>
    // </div>
    //     </Card>
    //   )}
    // </Popup>
  );
}


AuthorizeUser.propTypes = {
  identificadorUsuario: PropTypes.string.isRequired,
  salas: PropTypes.arrayOf(PropTypes.object).isRequired,
  exibirForm: PropTypes.bool.isRequired,
  setExibirForm: PropTypes.func.isRequired,
  isToUpdate: PropTypes.bool.isRequired,
  setIsToUpdate: PropTypes.func.isRequired,
};

export default AuthorizeUser;
