import PropTypes, { bool } from "prop-types";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";


import { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";

import getApiAddress from "serverAddress";

function ListOfUsers({title, columns, rows, exibir, setExibir, isToUpdate, setIsToUpdate, handleSendClick }) {

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
            <MDButton
              className="button"
              onClick={ handleSendClick }
            >
              Enviar solicitação
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
          </div>
        </card>
      </DialogContent>
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