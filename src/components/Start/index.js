import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";
import Step3 from "./Step3";
import api from "../../api";
import { saveLocalData } from "../../helpers";
import { useNavigation } from "@react-navigation/native";
const defaultIcon = require("../../assets/default.png");

const index = ({ profileData, setProfileData }) => {
  const [username, setUsername] = useState("");
  const [image, setImage] = useState(defaultIcon);
  const [country, setCountry] = useState("");
  const [baseCurrency, setBaseCurrency] = useState("");
  const [step, setStep] = useState(1);
  const [trendingList, setTrendingList] = useState([]);
  const [watchList, setWatchList] = useState([]);
  const navigator = useNavigation();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage({ uri: result.assets[0].uri });
    }
  };

  const goNext = (stepNo) => {
    if (stepNo == 1) setStep(stepNo + 1);
    else if (stepNo == 2) {
      if (!username) {
        Toast.show({
          text1: "Please enter username",
          text2: "Let us know you..",
          type: "error",
          position: "top",
        });
        return;
      }
      setStep(stepNo + 1);
    } else {
      finalSubmit();
    }
  };

  const finalSubmit = async () => {
    // console.log(image);
    await saveLocalData("user", {
      username,
      image,
    });

    const watchListToSave = trendingList
      .filter((item, i) => watchList[i])
      .map((item) => item?.id);
    // console.log(watchListToSave);

    await saveLocalData("watchList", watchListToSave);

    setProfileData({ username, image });
  };

  const fetchTrendingList = async () => {
    const list = await api.TrendingCoins();
    setTrendingList(list);
    let tempArr = Array(list?.length).fill(false);
    setWatchList(tempArr);
  };

  const onClickWatchList = (index) => {
    setWatchList((state) =>
      state.map((item, i) => (index != i ? item : !item))
    );
  };

  useEffect(() => {
    if (step == 3) {
      fetchTrendingList();
    }
  }, [step]);

  return (
    <View>
      {step == 1 ? (
        <Step1
          _this={{
            setStep,
            goNext,
          }}
        />
      ) : step == 2 ? (
        <Step2
          _this={{
            username,
            setUsername,
            image,
            setImage,
            country,
            setCountry,
            baseCurrency,
            setBaseCurrency,
            setStep,
            pickImage,
            goNext,
          }}
        />
      ) : (
        <Step3
          _this={{
            goNext,
            trendingList,
            watchList,
            onClickWatchList,
            setStep,
            image,
            username,
          }}
        />
      )}
    </View>
  );
};

export default index;
