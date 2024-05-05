import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
const logo = require("../../assets/logo.png");
import React from "react";
import { styles } from "../../../styles";

const Step1 = ({ _this }) => {
  return (
    <View className="h-full bg-darkBlue flex items-center justify-center">
      <Image source={logo} style={styles.logo} />
      <Text className="text-ytext text-2xl font-semibold my-8">
        Welcome to CryptoDash !
      </Text>
      <TouchableOpacity
        className="flex flex-row items-center bg-ytext px-8 py-4 shadow-lg shadow-ytext rounded-xl"
        onPress={() => _this.goNext(1)}
      >
        <Text className="text-2xl text-darkBlue mx-4 font-semibold">
          Get Started
        </Text>
        <Feather name="arrow-right-circle" size={40} color="#171c21" />
      </TouchableOpacity>
    </View>
  );
};

export default Step1;
