import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useGetModels } from "../../contexts/getModelContext";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export default function EfficiencyResult() {
  const params = useParams();
  const {
    userInput,
    curveGraphData,
    effiencyGraphData,
    powerGraphData,
    npshrGraphData,
    calBlade,
    setCalBlade,
    calEfficiency,
    setCalEfficiency,
    calPower,
    setCalPower,
    calNpshr,
    setCalNpshr,
    getCurveGraphDataByID,
    getEfficiencyGraphDataByID,
    getPowerGraphDataByID,
    getNpshrGraphDataByID,
  } = useGetModels();

  const units = {
    default: "Unit",
    f_unit1: `m3/h`,
    f_unit2: "L/s",
    h_unit1: "m",
  };

  /* Calculate blade size */
  if (curveGraphData) {
    const blade1 =
      Object.keys(curveGraphData)[0] < Object.keys(curveGraphData)[1]
        ? Number(Object.keys(curveGraphData)[0])
        : Number(Object.keys(curveGraphData)[1]);
    const blade2 =
      Object.keys(curveGraphData)[0] > Object.keys(curveGraphData)[1]
        ? Number(Object.keys(curveGraphData)[0])
        : Number(Object.keys(curveGraphData)[1]);
    const c_flow1 = curveGraphData[String(blade1)].flow;
    const c_flow2 = curveGraphData[String(blade2)].flow;
    const c_flow_input = userInput.flow_m3hr
      ? userInput.flow_m3hr
      : userInput.flow_ls;
    setCalBlade(
      blade1 +
        ((blade2 - blade1) / (c_flow2 - c_flow1)) * (c_flow_input - c_flow1)
    );
  }
  /* Calculate efficiency */
  if (effiencyGraphData) {
    const eff1 =
      Object.keys(effiencyGraphData)[0] < Object.keys(effiencyGraphData)[1]
        ? Number(Object.keys(effiencyGraphData)[0])
        : Number(Object.keys(effiencyGraphData)[1]);
    const eff2 =
      Object.keys(effiencyGraphData)[0] > Object.keys(effiencyGraphData)[1]
        ? Number(Object.keys(effiencyGraphData)[0])
        : Number(Object.keys(effiencyGraphData)[1]);
    const e_flow1 = effiencyGraphData[String(eff1)];
    const e_flow2 = effiencyGraphData[String(eff2)];
    const e_flow_input = userInput.flow_m3hr
      ? userInput.flow_m3hr
      : userInput.flow_ls;
    setCalEfficiency(
      eff1 + ((eff2 - eff1) / (e_flow2 - e_flow1)) * (e_flow_input - e_flow1)
    );
  }

  if (powerGraphData) {
    console.log(powerGraphData);
    const pow1 =
      Object.keys(powerGraphData)[0] < Object.keys(powerGraphData)[1]
        ? Number(Object.keys(powerGraphData)[0])
        : Number(Object.keys(powerGraphData)[1]);
    const pow2 =
      Object.keys(powerGraphData)[0] > Object.keys(powerGraphData)[1]
        ? Number(Object.keys(powerGraphData)[0])
        : Number(Object.keys(powerGraphData)[1]);
    const p_flow1 = powerGraphData[String(pow1)];
    const p_flow2 = powerGraphData[String(pow2)];
    const p_flow_input = userInput.flow_m3hr
      ? userInput.flow_m3hr
      : userInput.flow_ls;
    setCalPower(
      pow1 + ((pow2 - pow1) / (p_flow2 - p_flow1)) * (p_flow_input - p_flow1)
    );
  }

  if (npshrGraphData) {
    const np1 =
      Object.keys(npshrGraphData)[0] < Object.keys(npshrGraphData)[1]
        ? Number(Object.keys(npshrGraphData)[0])
        : Number(Object.keys(npshrGraphData)[1]);
    const np2 =
      Object.keys(npshrGraphData)[0] > Object.keys(npshrGraphData)[1]
        ? Number(Object.keys(npshrGraphData)[0])
        : Number(Object.keys(npshrGraphData)[1]);
    const np_flow1 = npshrGraphData[String(np1)];
    const np_flow2 = npshrGraphData[String(np2)];
    const np_flow_input = userInput.flow_m3hr
      ? userInput.flow_m3hr
      : userInput.flow_ls;
    setCalNpshr(
      np1 + ((np2 - np1) / (np_flow2 - np_flow1)) * (np_flow_input - np_flow1)
    );
  }

  useEffect(() => {
    getCurveGraphDataByID({ ...userInput, model_id: params.id });
  }, []);

  useEffect(() => {
    if (curveGraphData) {
      getEfficiencyGraphDataByID({
        ...userInput,
        flow1: curveGraphData[Object.keys(curveGraphData)[0]].flow,
        flow2: curveGraphData[Object.keys(curveGraphData)[1]].flow,
        head1: curveGraphData[Object.keys(curveGraphData)[0]].head,
        head2: curveGraphData[Object.keys(curveGraphData)[1]].head,
        model_id: params.id,
      });
      getPowerGraphDataByID({
        ...userInput,
        flow1: curveGraphData[Object.keys(curveGraphData)[0]].flow,
        flow2: curveGraphData[Object.keys(curveGraphData)[1]].flow,
        model_id: params.id,
      });
      getNpshrGraphDataByID({
        ...userInput,
        flow1: curveGraphData[Object.keys(curveGraphData)[0]].flow,
        flow2: curveGraphData[Object.keys(curveGraphData)[1]].flow,
        model_id: params.id,
      });
    }
  }, [curveGraphData]);

  return (
    <Card
      sx={{ minWidth: 275, marginBottom: 2, width: "auto", marginRight: 2 }}
    >
      <CardContent>
        <Typography variant="h5" component="div" sx={{ mb: 3 }}>
          Performance
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
            {/* Blade size */}
            <Box
              component="main"
              sx={{
                display: "flex",
                marginBottom: 1,
              }}
            >
              <label
                htmlFor="blade_size"
                style={{
                  alignContent: "center",
                }}
              >
                Blade size&nbsp;&nbsp;&nbsp;
              </label>
              <input
                id="blade_size"
                type="number"
                value={calBlade && calBlade}
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
                  mm.
                </Button>
              </div>
            </Box>

            {/* Efficiency */}
            <Box
              component="main"
              sx={{
                display: "flex",
                marginBottom: 1,
              }}
            >
              <label
                htmlFor="efficiency"
                style={{
                  alignContent: "center",
                }}
              >
                Efficiency&nbsp;&nbsp;&nbsp;&nbsp;
              </label>
              <input
                id="efficiency"
                type="number"
                value={calEfficiency && calEfficiency}
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
                  %
                </Button>
              </div>
            </Box>

            {/* Power */}
            <Box
              component="main"
              sx={{
                display: "flex",
                marginBottom: 1,
              }}
            >
              <label
                htmlFor="power"
                style={{
                  alignContent: "center",
                }}
              >
                Power&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </label>
              <input
                id="power"
                type="number"
                value={calPower && calPower}
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
                  kW
                </Button>
              </div>
            </Box>

            {/* NPSHr */}
            <Box
              component="main"
              sx={{
                display: "flex",
                marginBottom: 1,
              }}
            >
              <label
                htmlFor="head_input"
                style={{
                  alignContent: "center",
                }}
              >
                NPSHr&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </label>
              <input
                id="NPSHr"
                type="number"
                value={calNpshr && calNpshr}
                min={"0"}
                style={{ paddingLeft: 3 }}
                disabled
              />
              <div>
                <Button
                  id="NPSHr"
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
    </Card>
  );
}
