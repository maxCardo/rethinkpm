import { CircularProgress} from "@mui/material";


const circularProgress = () => {
    return(
           <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "4rem",
                  height: `calc(75vh - 0px)`,
                }}
              >
                <CircularProgress size={60} />
              </div>
    )

}

export default circularProgress


