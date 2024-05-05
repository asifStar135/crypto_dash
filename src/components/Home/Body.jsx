import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import IonIcon from "react-native-vector-icons/Ionicons";
import { styles } from "../../../styles";
import { useNavigation } from "@react-navigation/native";
import FIcon from "react-native-vector-icons/Feather";

const Body = ({ _this }) => {
  const navigator = useNavigation();
  return (
    <View>
      <View className="flex flex-row justify-between items-center p-5">
        <View className="flex flex-row items-center gap-3">
          <Image style={styles.profileImg} source={_this?.user?.image} />
          <View>
            <Text className="text-xl text-ytext">
              <Text className="text-xl text-gray-400">Hii, </Text>
              {_this?.user?.username} !
            </Text>
            <Text className="text-md text-gray-400">Welcome back...</Text>
          </View>
        </View>
        <TouchableOpacity>
          <IonIcon name="settings-sharp" size={35} color="#D99800FF" />
        </TouchableOpacity>
      </View>
      <View className="px-5 my-2">
        <View className="flex flex-row px-3 py-1 justify-between items-center">
          <Text className="text-2xl text-ytext">Your Watchlist</Text>
          <TouchableOpacity
            className="bg-gray-700 rounded-full p-1"
            onPress={() => navigator.navigate("watchlist-page")}
          >
            <FIcon name="chevron-right" size={37} color={"#D99800FF"} />
          </TouchableOpacity>
        </View>
        <View>
          {_this?.watchlistCoins?.map((item, ind) =>
            ind < 4 ? (
              <TouchableOpacity
                key={item?.id}
                onPress={() =>
                  navigator.navigate("coin-page", { coin_id: item?.id })
                }
                className="p-2 my-2 rounded-3xl border border-gray-700 flex flex-row items-center justify-between"
              >
                <View className="flex flex-row items-center bordr border-ytext rounded-full p-1 bg-fadeBg absolute -top-3 -right-3 z-10">
                  <FIcon name="hash" size={16} color="#D99800FF" />
                  <Text className="text-base text-ytext">{ind + 1}</Text>
                </View>
                <View className="flex flex-row justify-between w-11/12">
                  <View className="flex items-center flex-row">
                    <Image
                      source={{ uri: item?.icon }}
                      style={styles.smallImg}
                    />
                    <View className="ml-3 inline">
                      <View>
                        <Text className="text-gray-300 text-lg">
                          {item?.name}
                        </Text>
                      </View>
                      <Text className="text-gray-400">
                        {item?.symbol?.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                  <View className="flex mr-2">
                    <View>
                      <Text className="text-ytext text-lg">
                        $ {item?.usd_price}
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
            ) : null
          )}
        </View>
      </View>
    </View>
  );
};

export default Body;
