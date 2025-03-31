/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import Chip from "@mui/material/Chip";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";

export default function MySelect({ labelName, selectOptions, onChange, value }) {
  const codigos = [];
  for (let key in selectOptions) {
    codigos.push(selectOptions[key]);
  }

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-multiple-chip-label">{labelName}</InputLabel>
      <Select
        labelId="demo-multiple-chip-label"
        id="demo-multiple-chip"
        value={value}
        onChange={onChange}
        input={<OutlinedInput id="select-multiple-chip" label={labelName} />}
        renderValue={(selected) => (
          <MDBox sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </MDBox>
        )}
      >
        {codigos.map((name) => (
          <MenuItem key={name} value={name}>
            {name}
          </MenuItem>
        ))}
      </Select>
      <MDBox pt={1}></MDBox>
    </FormControl>
  );
}
