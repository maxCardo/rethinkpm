import { Checkbox, FormControlLabel, Grid } from "@mui/material";

const MaterialCheckbox = ({ label, checked, onChange }) => {
  return (
    <Grid size={{ xs: 6, md: 12 }}>
      <FormControlLabel
        control={<Checkbox checked={checked} onChange={onChange} />}
        label={label}
      />
    </Grid>
  );
};

export default MaterialCheckbox;
