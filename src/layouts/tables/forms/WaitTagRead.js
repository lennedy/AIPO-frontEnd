import PropTypes, { bool } from "prop-types";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";

function EditUserForm({ exibir, setExibir}) {
 
  return (
    <Dialog
      open={Boolean(exibir)}
      onClose={() => setExibir(false)}
      // evita que o clique dentro do Dialog borbulhe e dispare handlers da linha/tabela
      onClick={(e) => e.stopPropagation()}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Aproxime a tag do leitor</DialogTitle>
      <DialogContent dividers></DialogContent>
    </Dialog>
  );

}

EditUserForm.propTypes = {
  exibir: PropTypes.bool.isRequired,    // obrigatório e precisa ser string
  setExibir: PropTypes.func.isRequired,   // obrigatório e precisa ser função
};

export default EditUserForm;