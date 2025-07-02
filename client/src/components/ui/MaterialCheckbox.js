import { Checkbox, FormControlLabel, Grid } from "@mui/material";

const MaterialCheckbox = ({ label, checked }) => {
  return (
    <Grid size={{ xs: 6, md: 12 }}>
      <FormControlLabel
        control={<Checkbox checked={checked} />}
        label={label}
      />
    </Grid>
  );
};

export default MaterialCheckbox;
