import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { styles } from "../../../styles";

const Step3 = ({ _this }) => {
  return (
    <View className="h-full bg-darkBlue flex items-center">
      <TouchableOpacity
        className="flex flex-row items-center w-full justify-start pt-8 px-3 mb-10"
        onPress={() => _this.setStep(2)}
      >
        <Feather name="arrow-left" size={40} color="#D99800FF" />
        <Text className="text-ytext font-semibold text-xl">Back</Text>
      </TouchableOpacity>
      <View className="min-w-[50%] flex flex-row items-center justify-center border border-gray-600 rounded-full p-2 my-4">
        <Image source={_this.image} style={styles.profileImg} />
        <Text className="text-ytext font-semibold text-xl mx-4">
          {_this.username}
        </Text>
      </View>
      <View className="border border-ytext rounded-xl p-4">
        <Text className="text-ytext text-2xl font-semibold">
          Watch some trending coins
        </Text>
        <ScrollView
          className="max-h-96 my-3"
          showsVerticalScrollIndicator={false}
        >
          {_this?.trendingList?.map((item, index) => (
            <View
              onPress={() =>
                navigator.navigate("coin-page", { coin_id: item?.id })
              }
              key={item?.id}
            >
              <View className="p-2 my-1 rounded-3xl border border-gray-700 flex flex-row justify-between">
                <View className="flex items-center flex-row">
                  <Image source={{ uri: item?.icon }} style={styles.smallImg} />
                  <View className="ml-3 inline min-w-[25%] mr-2">
                    <View>
                      <Text className="text-gray-300 text-lg">
                        {item?.name}
                      </Text>
                    </View>
                    <Text className="text-gray-400">{item?.symbol}</Text>
                  </View>
                </View>
                <View className="flex flex-row items-center justify-center mr-2">
                  <View className="flex mr-3 items-center">
                    <View>
                      <Text className="text-ytext text-lg">
                        {item?.usd_price?.slice(0, 6)}
                      </Text>
                    </View>
                    <Text
                      className={
                        item?.usd_change_percentage >= 0
                          ? "text-green-700"
                          : "text-red-800"
                      }
                    >
                      {item?.usd_change_percentage >= 0 ? "+" : null}
                      {item?.usd_change_percentage}%
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => _this.onClickWatchList(index)}
                  >
                    <FontAwesome
                      name={_this.watchList[index] ? "bookmark" : "bookmark-o"}
                      size={40}
                      color="#D99800FF"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
      <TouchableOpacity
        className="flex flex-row items-center bg-ytext px-8 py-4 my-12 shadow-lg shadow-ytext rounded-xl"
        onPress={() => _this.goNext(3)}
      >
        <Text className="text-2xl text-darkBlue mx-4 font-semibold">
          Finish !
        </Text>
        <Feather name="check-circle" size={40} color="#171c21" />
      </TouchableOpacity>
    </View>
  );
};

export default Step3;
