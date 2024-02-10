import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { styles } from "../../../styles";
import Svg from "react-native-svg-uri";
import IonIcon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const Trending = ({ trendingList }) => {
  //   console.log(trendingList);
  const [isExpand, setIsExpand] = useState(false);

  return (
    <View className="my-5 bg-darkBlue">
      <View className="flex flex-row items-center justify-between px-3">
        <Text className="text-xl text-ytext">Most serched tokens</Text>
        <TouchableOpacity
          className="p-1 rounded-xl border border-fadeBg bg-gray-800 flex items-start flex-row w-20 justify-between"
          onPress={() => setIsExpand(!isExpand)}
        >
          <Text className="text-gray-500">{isExpand ? "less" : "more"}</Text>
          <IonIcon
            name={isExpand ? "chevron-up" : "chevron-down"}
            size={25}
            color={"gray"}
          />
        </TouchableOpacity>
      </View>
      <View className="my-3">
        {trendingList?.map((item, i) =>
          isExpand || i < 3 ? <ListItem key={item?.id} item={item} /> : null
        )}
      </View>
    </View>
  );
};

const ListItem = ({ item }) => {
  // console.log(item);

  const navigator = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigator.navigate("coin-page", { coin_id: item?.id })}
    >
      <View className="p-2 my-1 rounded-3xl border border-gray-700 flex flex-row justify-between">
        <View className="flex items-center flex-row">
          <Image source={{ uri: item?.icon }} style={styles.smallImg} />
          <View className="ml-3 inline min-w-[25%] mr-2">
            <View>
              <Text className="text-gray-300 text-lg">{item?.name}</Text>
            </View>
            <Text className="text-gray-400">{item?.symbol}</Text>
          </View>
        </View>
        <View className="flex w-20 mr-2">
          <View>
            <Text className="text-ytext text-lg">
              {item?.usd_price?.slice(0, 6)}
            </Text>
          </View>
          <Text
            className={
              item?.usd_change_percentage > 0
                ? "text-green-700"
                : "text-red-800"
            }
          >
            {item?.usd_change_percentage > 0 ? "+" : null}
            {item?.usd_change_percentage}%
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Trending;
