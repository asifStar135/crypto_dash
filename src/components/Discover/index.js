import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Top from "./Top";
import api from "../../api";
import { getTopGainersLosers } from "../../helpers";
import GainersLosers from "./GainerLosers";

const Index = () => {
  const [gainerData, setGainerData] = useState([]);
  const [loserData, setLoserData] = useState([]);

  const init = async () => {
    //  fetch market data
    const marketData = await api.GetMarketData("USD");
    // console.log("Got the marketData ->", marketData[0]);

    const data = await getTopGainersLosers(marketData);
    // console.log("Got gainers ->", gainers);
    setGainerData(data?.gainers);
    setLoserData(data?.losers);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <ScrollView className="bg-darkBlue">
      <Top />
      <GainersLosers gainerData={gainerData} loserData={loserData} />
    </ScrollView>
  );
};

export default Index;
