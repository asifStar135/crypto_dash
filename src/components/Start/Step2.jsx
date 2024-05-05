import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const logo = require("../../assets/logo.png");
import React, { useEffect } from "react";
import { styles } from "../../../styles";
import { useTailwind } from "nativewind";

const Step2 = ({ _this }) => {
  // useEffect(() => {
  //   console.log(_this.username);
  // }, [_this.username]);
  return (
    <View className="h-full bg-darkBlue flex items-center justify-center">
      <View>
        <View className="flex items-center border border-ytext py-6 px-10 rounded-lg">
          <Image
            source={_this.image}
            style={{ ...styles.logo, borderColor: "#505050", borderWidth: 1 }}
          />
          <View className="flex flex-row justify-between p-3 border-b-2 border-ytext w-72 mt-6">
            <Feather name="user" size={35} color="#D99800FF" />
            <TextInput
              value={_this.username}
              onChangeText={(name) => _this.setUsername(name)}
              className="text-ytext font-semibold text-xl w-4/5"
              placeholder="Enter your name"
              placeholderTextColor="gray"
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={_this.pickImage}
          className="py-3 px-5 bg-fadeBg flex flex-row items-center justify-center my-8 border border-ytext rounded-lg"
        >
          <Text className="text-ytext font-semibold text-xl">Pick Image</Text>
          <MaterialCommunityIcons
            name="image-plus"
            size={40}
            color="#D99800FF"
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        className="flex flex-row items-center bg-ytext px-8 py-4 shadow-lg shadow-ytext rounded-xl"
        onPress={() => _this.goNext(2)}
      >
        <Text className="text-2xl text-darkBlue mx-4 font-semibold">Next</Text>
        <Feather name="arrow-right-circle" size={40} color="#171c21" />
      </TouchableOpacity>
    </View>
  );
};

export default Step2;
