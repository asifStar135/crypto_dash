import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import MIcon from "react-native-vector-icons/MaterialIcons";
import { styles } from "../../../styles";

const Body = ({ _this }) => {
  const navigator = useNavigation();
  return (
    <View className="h-full bg-darkBlue">
      <View className="p-5 bg-gray-800 rounded-lg flex flex-row items-center">
        <MIcon
          name="category"
          size={40}
          className="text-gray-300"
          color="#D99800FF"
        />
        <Text className="text-ytext text-2xl mx-3">{_this?.category_name}</Text>
      </View>

      <ScrollView className="my-3 px-3">
        {_this?.list?.map((item) => (
          <TouchableOpacity
            key={item?.id}
            onPress={() =>
              navigator.navigate("coin-page", { coin_id: item?.id })
            }
            className="p-2 my-2 rounded-3xl border border-gray-700 flex flex-row justify-between"
          >
            <View className="flex items-center flex-row">
              <Image source={{ uri: item?.icon }} style={styles.smallImg} />
              <View className="ml-3 inline">
                <View>
                  <Text className="text-gray-300 text-lg">{item?.name}</Text>
                </View>
                <Text className="text-gray-400">
                  {item?.symbol?.toUpperCase()}
                </Text>
              </View>
            </View>
            <View className="flex mr-2">
              <View>
                <Text className="text-ytext text-lg">$ {item?.usd_price}</Text>
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
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Body;
