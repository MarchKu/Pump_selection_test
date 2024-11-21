import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ShowUserInput from "./more_info_comp/input";
import EfficiencyResult from "./more_info_comp/effiency_result";
import MenuBar from "./menu_bar";
import { useParams } from "react-router-dom";
import { useGetModels } from "../contexts/getModelContext";

const More_info = () => {
  const params = useParams();
  const { matchModels, matchModelsCount, isError, isLoading, getInRangeModel } =
    useGetModels();
  let model = {};

  if (matchModels.length > 0) {
    model = matchModels.find((pump) => String(pump.model_id) === params.id);
  }

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  return (
    <Box sx={{ display: "flex" }}>
      <MenuBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Typography sx={{ marginBottom: 2, marginBottom: 1 }} variant="h4">
          Model :{" "}
          {model &&
            model.model_name + " / " + model.model_size + ` / ${model.rpm} rpm`}
        </Typography>
        <Box
          component="main"
          sx={{ flexGrow: 1, marginBottom: 3, display: "flex" }}
        >
          <ShowUserInput />
          <EfficiencyResult />
        </Box>
      </Box>
    </Box>
  );
};

export default More_info;
