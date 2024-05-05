import { Linking, ScrollView } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import API from "../../api";
import Body from "./Body";
import Toast from "react-native-toast-message";
import moment from "moment";
import { getLocalData, saveLocalData } from "../../helpers";

const rangeOptions = [
  {
    label: "1 Day",
    value: "day",
    timeVal: moment().subtract(1, "day").unix(),
  },
  {
    label: "1 Week",
    value: "week",
    timeVal: moment().subtract(1, "week").unix(),
  },
  {
    label: "1 Month",
    value: "month",
    timeVal: moment().subtract(1, "month").unix(),
  },
  {
    label: "6 Month",
    value: "6month",
    timeVal: moment().subtract(6, "months").unix(),
  },
  {
    label: "1 Year",
    value: "year",
    timeVal: moment().subtract(1, "year").unix(),
  },
  {
    label: "3 Year",
    value: "3year",
    timeVal: moment().subtract(3, "years").unix(),
  },
  {
    label: "All Time",
    value: "all",
    timeVal: moment().subtract(10, "years").unix(),
  },
];

const Index = ({ route }) => {
  const { coin_id } = route?.params;
  const [watchList, setWatchList] = useState(["none"]);
  const [watchlisted, setWatchlisted] = useState(false);
  const [coinData, setCoinData] = useState({});
  const [graphData, setGraphData] = useState([]);
  const [changeRate, setChangeRate] = useState(0);
  const [highest, setHighest] = useState(0);
  const [lowest, setLowest] = useState(0);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState("day");
  const [openPrice, setOpenPrice] = useState(0);
  const [closePrice, setClosePrice] = useState(0);
  const [graphRange, setGraphRange] = useState({
    from: moment().subtract(1, "days").unix(),
    to: moment().unix(),
    vs_currency: "usd",
  });

  const init = async () => {
    const data = await API.GetCoinDetail(coin_id);
    setCoinData(data);
    fetchMarketChart();

    const list = await getLocalData("watchList");
    console.log("Got watchlist loaded -> ", list);
    setWatchList(list);
    if (list?.indexOf(data.id) != -1) setWatchlisted(true);
  };

  const fetchMarketChart = async () => {
    const chartData = await API.GetMarketChartInRange(
      coin_id,
      graphRange.from,
      graphRange.to,
      graphRange.vs_currency
    );

    formatAndSaveGraphData(chartData?.prices);
    setLoading(false);
  };

  const formatAndSaveGraphData = (data) => {
    try {
      const len = data?.length;
      setOpenPrice(data[0][1].toFixed(2));
      setClosePrice(data[len - 1][1].toFixed(2));
      const initial = data[0][1],
        final = data[len - 1][1];
      const rate = ((final - initial) / initial) * 100;
      setChangeRate(rate.toFixed(2));

      let minimum = Number.MAX_VALUE,
        maximum = Number.MIN_VALUE;

      const arr = [];
      let skip = 0;

      for (let item of data) {
        minimum = Math.min(minimum, item[1]);
        maximum = Math.max(maximum, item[1]);
        if (skip < 5) {
          skip++;
          continue;
        }
        skip = 0;

        const time = moment(item[0]);

        arr.push({
          x: item[0],
          y: item[1],
          label: time.format("DD MMM YY H:mm") + "\n$" + item[1],
        });
      }
      setGraphData(arr);

      setHighest(maximum);
      setLowest(minimum);
    } catch (error) {
      console.log("Error");
    }
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

  const changeWatchList = async () => {
    try {
      if (!watchlisted) {
        setWatchList((state) => [...state, coinData.id]);
        // watchList.current = [...temp, coinData.id];
      } else {
        setWatchList((state) => state?.filter((item) => item != coinData.id));
        // watchList.current = temp?.filter((item) => item != coinData.id);
      }
      setWatchlisted(!watchlisted);
      console.log("WatchList updated -> ", [...watchList, coinData?.id]);
      const res = await saveLocalData("watchList", [
        ...watchList,
        coinData?.id,
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    setLoading(true);
    const { timeVal } = rangeOptions?.find((item) => item?.value == range);
    setGraphRange((state) => {
      return { ...state, from: timeVal };
    });

    fetchMarketChart();
  }, [range]);

  return (
    <ScrollView>
      <Body
        coinData={coinData}
        openHomePage={openHomePage}
        graphData={graphData}
        changeRate={changeRate}
        highest={highest}
        lowest={lowest}
        range={range}
        setRange={setRange}
        rangeOptions={rangeOptions}
        loading={loading}
        openPrice={openPrice}
        closePrice={closePrice}
        watchlisted={watchlisted}
        changeWatchList={changeWatchList}
      />
    </ScrollView>
  );
};

export default Index;
