import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { styles } from "../../../styles";
import { useNavigation } from "@react-navigation/native";

const Body = ({ _this }) => {
  const navigator = useNavigation();

  return (
    <View className="bg-darkBlue">
      {_this?.openSearch ? (
        <View className="flex flex-row bg-gray-700 p-4 rounded-xl m-3 justify-between">
          <TextInput
            value={_this.searchInput}
            onChangeText={(text) => _this.setSearchInput(text)}
            className="w-11/12 text-ytext text-lg"
            placeholder="Type to search . . ."
            placeholderTextColor="gray"
            cursorColor="#D99800FF"
          />
          <AntDesign
            name="close"
            size={30}
            color="black"
            onPress={() => _this.setOpenSearch(false)}
            className="p-2"
          />
        </View>
      ) : (
        <View className="flex flex-row justify-between items-center p-5 pr-8">
          <View className="flex flex-row items-center">
            <Image style={styles.profileImg} source={_this?.user?.image} />
            <Text className="text-2xl text-ytext mx-4">Market</Text>
          </View>
          <TouchableOpacity onPress={() => _this.setOpenSearch(true)}>
            <FontAwesome name="search" size={35} color="white" />
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={_this?.rangeOptions}
        renderItem={({ item }) => (
          <TouchableOpacity
            className={
              "p-2 border rounded-2xl border-gray-500 h-11 mx-2 mb-3 " +
              (item.value == _this.listType ? "bg-ytext border-0" : "")
            }
            onPress={() => _this.setListType(item?.value)}
          >
            <Text
              className={
                item.value == _this.listType ? "text-darkBlue" : "text-gray-400"
              }
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        )}
      />
      <ScrollView className="py-2 px-4 h-[80vh]">
        {_this[
          _this.openSearch && _this.searchInput ? "filterData" : _this.listType
        ]?.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() =>
              navigator.navigate("coin-page", { coin_id: item?.id })
            }
          >
            <View className="p-2 my-1 rounded-3xl border border-gray-500 bg-gray-800 flex flex-row justify-between">
              <View className="flex items-center flex-row">
                <Image source={{ uri: item?.icon }} style={styles.smallImg} />
                <View className="ml-3 inline">
                  <View>
                    <Text className="text-gray-300 text-lg">{item?.name}</Text>
                  </View>
                  <Text className="text-gray-400">{item?.symbol}</Text>
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
        ))}
      </ScrollView>
    </View>
  );
};

export default Body;
