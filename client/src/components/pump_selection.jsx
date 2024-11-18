import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Calculate_function } from "./pump_selection_comp/calculate_function";
import Product_table from "./pump_selection_comp/product_table";
import Total_product from "./pump_selection_comp/total_product";
import MenuBar from "./menu_bar";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function PumpSelection() {
  //Drop down menu
  return (
    <Box sx={{ display: "flex" }}>
      <MenuBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Typography sx={{ marginBottom: 2, marginBottom: 3 }} variant="h4">
          Pump selection
        </Typography>
        <Box
          component="main"
          sx={{ flexGrow: 1, marginBottom: 3, display: "flex" }}
        >
          <Calculate_function />
          <Total_product />
        </Box>
        <Typography sx={{ marginBottom: 3 }} variant="h4">
          Total match product
        </Typography>
        <Product_table />
      </Box>
    </Box>
  );
}
