import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import AntIcon from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
  const navigator = useNavigation();
  const [tab, setTab] = useState("home");
  const navigate = (value) => {
    setTab(value);
    navigator.navigate(value);
  };

  return (
    <View className="absolute bottom-4 w-full">
      <View className="rounded-full w-11/12 mx-auto bg-gray-800 flex flex-row p-2 items-center justify-around">
        <TouchableOpacity
          className="text-center flex items-center"
          onPress={() => navigate("home")}
        >
          <AntIcon
            name="home"
            className="text-ytext"
            size={tab == "home" ? 30 : 40}
            color="#D99800FF"
          />
          {tab == "home" ? (
            <Text className="text-md text-ytext">Home</Text>
          ) : null}
        </TouchableOpacity>
        <TouchableOpacity
          className="text-center flex items-center"
          onPress={() => navigate("discover")}
        >
          <AntIcon
            name="search1"
            className="text-ytext"
            size={tab == "discover" ? 30 : 45}
            color="#D99800FF"
          />
          {tab == "discover" ? (
            <Text className="text-md text-ytext">Discover</Text>
          ) : null}
        </TouchableOpacity>
        <TouchableOpacity
          className="text-center flex items-center"
          onPress={() => navigate("market")}
        >
          <AntIcon
            name="barschart"
            className="text-ytext"
            size={tab == "market" ? 30 : 40}
            color="#D99800FF"
          />
          {tab == "market" ? (
            <Text className="text-md text-ytext">Market</Text>
          ) : null}
        </TouchableOpacity>
        <TouchableOpacity
          className="text-center flex items-center"
          onPress={() => navigate("profile")}
        >
          <AntIcon
            name="user"
            className="text-ytext"
            size={tab == "profile" ? 30 : 40}
            color="#D99800FF"
          />
          {tab == "profile" ? (
            <Text className="text-md text-ytext">Profile</Text>
          ) : null}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
