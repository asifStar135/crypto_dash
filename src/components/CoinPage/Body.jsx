import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import AntIcon from "react-native-vector-icons/AntDesign";
import FaIcon from "react-native-vector-icons/FontAwesome";
import FeatherIcon from "react-native-vector-icons/Feather";
const loadingGif = require("../../assets/loading.gif");
const numeral = require("numeral");
import { styles } from "../../../styles";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryCursorContainer,
  VictoryLine,
  VictoryTheme,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from "victory-native";

const ycode = "#D99800FF";

const Body = ({
  coinData,
  openHomePage,
  graphData,
  changeRate,
  highest,
  lowest,
  range,
  setRange,
  rangeOptions,
  loading,
  openPrice,
  closePrice,
  watchlisted,
  changeWatchList,
}) => {
  const [showInfo, setShowInfo] = useState(false);
  const [expandMarket, setExpandMarket] = useState(false);
  // console.log(coinData?.market_data);

  return (
    <View className="bg-darkBlue h-full">
      <View className="px-4 py-5 flex flex-row items-center justify-between mb-2">
        <TouchableOpacity className="p-2 w-12 bg-gray-700 rounded-full ">
          <AntIcon name="arrowleft" size={30} color={"white"} />
        </TouchableOpacity>
        <View className="flex flex-row items-center">
          <TouchableOpacity className="mx-5" onPress={changeWatchList}>
            <FaIcon
              name={watchlisted ? "bookmark" : "bookmark-o"}
              size={35}
              color={"white"}
            />
          </TouchableOpacity>
          <TouchableOpacity className="mx-5" onPress={openHomePage}>
            <AntIcon name="link" size={35} color={"white"} />
          </TouchableOpacity>
        </View>
      </View>

      <View className="px-5">
        <View className="flex items-center flex-row">
          <Image
            source={{
              uri: coinData?.image?.large,
            }}
            style={styles.midImg}
          />
          <View className="ml-3">
            <View>
              <Text className="text-gray-200 text-lg">{coinData?.name}</Text>
            </View>
            <Text className="text-gray-400">{coinData?.symbol}</Text>
          </View>
          <TouchableOpacity className="p-2 w-12 ml-3">
            {showInfo ? (
              <AntIcon
                name="close"
                size={30}
                color={"gray"}
                onPress={() => setShowInfo(false)}
              />
            ) : (
              <FeatherIcon
                name="info"
                size={30}
                color={"gray"}
                onPress={() => setShowInfo(true)}
              />
            )}
          </TouchableOpacity>
        </View>
        {showInfo ? (
          <View className="p-3 border border-gray-500 rounded-2xl my-3 bg-gray-800 transition-opacity duration-300">
            <Text className="text-lg text-white text-center underline mb-2">
              Description
            </Text>
            <Text className="text-justify text-gray-300">
              {coinData?.description}
            </Text>
          </View>
        ) : null}
      </View>

      <View className="flex flex-row justify-between px-6 pt-2">
        <View>
          <Text className="text-3xl text-gray-200">
            $ {coinData?.market_data?.current_price?.usd?.toFixed(2)}
          </Text>
          <Text
            className={
              "text-lg " + (changeRate < 0 ? "text-red-700" : "text-green-700")
            }
          >
            <AntIcon
              name={changeRate >= 0 ? "arrowup" : "arrowdown"}
              size={18}
            />
            {Math.abs(changeRate)} %
          </Text>
        </View>
        <View>
          <Text className="text-green-700 p-2 bg-fadeBg rounded-xl border border-gray-600 mb-1">
            High : {highest}
          </Text>
          <Text className="text-red-700 p-2 bg-fadeBg rounded-xl border  border-gray-600">
            Low : {lowest}
          </Text>
        </View>
      </View>

      <View>
        {loading == false && graphData.length ? (
          <View className="my-3 -ml-12">
            <VictoryChart
              width={520}
              containerComponent={<VictoryVoronoiContainer />}
            >
              <VictoryLine
                interpolation="basis"
                style={{
                  data: { stroke: ycode },
                }}
                animate={{
                  duration: 2000,
                  onLoad: { duration: 1000 },
                }}
                data={graphData}
                labelComponent={
                  <VictoryTooltip
                    flyoutWidth={150} // adjust width as needed
                    flyoutHeight={50} // adjust height as needed
                    renderInPortal={false}
                    pointerLength={10}
                    cornerRadius={5}
                    flyoutStyle={{
                      fill: "gray",
                      stroke: "black",
                      strokeWidth: 2,
                    }}
                  />
                }
              />

              {/* Disable x-axis */}
              <VictoryAxis
                style={{
                  axis: { stroke: "transparent" },
                  tickLabels: { fill: "transparent" },
                }}
              />
            </VictoryChart>
          </View>
        ) : (
          <View className="w-1/2 mx-auto my-20">
            <Image
              source={loadingGif}
              style={styles.loadingImg}
              className="mx-auto"
            />
            <Text className="text-ytext text-2xl text-center">
              Loading . . .
            </Text>
          </View>
        )}
      </View>

      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={rangeOptions}
        renderItem={({ item }) => (
          <TouchableOpacity
            className={
              "p-2 border rounded-2xl border-gray-500 h-11 mx-2 " +
              (item.value == range ? "bg-fadeBg" : "")
            }
            onPress={() => setRange(item?.value)}
          >
            <Text
              className={
                "text-gray-400 " + (item.value == range ? "800" : "400")
              }
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        )}
      />

      <View className="my-8 mx-4 border border-gray-500 px-5 py-1 bg-fadeBg rounded-xl">
        <Text className="text-gray-100 text-xl text-center my-1">
          Market Status
        </Text>
        <View className="flex flex-row justify-between flex-wrap">
          <View>
            <Text className="text-gray-400 text-base">Open : {openPrice}</Text>
            <Text className="text-gray-400 text-base">
              Close : {closePrice}
            </Text>
          </View>
          <View>
            <Text className="text-gray-400 text-base">
              Market cap : {coinData?.market_data?.market_cap}
            </Text>
            <Text className="text-gray-400 text-base">
              Total vol : {coinData?.market_data?.total_volume}
            </Text>
          </View>
        </View>
        {expandMarket && (
          <View className="flex yte flex-row justify-between flex-wrap">
            <View>
              <Text className="text-gray-400 text-base">
                ATH : {coinData?.market_data?.ath}
              </Text>
              <Text className="text-gray-400 text-base">
                ATL : {coinData?.market_data?.atl}
              </Text>
            </View>
            <View>
              <Text className="text-gray-400 text-base">
                ATH date : {coinData?.market_data?.ath_date}
              </Text>
              <Text className="text-gray-400 text-base">
                ATL date : {coinData?.market_data?.atl_date}
              </Text>
            </View>
          </View>
        )}
        <TouchableOpacity className="flex items-center -mb-8">
          <AntIcon
            name={expandMarket ? "upcircle" : "downcircle"}
            size={37}
            color={ycode}
            onPress={() => setExpandMarket(!expandMarket)}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Body;
