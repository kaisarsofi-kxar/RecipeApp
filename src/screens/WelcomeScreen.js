import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

const WelcomeScreen = () => {
  const ring1padding = useSharedValue(0);
  const ring2padding = useSharedValue(0);

  const navigation = useNavigation();

  useEffect(() => {
    ring1padding.value = 0;
    ring2padding.value = 0;
    setTimeout(
      () => (ring1padding.value = withSpring(ring1padding.value + hp(4))),
      100
    );
    setTimeout(
      () => (ring2padding.value = withSpring(ring2padding.value + hp(4.5))),
      300
    );
    setTimeout(() => navigation.navigate("Home"), 2000);
  }, []);
  return (
    <View className="flex-1 justify-center items-center space-y-10 bg-amber-500">
      <StatusBar style="light" />

      {/* logo image with rings */}
      <Animated.View
        className="bg-white/20 rounded-full "
        style={{ padding: ring1padding }}
      >
        <Animated.View
          className="bg-white/20 rounded-full "
          style={{ padding: ring2padding }}
        >
          <Image
            source={require("../../assets/images/welcome.png")}
            style={{ width: hp(22), height: hp(22) }}
          />
        </Animated.View>
      </Animated.View>

      {/* title and punchline */}
      <View className="flex items-center space-y-2">
        <Text
          className="font-bold text-white tracking-widest "
          style={{ fontSize: hp(7) }}
        >
          Foody
        </Text>
        <Text
          className="font-medium text-lg text-white "
          style={{ fontSize: hp(2.5) }}
        >
          Food is always right
        </Text>
      </View>
    </View>
  );
};

export default WelcomeScreen;
