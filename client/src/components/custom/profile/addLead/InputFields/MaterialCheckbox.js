import { Checkbox, FormControlLabel, Grid } from "@mui/material";

const MaterialCheckbox = ({ label }) => {
  return (
    <Grid size={{ xs: 6, md: 12 }}>
      <FormControlLabel control={<Checkbox />} label={label} />
    </Grid>
  );
};

export default MaterialCheckbox;
