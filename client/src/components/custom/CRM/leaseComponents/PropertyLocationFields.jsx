import TextField from "../../profile/addLead/InputFields/TextField";
import { Typography, Divider } from "@mui/material";

const PropertyLocationFields = ({ formData, handleInputChange }) => {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Property Location
      </Typography>
      <Divider className="mb-4" />
      <div className="flex flex-wrap gap-4 items-center mb-2">
        <TextField
          field={{ name: "Address", accessor: "listingAddress" }}
          withLabel={false}
          col={12}
          onChange={(e) => handleInputChange(e, "listingAddress")}
          value={formData.listingAddress || ""}
        />
      </div>
    </div>
  );
};

export default PropertyLocationFields;
