import { View, Text, Linking } from "react-native";
import React, { useEffect, useState } from "react";
import API from "../../api";
import Body from "./Body";
import Toast from "react-native-toast-message";

const Index = ({ route }) => {
  // const
  const { coin_id } = route?.params;
  const [coinData, setCoinData] = useState({});

  const fetchData = async () => {
    const coinData = await API.GetCoinDetail(coin_id);
    setCoinData(coinData);
  };

  const openHomePage = async () => {
    try {
      await Linking.openURL(coinData?.link?.homepage);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Some error occured",
        position: "top",
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [coin_id]);
  return (
    <View>
      <Body coinData={coinData} openHomePage={openHomePage} />
    </View>
  );
};

export default Index;
