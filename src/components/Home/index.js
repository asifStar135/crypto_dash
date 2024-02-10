import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import API from "../../api";
import Top from "./Top";
import Trending from "./Trending";

const Home = () => {
  const [trendingList, setTrendingList] = useState([]);

  const fetchList = async () => {
    let list = await API.GetAllAssetList();

    // console.log(list);
  };
  const fetchTrending = async () => {
    let list = await API.TrendingCoins();

    setTrendingList(list);
  };

  useEffect(() => {
    //   fetchList();
    fetchTrending();
  }, []);

  return (
    <ScrollView className="w-full bg-darkBlue">
      <View className="h-full p-2">
        <Top />
        <Trending trendingList={trendingList} />
      </View>
    </ScrollView>
  );
};

export default Home;
