import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import AntIcon from "react-native-vector-icons/AntDesign";
import FAIcon from "react-native-vector-icons/FontAwesome5";
import MIcon from "react-native-vector-icons/MaterialIcons";
import MCOMIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../../../styles";

const Search = ({ _this }) => {
  const [columnShow, setColumnShow] = useState("coins");
  const navigator = useNavigation();

  return (
    <View>
      <View className="flex flex-row justify-between bg-gray-700 p-3 items-center">
        <AntIcon
          color="white"
          name="arrowleft"
          size={32}
          onPress={() => _this?.setOpenSearch(false)}
        />
        <TextInput
          placeholder="What are you looking for ?"
          placeholderTextColor={"gray"}
          returnKeyType="search"
          className="w-11/12 ml-2 font-semibold text-lg text-gray-300"
          autoFocus={_this?.openSearch}
          onChangeText={(text) => _this?.setSearchInput(text)}
          value={_this?.searchInput}
        />
      </View>
      {!_this?.searchInput ? (
        <View className="mx-5 my-4">
          <Text className="text-gray-300 text-xl">Recent Searches</Text>
          {_this?.history?.map((item, i) => (
            <View
              className="flex flex-row justify-between items-center my-1 px-5"
              key={i}
            >
              <View className="flex flex-row items-center bg-red-00">
                <AntIcon
                  name="clockcircleo"
                  size={20}
                  color="gray"
                  onPress={() => _this?.removeFromHistory(item)}
                />
                <Text
                  className="text-xl mb-1 text-gray-500 mx-5"
                  onPress={() => _this?.setSearchInput(item)}
                >
                  {item}
                </Text>
              </View>
              <AntIcon
                name="close"
                size={25}
                color="gray"
                onPress={() => _this?.removeFromHistory(item)}
              />
            </View>
          ))}
        </View>
      ) : _this.searchInput?.length > 2 ? (
        <View>
          <View className="p-5 flex flex-row justify-center">
            <TouchableOpacity
              className="flex flex-row items-center border-r border-gray-500 px-2"
              onPress={() => setColumnShow("coins")}
            >
              <FAIcon
                name="coins"
                size={22}
                className="text-gray-300"
                color={"gray"}
              />
              <Text
                className={
                  "text-base text-gray-300 p-2 border-b-2" +
                  (columnShow == "coins" && " border-gray-300")
                }
              >
                Coins
              </Text>
              <Text className="text-sm text-gray-300 mb-2">
                {_this?.suggetions?.coins?.length}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex flex-row items-center border-gray-500 px-2"
              onPress={() => setColumnShow("categories")}
            >
              <MIcon
                name="category"
                size={22}
                className="text-gray-300"
                color={"gray"}
              />
              <Text
                className={
                  "text-base text-gray-300 p-2 border-b-2" +
                  (columnShow == "categories" && " border-gray-300")
                }
              >
                Categories
              </Text>
              <Text className="text-sm text-gray-300 mb-2">
                {_this?.suggetions?.categories?.length}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex flex-row items-center border-l border-gray-500 px-2"
              onPress={() => setColumnShow("news")}
            >
              <FAIcon
                name="newspaper"
                size={22}
                className="text-gray-300"
                color={"gray"}
              />
              <Text
                className={
                  "text-base text-gray-300 p-2 border-b-2" +
                  (columnShow == "news" && " border-gray-300")
                }
              >
                News
              </Text>
              <Text className="text-sm text-gray-300 mb-2">
                {_this?.suggetions?.news?.length}
              </Text>
            </TouchableOpacity>
          </View>
          <View className="p-3">
            {_this?.suggetions[columnShow]?.map((item) =>
              columnShow == "coins" ? (
                <TouchableOpacity
                  key={item?.id}
                  onPress={() =>
                    navigator.navigate("coin-page", { coin_id: item?.id })
                  }
                  className="p-2 my-2 rounded-3xl border border-gray-700 flex flex-row justify-between"
                >
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
                </TouchableOpacity>
              ) : columnShow == "categories" ? (
                <View
                  key={item?.category_id}
                  className="p-2 my-2 rounded-3xl border border-gray-700 flex flex-row justify-between"
                >
                  <View className="flex flex-row items-center">
                    <MCOMIcon
                      name="format-list-bulleted-type"
                      size={40}
                      color="#D99800FF"
                    />
                    <View className="ml-2">
                      <Text className="text-base text-gray-300">
                        {item?.name}
                      </Text>
                      <Text className="text-sm text-gray-500">
                        {item?.category_id}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    className="flex flex-row items-center p-3"
                    onPress={() =>
                      navigator.navigate("category", {
                        category_id: item?.category_id,
                        category_name: item?.name,
                      })
                    }
                  >
                    <AntIcon name="rightcircleo" size={30} color="#D99800FF" />
                  </TouchableOpacity>
                </View>
              ) : (
                <View
                  key={item?.url}
                  className="p-2 my-2 rounded-xl border border-gray-700 bg-fadeBg"
                >
                  <View className="flex flex-row items-center">
                    <MCOMIcon
                      name="playlist-star"
                      size={35}
                      color="#D99800FF"
                    />
                    <Text className="text-xl text-ytext font-semibold">
                      C-D-N
                    </Text>
                  </View>
                  <Text className="text-base text-gray-300 my-2 px-1">
                    {item?.title}.
                  </Text>
                  <Image
                    source={{ uri: item?.thumbnail }}
                    style={styles.newsImg}
                  />
                  <View className="flex flex-row items-center mx-auto mt-2">
                    <Text className="text-xl text-ytext font-semibold mx-2 underline">
                      View
                    </Text>
                    {/* <AntIcon name="rightcircleo" size={35} color="#D99800FF" /> */}
                  </View>
                </View>
              )
            )}
          </View>
        </View>
      ) : (
        <View className="p-10">
          <Text className="font-semibold text-xl text-gray-300 text-center">
            Enter at least 3 characters
          </Text>
        </View>
      )}
    </View>
  );
};

export default Search;
