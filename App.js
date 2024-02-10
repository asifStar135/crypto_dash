import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "react-native";
import Home from "./src/components/Home";
import Header from "./src/components/Header";
import Discover from "./src/components/Discover";
import Market from "./src/components/Market";
import Profile from "./src/components/Profile";
import CoinPage from "./src/components/CoinPage";
import Toast from "react-native-toast-message";
import { View } from "react-native";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <View className="h-full">
        <StatusBar backgroundColor="#171c21" />
        <Stack.Navigator initialRouteName="home">
          <Stack.Screen
            name="home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="discover"
            component={Discover}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="market"
            component={Market}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="profile"
            component={Profile}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="coin-page"
            component={CoinPage}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
        <Header />
        <Toast position="bottom" bottomOffset={20} />
      </View>
    </NavigationContainer>
  );
}
