import { View, Text, TextInput, Image } from "react-native";
import React, { useState } from "react";
import FaIcon from "react-native-vector-icons/FontAwesome";
import { styles } from "../../../styles";

const Top = () => {
  let imageUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtjzKzdxurBCUMPxx2grTPnBApkPhJE8d-GLBzj9eOQEeAVGVJNav-W4rZWK92GurwN8k&usqp=CAU";

  return (
    <View className="bg-darkBlue">
      <View className="flex flex-row  items-center gap-3 p-5">
        <Image style={styles.profileImg} source={{ uri: imageUrl }} />
        <Text className="text-2xl text-white">Discover</Text>
      </View>
      <View className="flex flex-row justify-between bg-gray-700 p-3 rounded-lg items-center w-[95%] mx-auto">
        <FaIcon name="search" size={25} color={"#D99800FF"} />
        <TextInput
          placeholder="Type to search"
          //   value={searchText}
          //   onChange={(e) => setSearchText(e.target.value)}
          placeholderTextColor={"#D99800FF"}
          className="w-11/12 font-semibold text-lg text-ytext"
          //   onFocus={() => setTyping(true)}
        />
      </View>
    </View>
  );
};

export default Top;
