import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useGetModels } from "../../contexts/getModelContext";

export default function ShowUserInput() {
  const { userInput, getInRangeModel } = useGetModels();

  const units = {
    default: "Unit",
    f_unit1: `m3/h`,
    f_unit2: "L/s",
    h_unit1: "m",
  };

  return (
    <Card
      sx={{ minWidth: 275, marginBottom: 2, width: "auto", marginRight: 2 }}
    >
      <CardContent>
        <Typography variant="h5" component="div" sx={{ mb: 3 }}>
          Duty point
        </Typography>
        <form action="">
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              paddingLeft: 3,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              component="main"
              sx={{
                display: "flex",
                marginBottom: 2,
              }}
            >
              <label
                htmlFor="flow_input"
                style={{
                  alignContent: "center",
                }}
              >
                Flow&nbsp;&nbsp;&nbsp;
              </label>
              <input
                id="flow_input"
                type="number"
                value={
                  userInput.flow_m3hr ? userInput.flow_m3hr : userInput.flow_ls
                }
                min={"0"}
                style={{
                  paddingLeft: 3,
                }}
                disabled
              />
              <div>
                <Button
                  id="fade-buttonF"
                  style={{ textTransform: "none" }}
                  variant="outlined"
                  size="small"
                  color="inherit"
                  disabled
                >
                  {userInput.flow_m3hr ? units.f_unit1 : units.f_unit2}
                </Button>
              </div>
            </Box>

            <Box
              component="main"
              sx={{
                display: "flex",
              }}
            >
              <label
                htmlFor="head_input"
                style={{
                  alignContent: "center",
                }}
              >
                Head&nbsp;&nbsp;
              </label>
              <input
                id="head_input"
                type="number"
                value={userInput.head && userInput.head}
                min={"0"}
                style={{ paddingLeft: 3 }}
                disabled
              />
              <div>
                <Button
                  id="fade-buttonH"
                  style={{ textTransform: "none" }}
                  variant="outlined"
                  size="small"
                  color="inherit"
                  disabled
                >
                  {units.h_unit1}
                </Button>
              </div>
            </Box>
          </Box>
        </form>
      </CardContent>

      <CardActions sx={{ paddingX: 3, paddingBottom: 3 }}>
        <Button
          size="small"
          variant="contained"
          onClick={() => {
            history.back();
          }}
        >
          Back
        </Button>
      </CardActions>
    </Card>
  );
}
