import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import IonIcon from "react-native-vector-icons/Ionicons";
import { styles } from "../../../styles";

const Top = () => {
  let name = "Mr Developer";
  let imageUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtjzKzdxurBCUMPxx2grTPnBApkPhJE8d-GLBzj9eOQEeAVGVJNav-W4rZWK92GurwN8k&usqp=CAU";

  return (
    <View className="flex flex-row justify-between items-center px-2 pt-5">
      <View className="flex flex-row items-center gap-3">
        <Image style={styles.profileImg} source={{ uri: imageUrl }} />
        <View>
          <Text className="text-xl text-ytext">
            <Text className="text-xl text-gray-400">Hii, </Text>
            {name} !
          </Text>
          <Text className="text-md text-gray-400">Welcome back...</Text>
        </View>
      </View>
      <TouchableOpacity>
        <IonIcon name="settings-sharp" size={35} color="#D99800FF" />
      </TouchableOpacity>
    </View>
  );
};

export default Top;
