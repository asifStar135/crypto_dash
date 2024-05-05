import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import API from "../../api";
import Body from "./Body";
import api from "../../api";

const Home = ({ route }) => {
  const { news, user, watchList } = route.params;
  const [watchlistCoins, setWatchlistCoins] = useState([]);

  const init = async () => {
    const list = await api.getWatchListData();
    setWatchlistCoins(list);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <ScrollView className="w-full bg-darkBlue">
      <Body _this={{ user, watchList, watchlistCoins }} />
    </ScrollView>
  );
};

export default Home;
