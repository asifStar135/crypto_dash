import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import API from "../../api";
import Body from "./Body";

const Home = () => {
  return (
    <ScrollView className="w-full bg-darkBlue">
      <Body />
    </ScrollView>
  );
};

export default Home;
