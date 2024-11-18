import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { useGetModels } from "../../contexts/getModelContext";
import { useEffect } from "react";

export default function Total_product() {
  const { totalModels, matchModelsCount, isError, isLoading, getAllModels } =
    useGetModels();

  useEffect(() => {
    getAllModels();
  }, []);

  return (
    <Card
      sx={{ minWidth: 275, marginBottom: 2, width: "auto", marginRight: 2 }}
    >
      <CardContent
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography variant="h5" component="div">
          Total match
        </Typography>
        <Gauge
          value={matchModelsCount}
          valueMax={totalModels && `${totalModels}`}
          startAngle={-110}
          endAngle={110}
          width={200}
          height={200}
          sx={{
            [`& .${gaugeClasses.valueText}`]: {
              fontSize: 30,
              transform: "translate(0px, 0px)",
            },
          }}
          text={({ value, valueMax }) => `${value} / ${valueMax}`}
        />
      </CardContent>
    </Card>
  );
}
