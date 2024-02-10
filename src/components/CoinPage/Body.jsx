import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import AntIcon from "react-native-vector-icons/AntDesign";
import FaIcon from "react-native-vector-icons/FontAwesome";
import FeatherIcon from "react-native-vector-icons/Feather";
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

const Body = ({ coinData, openHomePage }) => {
  // console.log(coinData);
  const [watchlisted, setWatchlisted] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  return (
    <View className="bg-darkBlue h-full">
      <View className="px-4 py-5 flex flex-row items-center justify-between">
        <TouchableOpacity className="p-2 w-12 bg-gray-700 rounded-full ">
          <AntIcon name="arrowleft" size={30} color={"white"} />
        </TouchableOpacity>
        <View className="flex flex-row items-center border-l border-r border-gray-200 rounded-xl">
          <TouchableOpacity
            className="mx-5 my-2"
            onPress={() => setWatchlisted(!watchlisted)}
          >
            <FaIcon
              name={watchlisted ? "bookmark" : "bookmark-o"}
              size={35}
              color={"white"}
            />
          </TouchableOpacity>
          <TouchableOpacity className="mx-5 my-2" onPress={openHomePage}>
            <AntIcon name="link" size={35} color={"white"} />
          </TouchableOpacity>
        </View>
      </View>

      <View className="px-5">
        <View className="flex flex-row items-center">
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

      <View className="my-3 bg-gray-800 -mx-10">
        <VictoryChart
          width={500}
          containerComponent={<VictoryVoronoiContainer />}
        >
          <VictoryLine
            interpolation="basis"
            style={{
              data: { stroke: "#D99800FF" },
            }}
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 },
            }}
            data={[
              { x: 1, y: 2, label: "point 1" },
              { x: 2, y: 3, label: "point 2" },
              { x: 3, y: 5, label: "point 3" },
              { x: 4, y: 4, label: "point 4" },
              { x: 5, y: 7, label: "point 5" },
            ]}
            labels={({ datum }) => datum.label}
            labelComponent={<VictoryTooltip />}
          />

          <VictoryAxis
            style={{
              axis: { stroke: "gray" }, // Color of the axis line
              axisLabel: { fill: "white" }, // Color of the axis label
              ticks: { stroke: "white" }, // Color of the tick marks
              tickLabels: { fill: "white" }, // Color of the tick labels
            }}
          />
          {/* <VictoryAxis
            dependentAxis
            style={{
              axis: { stroke: "gray" }, // Color of the axis line
              axisLabel: { fill: "white" }, // Color of the axis label
              ticks: { stroke: "white" }, // Color of the tick marks
              tickLabels: { fill: "white" }, // Color of the tick labels
            }}
          /> */}
        </VictoryChart>
      </View>
    </View>
  );
};

export default Body;
