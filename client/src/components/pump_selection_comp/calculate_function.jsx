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

export const Calculate_function = () => {
  const { getInRangeModel, setUserInput } = useGetModels();

  const units = {
    default: "Unit",
    f_unit1: `m3/h`,
    f_unit2: "L/s",
    h_unit1: "m",
  };

  !localStorage.getItem("input_for_cal") &&
    localStorage.setItem(
      "input_for_cal",
      JSON.stringify({
        input_flow: 0,
        input_head: 0,
        unit_flow: units.default,
        unit_head: units.default,
      })
    );

  const [anchorElF, setAnchorElF] = React.useState(null);
  const [anchorElH, setAnchorElH] = React.useState(null);
  const [unitF, setUnitF] = React.useState(
    JSON.parse(localStorage.getItem("input_for_cal")).unit_flow
  );
  const [unitH, setUnitH] = React.useState(
    JSON.parse(localStorage.getItem("input_for_cal")).unit_head
  );
  const [flowData, setFlowData] = React.useState(
    JSON.parse(localStorage.getItem("input_for_cal")).input_flow
  );
  const [headData, setHeadData] = React.useState(
    JSON.parse(localStorage.getItem("input_for_cal")).input_head
  );

  const openF = Boolean(anchorElF);

  const openH = Boolean(anchorElH);

  const handleClickF = (event) => {
    setAnchorElF(event.currentTarget);
  };
  const handleClickH = (event) => {
    setAnchorElH(event.currentTarget);
  };
  const handleCloseF = (inputUnit) => {
    setAnchorElF(null);
    inputUnit !== null && inputUnit !== unitF && setUnitF(inputUnit);
  };
  const handleCloseH = (inputUnit) => {
    setAnchorElH(null);
    inputUnit !== null && inputUnit !== unitH && setUnitH(inputUnit);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (unitF === "m3/h") {
      localStorage.setItem(
        "input_for_cal",
        JSON.stringify({
          input_flow: flowData,
          input_head: headData,
          unit_flow: unitF,
          unit_head: unitH,
        })
      );
      setUserInput({
        flow_m3hr: flowData,
        head: headData,
      });
      getInRangeModel({
        flow_m3hr: flowData,
        head: headData,
      });
    } else if (unitF === "L/s") {
      localStorage.setItem(
        "input_for_cal",
        JSON.stringify({
          input_flow: flowData,
          input_head: headData,
          unit_flow: unitF,
          unit_head: unitH,
        })
      );
      setUserInput({
        flow_ls: flowData,
        head: headData,
      });
      getInRangeModel({
        flow_ls: flowData,
        head: headData,
      });
    }
  };

  const handleClear = () => {
    localStorage.setItem(
      "input_for_cal",
      JSON.stringify({
        input_flow: 0,
        input_head: 0,
        unit_flow: units.default,
        unit_head: units.default,
      })
    );

    setUnitF(JSON.parse(localStorage.getItem("input_for_cal")).unit_flow);
    setUnitH(JSON.parse(localStorage.getItem("input_for_cal")).unit_head);
    setFlowData(JSON.parse(localStorage.getItem("input_for_cal")).input_flow);
    setHeadData(JSON.parse(localStorage.getItem("input_for_cal")).input_head);
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
                value={flowData}
                min={"0"}
                style={{
                  paddingLeft: 3,
                }}
                onChange={(e) => setFlowData(e.target.value)}
              />
              <div>
                <Button
                  id="fade-buttonF"
                  style={{ textTransform: "none" }}
                  variant="outlined"
                  size="small"
                  color="inherit"
                  aria-controls={openF ? "fade-menuF" : undefined}
                  aria-haspopup="true"
                  aria-expanded={openF ? "true" : undefined}
                  onClick={handleClickF}
                >
                  {unitF}
                </Button>
                <Menu
                  id="fade-menuF"
                  MenuListProps={{
                    "aria-labelledby": "fade-buttonF",
                  }}
                  anchorEl={anchorElF}
                  open={openF}
                  onClose={() => {
                    handleCloseF(null);
                  }}
                  TransitionComponent={Fade}
                >
                  <MenuItem
                    onClick={() => {
                      handleCloseF(units.f_unit1);
                    }}
                  >
                    {units.f_unit1}
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleCloseF(units.f_unit2);
                    }}
                  >
                    {units.f_unit2}
                  </MenuItem>
                </Menu>
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
                value={headData}
                min={"0"}
                style={{ paddingLeft: 3 }}
                onChange={(e) => setHeadData(e.target.value)}
              />
              <div>
                <Button
                  id="fade-buttonH"
                  style={{ textTransform: "none" }}
                  variant="outlined"
                  size="small"
                  color="inherit"
                  aria-controls={openH ? "fade-menuH" : undefined}
                  aria-haspopup="true"
                  aria-expanded={openH ? "true" : undefined}
                  onClick={handleClickH}
                >
                  {unitH}
                </Button>
                <Menu
                  id="fade-menuH"
                  MenuListProps={{
                    "aria-labelledby": "fade-buttonH",
                  }}
                  anchorEl={anchorElH}
                  open={openH}
                  onClose={() => {
                    handleCloseH(null);
                  }}
                  TransitionComponent={Fade}
                >
                  <MenuItem
                    onClick={() => {
                      handleCloseH(units.h_unit1);
                    }}
                  >
                    {units.h_unit1}
                  </MenuItem>
                </Menu>
              </div>
            </Box>
          </Box>
        </form>
      </CardContent>

      <CardActions sx={{ paddingX: 3, paddingBottom: 3 }}>
        <Button size="small" variant="contained" onClick={handleSubmit}>
          Calculate
        </Button>
        <Button size="small" variant="contained" onClick={handleClear}>
          Clear
        </Button>
      </CardActions>
    </Card>
  );
};
