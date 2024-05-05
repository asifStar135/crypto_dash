import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getTopGainersLosers = (marketData) => {
  // console.log("Gainers -> ");
  marketData?.sort((a, b) => {
    return b.usd_change_percentage - a.usd_change_percentage;
  });

  let size = 10;

  const len = marketData?.length;
  let gainers = marketData?.slice(0, size),
    losers = marketData?.slice(len - size, len);

  // console.log("Gainers -> ", gainers[0]);
  losers.reverse();

  return { gainers, losers };
};

export const filterMarkteData = (data, input) => {
  try {
    return data?.filter(
      (item) =>
        item?.id?.includes(input) ||
        item?.symbol?.includes(input) ||
        item?.name?.includes(input)
    );
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const saveLocalData = async (key, val) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(val));
    return true;
  } catch (error) {
    Toast.show({ text1: error?.message, type: "error" });
    return false;
  }
};

export const getLocalData = async (key) => {
  try {
    const data = await AsyncStorage.getItem(key);
    if (!data) return false;
    console.log("Local data fetch ->", data);
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
    Toast.show({ text1: error?.message, type: "error" });
    return false;
  }
};

export const removeLocalData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.log(error);
    Toast.show({ text1: error?.message, type: "error" });
    return false;
  }
};

export const randomColour = () => {
  const list = ["green", "yellow", "blue", "red", "purple", "orange", "pink"];

  let index = Math.floor(Math.random() * 100) % 7;
  console.log(list[index]);
  return list[index];
};

export const shuffleArray = (array) => {
  const newArray = [...array]; // Create a shallow copy of the original array

  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; // Swap elements
  }

  return newArray;
};
