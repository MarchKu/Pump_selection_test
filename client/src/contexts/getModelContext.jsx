import axios from "axios";
import React, { useState } from "react";

const GetModelsContext = React.createContext();

function GetModelsProvider(props) {
  const [totalModels, setTotalModels] = useState(null);
  const [matchModels, setMatchModels] = useState(null);
  const [matchModelsCount, setMatchModelsCount] = useState(0);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [curveGraphData, setCurveGraphData] = useState(null);
  const [effiencyGraphData, setEfficiencyGraphData] = useState(null);
  const [powerGraphData, setPowerGraphData] = useState(null);
  const [npshrGraphData, setNpshrGraphData] = useState(null);
  const [userInput, setUserInput] = useState(null);
  const [calBlade, setCalBlade] = useState(null);
  const [calEfficiency, setCalEfficiency] = useState(null);
  const [calPower, setCalPower] = useState(null);
  const [calNpshr, setCalNpshr] = useState(null);

  const getAllModels = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:4000/get-all");
      setTotalModels(response.data.count);
      setIsLoading(false);
      setIsError(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setIsError(true);
    }
  };

  const getInRangeModel = async (props) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:4000/check-range",
        props
      );
      setMatchModels(response.data);
      setMatchModelsCount(response.data.length);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setIsError(true);
    }
  };

  const getCurveGraphDataByID = async (props) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:4000/curve_data",
        props
      );
      const refData = {};
      if (props.flow_m3hr || props.flow_ls) {
        for (const data of response.data) {
          const bladeSize = data.blade_size;

          if (!refData[bladeSize]) {
            refData[bladeSize] = props.flow_m3hr
              ? { flow: data.c_flow_m3hr, head: data.c_head }
              : { flow: data.c_flow_ls, head: data.c_head };
          }
          if (Object.keys(refData).length >= 2) {
            break;
          }
        }

        setCurveGraphData(refData);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setIsError(true);
    }
  };

  const getEfficiencyGraphDataByID = async (props) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:4000/efficiency_data",
        props
      );
      response.data.forEach((item) => {
        if (typeof item.efficiency === "string") {
          if (item.efficiency.includes("%")) {
            item.efficiency = parseInt(item.efficiency.match(/(\d+)%/)[1], 10);
          } else if (item.efficiency.includes(".")) {
            item.efficiency = Math.round(parseFloat(item.efficiency) * 100);
          }
        }
      });
      const refData = {};
      refData[response.data[0].efficiency] = props.flow_m3hr
        ? response.data[0].e_flow_m3hr
        : response.data[0].e_flow_ls;

      if (props.flow_m3hr || props.flow_ls) {
        for (const data of response.data) {
          const efficiencyUpper = data.efficiency;

          if (!refData[efficiencyUpper]) {
            refData[efficiencyUpper] = props.flow_m3hr
              ? data.e_flow_m3hr
              : data.e_flow_ls;
          }
          if (Object.keys(refData).length >= 2) {
            break;
          }
        }
        setEfficiencyGraphData(refData);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setIsError(true);
    }
  };

  const getPowerGraphDataByID = async (props) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:4000/power_data",
        props
      );
      const refData = {};
      refData[response.data[0].p_power] = props.flow_m3hr
        ? response.data[0].p_flow_m3hr
        : response.data[0].p_flow_ls;

      if (props.flow_m3hr || props.flow_ls) {
        for (const data of response.data) {
          const powerUpper = data.p_power;

          if (!refData[powerUpper]) {
            refData[powerUpper] = props.flow_m3hr
              ? data.p_flow_m3hr
              : data.p_flow_ls;
          }
          if (Object.keys(refData).length >= 2) {
            break;
          }
        }
        setPowerGraphData(refData);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setIsError(true);
    }
  };

  const getNpshrGraphDataByID = async (props) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:4000/npshr_data",
        props
      );
      const refData = {};
      refData[response.data[0].np_npshr] = props.flow_m3hr
        ? response.data[0].np_flow_m3hr
        : response.data[0].np_flow_ls;

      if (props.flow_m3hr || props.flow_ls) {
        for (const data of response.data) {
          const npshrUpper = data.np_npshr;

          if (!refData[npshrUpper]) {
            refData[npshrUpper] = props.flow_m3hr
              ? data.np_flow_m3hr
              : data.np_flow_ls;
          }
          if (Object.keys(refData).length >= 2) {
            break;
          }
        }
        setNpshrGraphData(refData);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setIsError(true);
    }
  };

  return (
    <GetModelsContext.Provider
      value={{
        totalModels,
        matchModels,
        matchModelsCount,
        curveGraphData,
        effiencyGraphData,
        powerGraphData,
        npshrGraphData,
        isError,
        isLoading,
        userInput,
        calBlade,
        calEfficiency,
        calPower,
        calNpshr,
        setCalPower,
        setCalBlade,
        setCalEfficiency,
        setCalNpshr,
        setUserInput,
        getAllModels,
        getInRangeModel,
        getCurveGraphDataByID,
        getEfficiencyGraphDataByID,
        getPowerGraphDataByID,
        getNpshrGraphDataByID,
      }}
    >
      {props.children}
    </GetModelsContext.Provider>
  );
}

// this is a hook that consume AuthContext
const useGetModels = () => React.useContext(GetModelsContext);

export { GetModelsProvider, useGetModels };
