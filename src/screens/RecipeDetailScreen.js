import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import CachedImage from "../helpers/CachedImage";
import {
  ChevronLeftIcon,
  ClockIcon,
  FireIcon,
  MapPinIcon,
} from "react-native-heroicons/outline";
import {
  HeartIcon,
  Square3Stack3DIcon,
  UserIcon,
  UsersIcon,
} from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Loading from "../components/Loading";
import YoutubeIframe from "react-native-youtube-iframe";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";

const RecipeDetailScreen = (props) => {
  let item = props.route.params;
  const [isFavorite, setIsFavorite] = useState(false);
  const navigation = useNavigation();
  const [meal, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMealData = async (id) => {
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );

      if (response && response.data) {
        setMeals(response.data.meals[0]);
        setLoading(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getMealData(item.idMeal);
  }, []);

  const ingredientsIndexes = (meal) => {
    if (!meal) return [];
    let indexes = [];
    for (let i = 1; i <= 20; i++) {
      if (meal["strIngredient" + i]) {
        indexes.push(i);
      }
    }

    return indexes;
  };

  const getYoutubeVideoId = (url) => {
    const regex = /[?&]v=([^&]+)/;
    const match = url.match(regex);
    if (match && match[1]) {
      return match[1];
    }
    return null;
  };
  return (
    <ScrollView
      className="bg-white flex-1"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <StatusBar style="light" />

      {/* recipe image */}
      <View className="flex-row justify-center">
        <CachedImage
          uri={item.strMealThumb}
          sharedTransitionTag={item.strMeal}
          style={{
            width: wp(98),
            height: hp(50),
            borderRadius: 53,
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            marginTop: 4,
          }}
        />
      </View>
      {/* back button */}
      <Animated.View
        entering={FadeIn.delay(200).duration(1000)}
        className="w-full absolute items-center justify-between flex-row pt-14"
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-2 rounded-full ml-5 bg-white"
        >
          <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#fbbf24" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsFavorite(!isFavorite)}
          className="p-2 rounded-full mr-5 bg-white"
        >
          <HeartIcon
            size={hp(3.5)}
            strokeWidth={4.5}
            color={isFavorite ? "red" : "gray"}
          />
        </TouchableOpacity>
      </Animated.View>

      {/* meal discription */}
      {loading ? (
        <Loading size="large" className="mt-16" />
      ) : (
        <View className="px-4 flex justify-between space-y-4 pt-8">
          {/* name and area */}
          <Animated.View
            entering={FadeInDown.duration(700).springify().damping(12)}
            className="space-y-2"
          >
            <Text
              style={{ fontSize: hp(3) }}
              className="font-bold flex-1 text-neutral-700"
            >
              {meal?.strMeal}
            </Text>
            <View className="flex-row space-x-1">
              <MapPinIcon size={hp(2.5)} strokeWidth={2} color="gray" />
              <Text
                style={{ fontSize: hp(2) }}
                className="font-medium flex-1 text-neutral-500"
              >
                {meal?.strArea}
              </Text>
            </View>
            {/* misc */}
            <Animated.View
              entering={FadeInDown.delay(100)
                .duration(700)
                .springify()
                .damping(12)}
              className="flex-row justify-around"
            >
              <View className="flex rounded-full bg-amber-300 p-2">
                <View
                  style={{ height: hp(6.5), width: hp(6.5) }}
                  className="bg-white rounded-full flex justify-center items-center"
                >
                  <ClockIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                </View>
                <View className="flex items-center py-2 space-y-2">
                  <Text
                    style={{ fontSize: hp(2) }}
                    className="font-bold text-neutral-700"
                  >
                    35
                  </Text>
                  <Text
                    style={{ fontSize: hp(1.3) }}
                    className="font-bold text-neutral-700"
                  >
                    Mins
                  </Text>
                </View>
              </View>

              <View className="flex rounded-full bg-amber-300 p-2">
                <View
                  style={{ height: hp(6.5), width: hp(6.5) }}
                  className="bg-white rounded-full flex justify-center items-center"
                >
                  <UsersIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                </View>
                <View className="flex items-center py-2 space-y-2">
                  <Text
                    style={{ fontSize: hp(2) }}
                    className="font-bold text-neutral-700"
                  >
                    03
                  </Text>
                  <Text
                    style={{ fontSize: hp(1.3) }}
                    className="font-bold text-neutral-700"
                  >
                    Servings
                  </Text>
                </View>
              </View>
              <View className="flex rounded-full bg-amber-300 p-2">
                <View
                  style={{ height: hp(6.5), width: hp(6.5) }}
                  className="bg-white rounded-full flex justify-center items-center"
                >
                  <FireIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                </View>
                <View className="flex items-center py-2 space-y-2">
                  <Text
                    style={{ fontSize: hp(2) }}
                    className="font-bold text-neutral-700"
                  >
                    103
                  </Text>
                  <Text
                    style={{ fontSize: hp(1.3) }}
                    className="font-bold text-neutral-700"
                  >
                    Cal
                  </Text>
                </View>
              </View>
              <View className="flex rounded-full bg-amber-300 p-2">
                <View
                  style={{ height: hp(6.5), width: hp(6.5) }}
                  className="bg-white rounded-full flex justify-center items-center"
                >
                  <Square3Stack3DIcon
                    size={hp(4)}
                    strokeWidth={2.5}
                    color="#525252"
                  />
                </View>
                <View className="flex items-center py-2 space-y-2">
                  <Text
                    style={{ fontSize: hp(2) }}
                    className="font-bold text-neutral-700"
                  ></Text>
                  <Text
                    style={{ fontSize: hp(1.3) }}
                    className="font-bold text-neutral-700"
                  >
                    Easy
                  </Text>
                </View>
              </View>
            </Animated.View>
          </Animated.View>
          {/* ingredents */}
          <Animated.View
            entering={FadeInDown.delay(200)
              .duration(700)
              .springify()
              .damping(12)}
            className="space-y-4"
          >
            <Text
              style={{ fontSize: hp(2.5) }}
              className="font-bold  flex-1  text-neutral-700"
            >
              Ingredients
            </Text>
            <View className="space-y-2 ml-3">
              {ingredientsIndexes(meal).map((i) => {
                return (
                  <View key={i} className="flex-row space-x-4">
                    <View
                      style={{ height: hp(1.5), width: hp(1.5) }}
                      className="bg-amber-300 rounded-full"
                    />
                    <View className="flex-row space-x-2">
                      <Text
                        style={{ fontSize: hp(1.7) }}
                        className="font-extrabold text-neutral-700 "
                      >
                        {meal["strMeasure" + i]}
                      </Text>
                      <Text
                        style={{ fontSize: hp(1.7) }}
                        className="font-medium text-neutral-600 "
                      >
                        {meal["strIngredient" + i]}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </Animated.View>

          {/* instructions */}
          <Animated.View
            entering={FadeInDown.delay(300)
              .duration(700)
              .springify()
              .damping(12)}
            className="space-y-4"
          >
            <Text
              style={{ fontSize: hp(2.5) }}
              className="font-bold  flex-1  text-neutral-700"
            >
              Instructions
            </Text>
            <Text style={{ fontSize: hp(1.7) }} className="text-neutral-700">
              {meal?.strInstructions}
            </Text>
          </Animated.View>

          {/* recipe video */}
          {meal.strYoutube && (
            <Animated.View
              entering={FadeInDown.delay(400)
                .duration(700)
                .springify()
                .damping(12)}
              className="space-y-4"
            >
              <Text
                style={{ fontSize: hp(2.5) }}
                className="font-bold flex-1 text-neutral-700"
              >
                Recipe Video
              </Text>
              <View>
                <YoutubeIframe
                  videoId={getYoutubeVideoId(meal?.strYoutube)}
                  height={hp(30)}
                />
              </View>
            </Animated.View>
          )}
        </View>
      )}
    </ScrollView>
  );
};

export default RecipeDetailScreen;
