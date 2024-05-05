import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "../../../styles";
import FaIcon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
let imageUrl =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtjzKzdxurBCUMPxx2grTPnBApkPhJE8d-GLBzj9eOQEeAVGVJNav-W4rZWK92GurwN8k&usqp=CAU";

const Body = ({ _this }) => {
  const navigator = useNavigation();
  return (
    <View>
      <View className="bg-darkBlue">
        <View className="flex flex-row  items-center gap-3 p-5">
          <Image style={styles.profileImg} source={{ uri: imageUrl }} />
          <Text className="text-2xl text-white">Discover</Text>
        </View>
        <View className="flex flex-row justify-between bg-gray-700 p-3 rounded-lg items-center w-[95%] mx-auto">
          <FaIcon name="search" size={25} color={"#D99800FF"} />
          <TextInput
            placeholder="Type to search"
            placeholderTextColor={"#D99800FF"}
            className="w-11/12 font-semibold text-lg text-ytext"
            onFocus={() => _this?.setOpenSearch(true)}
          />
        </View>
      </View>
      <View className="p-3 m-3 rounded-lg">
        <Text className="text-2xl font-semibold text-ytext">
          Explore Themes
        </Text>
        <View className="flex flex-row flex-wrap justify-around">
          {_this?.staticCategories?.map((item) => (
            <TouchableOpacity
              className="bg-fadeBg flex items-end p-2 pl-3 w-[47%] my-3 rounded-xl overflow-hidden"
              key={item.name}
              onPress={() =>
                navigator.navigate("category", {
                  category_id: item?.category_id,
                  category_name: item?.name,
                })
              }
            >
              <Text className="font-semibold text-lg w-full text-ytext">
                {item?.name}
              </Text>
              <Image
                source={{ uri: item?.icon }}
                style={styles.categoryIcon}
                className="-mt-1"
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

export default Body;
