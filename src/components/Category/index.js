import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Body from "./Body";
import api from "../../api";

const Index = ({ route }) => {
  const { category_id, category_name } = route?.params;
  const [list, setList] = useState([]);

  const init = async () => {
    const result = await api.GetMarketData("usd", category_id);
    setList(result);
    console.log(result[0]);
  };

  useEffect(() => {
    init();
  }, []);
  return (
    <View>
      <Body _this={{ list, category_name }} />
    </View>
  );
};

export default Index;
