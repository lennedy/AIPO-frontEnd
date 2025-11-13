import PropTypes, { bool } from "prop-types";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";


import { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import Card from "@mui/material/Card";
import { useMaterialUIController } from "context";

import getApiAddress from "serverAddress";

function ListOfUsers({title, columns, rows, exibir, setExibir, isToUpdate, setIsToUpdate, handleSendClick, shadow}) {

  const [controller] = useMaterialUIController();
  const { darkMode } = controller
  // const columns = [];
  // const rows = [];

  return (
    <Dialog
    open={Boolean(exibir)}
    onClose={() => setExibir(false)}
    // evita que o clique dentro do Dialog borbulhe e dispare handlers da linha/tabela
    onClick={(e) => e.stopPropagation()}
    fullWidth
    maxWidth="sm"
    >
      <Card sx={{ height: "100%", boxShadow: !shadow && "none" }}>
        <DialogTitle> {title} </DialogTitle>
        <DialogContent dividers>
          <card>
            <DataTable
              table={{ columns: columns, rows: rows }}
              isSorted={false}
              entriesPerPage={false}
              showTotalEntries={false}
              noEndBorder
            />
            <MDBox pt={1}></MDBox>
            <div className="actions">
              <MDBox
                sx={{
                  display: "flex",
                  mt: 2,
                  mr: 1,
                }}
              >
                <MDButton
                  className="button"
                  variant="contained"
                  color={darkMode ? "secondary" : "dark"}
                  onClick={() => {
                    handleSendClick();
                    setExibir(false);
                  }}
                >
                  Enviar solicitação
                </MDButton>
                <MDBox sx={{ mx: 1, width: "8rem", minWidth: "8rem" }}>
                  <MDButton
                    className="button"
                    variant="contained"
                    color={darkMode ? "secondary" : "dark"}
                    onClick={() => {
                      console.log("modal closed ");
                      setExibir(false);
                      // close();
                    }}
                  >
                    Cancelar
                  </MDButton>
                </MDBox>
              </MDBox>
            </div>
          </card>
        </DialogContent>
      </Card>
    </Dialog>
  );
}

ListOfUsers.defaultProps = {
  identificador: "",
};

ListOfUsers.propTypes = {
  title: PropTypes.string,
  columns: PropTypes.array,
  rows: PropTypes.array,
  exibir: PropTypes.bool.isRequired,    // obrigatório e precisa ser string
  setExibir: PropTypes.func.isRequired,   // obrigatório e precisa ser função
  isToUpdate: PropTypes.bool.isRequired,    // obrigatório e precisa ser bool
  setIsToUpdate: PropTypes.func.isRequired,   // obrigatório e precisa ser função
  handleSendClick: PropTypes.func.isRequired,   // obrigatório e precisa ser função
};

export default ListOfUsers;