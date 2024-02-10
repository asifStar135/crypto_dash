import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/Feather";
import { styles } from "../../../styles";
import { useNavigation } from "@react-navigation/native";

const ListItem = ({ item, number }) => {
  // console.log(item);

  const navigator = useNavigation();
  return (
    <View
      className={`flex flex-row justify-between mx-5 py-1 border-gray-500 ${
        number < 5 ? "border-b" : ""
      }`}
    >
      <View className="flex flex-row items-center">
        <Icon name="hash" size={25} color={"gray"} />
        <Text className="text-lg text-gray-400">{number}</Text>
      </View>

      <View className="flex flex-row items-center justify-between w-[86%]">
        <TouchableOpacity
          className="flex flex-row items-center gap-2"
          onPress={() => navigator.navigate("coin-page", { coin_id: item?.id })}
        >
          <Image source={{ uri: item?.image }} style={styles.smallImg} />
          <View className="flex">
            <Text className="text-gray-300 text-lg">{item?.name}</Text>
            <Text className="text-gray-400">{item?.symbol}</Text>
          </View>
        </TouchableOpacity>
        <View className="flex flex-row items-center gap-2">
          <View className="flex">
            <Text className="text-ytext text-lg">
              $ {item?.current_price?.toFixed(2)}
            </Text>
            <Text
              className={
                item?.price_change_percentage_24h > 0
                  ? "text-green-700"
                  : "text-red-800"
              }
            >
              {item?.price_change_percentage_24h > 0 ? "+" : null}
              {item?.price_change_percentage_24h.toFixed(2)}%
            </Text>
          </View>

          <Icon
            name={
              item?.price_change_percentage_24h > 0
                ? "chevrons-up"
                : "chevrons-down"
            }
            size={35}
            color={item?.price_change_percentage_24h > 0 ? "green" : "red"}
          />
        </View>
      </View>
    </View>
  );
};

const GainersLosers = ({ gainerData, loserData }) => {
  const [isGainers, setIsGainers] = useState(true);
  // console.log(gainerData[0]);
  return (
    <View className="mt-3 border border-gray-500 p-1 rounded-xl m-2">
      <View className="flex flex-row w-11/12 mx-auto rounded-xl items-center justify-around border border-gray-600">
        <Text
          className={
            "text-white text-lg w-1/2 text-center py-2 rounded-l-xl " +
            (isGainers ? "bg-gray-600" : "")
          }
          onPress={() => setIsGainers(true)}
        >
          Top Gainers
        </Text>
        <Text
          className={
            "text-white text-lg w-1/2 text-center py-2 rounded-r-xl " +
            (isGainers ? "" : "bg-gray-600")
          }
          onPress={() => setIsGainers(false)}
        >
          Top Losers
        </Text>
      </View>

      <View className="mt-3">
        {isGainers
          ? gainerData?.map((item, i) => (
              <ListItem item={item} number={i + 1} key={item?.id} />
            ))
          : loserData?.map((item, i) => (
              <ListItem item={item} number={i + 1} key={item?.id} />
            ))}
      </View>
    </View>
  );
};

export default GainersLosers;
