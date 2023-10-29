import { View, ScrollView, Image, Text, TextInput } from "react-native";

import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import { useEffect, useState } from "react";

import axios from "axios";
import Recipies from "../components/Recipies";
const HomeScreen = () => {
  const [activeCategory, setActiveCategory] = useState("Beef");
  const [meals, setMeals] = useState([]);
  const [categories, setCategories] = useState([]);
  const handleChangeCategory = (category) => {
    getRecipies(category);
    setActiveCategory(category);
    setMeals([]);
  };
  const getCategories = async () => {
    try {
      const response = await axios.get(
        "https://themealdb.com/api/json/v1/1/categories.php"
      );

      if (response && response.data) {
        setCategories(response.data.categories);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const getRecipies = async (category = "Beef") => {
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );

      if (response && response.data) {
        setMeals(response.data.meals);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getCategories();
    getRecipies();
  }, []);
  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className="space-y-6 pt-14"
      >
        {/* avatar bell icon */}
        <View className="mx-4 flex-row justify-between items-center mb-2">
          <Image
            source={require("../../assets/images/avatar.png")}
            style={{ height: hp(5), width: hp(5) }}
          />
          <BellIcon size={hp(4)} color="gray" />
        </View>
        {/* greetings and punchline */}
        <View className="mx-4 space-y-2 mb-2 ">
          <Text style={{ fontSize: hp(1.9) }} className="text-neutral-600">
            Hello, Kaisar!
          </Text>
          <View>
            <Text
              className="font-semibold text-neutral-600"
              style={{ fontSize: hp(3.8) }}
            >
              Make your own food,
            </Text>
            <Text
              className="font-semibold text-neutral-600"
              style={{ fontSize: hp(3.8) }}
            >
              stay at <Text className=" text-amber-400">Home</Text>
            </Text>
          </View>
        </View>
        {/* search bar */}
        <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
          <TextInput
            placeholder="Search any recipe"
            placeholderTextColor={"gray"}
            style={{ fontSize: hp(1.8) }}
            className="flex-1 text-base mb-1 pl-3 tracking-wider"
          />
          <View className="bg-white rounded-full p-3">
            <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color="gray" />
          </View>
        </View>

        {/* categories */}
        <View>
          {categories.length > 0 && (
            <Categories
              categories={categories}
              activeCategory={activeCategory}
              handleChangeCategory={handleChangeCategory}
            />
          )}
        </View>

        {/* recipes */}
        <View>
          <Recipies meals={meals} categories={categories} />
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
