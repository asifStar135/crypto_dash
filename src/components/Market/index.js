import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import api from "../../api";
import { filterMarkteData, getTopGainersLosers } from "../../helpers";
import Body from "./Body";
import moment from "moment";

const rangeOptions = [
  {
    label: "Trending",
    value: "trendingData",
  },
  {
    label: "Top Gainers",
    value: "gainerData",
  },
  {
    label: "Top Losers",
    value: "loserData",
  },
  {
    label: "Watchlist",
    value: "watchlistData",
  },
  {
    label: "All items",
    value: "allData",
  },
];

const Index = ({ route }) => {
  const { user } = route.params;
  const [gainerData, setGainerData] = useState([]);
  const [loserData, setLoserData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [trendingData, setTrendingData] = useState([]);
  const [watchlistData, setWatchListData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [listType, setListType] = useState("trendingData");

  const [searchInput, setSearchInput] = useState("");
  const [openSearch, setOpenSearch] = useState(false);

  const init = async () => {
    const marketData = await api.GetMarketData("USD");
    setAllData(marketData);
    // console.log("Got the marketData ->", marketData[0]);

    const watchlist = await api.getWatchListData();
    setWatchListData(watchlist);
    // console.log("Watch -> ", watchlist);

    const data = await getTopGainersLosers(marketData);
    // console.log("Got gainers ->", data.gainers[0]);
    setGainerData(data?.gainers);
    setLoserData(data?.losers);

    const trending = await api.TrendingCoins();
    setTrendingData(trending);
    // console.log("Trending one -> ", trending[0]);
  };

  const searchFilter = () => {
    setFilterData(filterMarkteData(allData, searchInput));
  };

  useEffect(() => {
    if (searchInput) {
      searchFilter();
    }
  }, [searchInput]);

  useEffect(() => {
    if (openSearch == false) {
      setSearchInput("");
      setFilterData(allData);
    }
  }, [openSearch]);

  useEffect(() => {
    init();
  }, []);

  return (
    <ScrollView className="bg-darkBlue">
      <Body
        _this={{
          gainerData,
          searchInput,
          openSearch,
          setOpenSearch,
          setSearchInput,
          loserData,
          user,
          rangeOptions,
          listType,
          loserData,
          gainerData,
          trendingData,
          allData,
          watchlistData,
          setListType,
          filterData,
        }}
      />
    </ScrollView>
  );
};

export default Index;
