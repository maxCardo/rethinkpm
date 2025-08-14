import { Checkbox, FormControlLabel, Grid } from "@mui/material";

const MaterialCheckbox = ({ label, checked, onChange, disabled }) => {
  return (
    <Grid size={{ xs: 6, md: 12 }}>
      <FormControlLabel
        control={<Checkbox checked={checked} onChange={onChange} />}
        label={label}
        disabled={disabled}
      />
    </Grid>
  );
};

export default MaterialCheckbox;
