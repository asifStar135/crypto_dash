import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "react-native";
import Toast from "react-native-toast-message";
import { View } from "react-native";
import { getLocalData, removeLocalData, saveLocalData } from "./src/helpers";
import { useEffect, useState } from "react";
import api from "./src/api";
const Components = require("./src/components/index");

export default function App() {
  const Stack = createNativeStackNavigator();
  const [profileData, setProfileData] = useState(null);
  const [watchList, setWatchList] = useState([]);
  const [marketData, setMarketData] = useState([]);
  const [news, setNews] = useState([]);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const profile = await getLocalData("user");

    if (profile) {
      setProfileData(profile);
      const list = await getLocalData("watchList");
      setWatchList(list);
    }

    const res = await api.GetMarketData("usd");
    setMarketData(res);

    const nws = await api.GetNews();
    setNews(nws);
    console.log("App js -> ", nws[0]);
  };

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#171c21" />
      {profileData ? (
        <View className="h-full">
          <Stack.Navigator initialRouteName="home">
            <Stack.Screen
              name="home"
              component={Components.Home}
              options={{ headerShown: false }}
              initialParams={{ user: profileData, watchList, news }}
            />
            <Stack.Screen
              name="discover"
              component={Components.Discover}
              options={{ headerShown: false }}
              initialParams={{ user: profileData, watchList, marketData, news }}
            />
            <Stack.Screen
              name="market"
              component={Components.Market}
              options={{ headerShown: false }}
              initialParams={{ user: profileData, watchList }}
            />
            <Stack.Screen
              name="profile"
              component={Components.Profile}
              options={{ headerShown: false }}
              initialParams={{ user: profileData, watchList }}
            />
            <Stack.Screen
              name="coin-page"
              component={Components.CoinPage}
              options={{ headerShown: false }}
              initialParams={{ user: profileData, watchList }}
            />
            <Stack.Screen
              name="category"
              component={Components.Category}
              options={{ headerShown: false }}
              initialParams={{ user: profileData, watchList }}
            />
          </Stack.Navigator>
          <Components.Header />
        </View>
      ) : (
        <Components.Start
          setProfileData={setProfileData}
          profileData={profileData}
        />
      )}
      <Toast position="top" />
    </NavigationContainer>
  );
}
