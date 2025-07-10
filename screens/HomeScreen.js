import {Text,View, StyleSheet, ImageBackground} from "react-native";
import React from "react";


const backgroundImage = require("../assets/images/todoAppBgImg.png")

const HomeScreen = ({navigation}) => {
  return (
    <ImageBackground source={backgroundImage} style={styles.bgImage}>
      <View style={styles.container}>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bgImage: {
    width: '100%',
    height: '100%',
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  container: {
    flex: 1, // ✅ 선택 사항이지만 권장
    width: '100%',
    alignItems: "center",
    justifyContent: "center",
  },
})

export default HomeScreen;