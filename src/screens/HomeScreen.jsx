import React, { useContext, useEffect, useState } from "react";

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";

import { Feather, Ionicons } from "@expo/vector-icons";

import AppStatusBar from "../components/AppStatusBar";
import BottomTabBar from "../components/BottomTabBar";
import GoalOption from "../components/GoalOption";
import PrimaryButton from "../components/PrimaryButton";
import ScreenHeader from "../components/ScreenHeader";
import SectionCard from "../components/SectionCard";
import SearchBar from "../components/SearchBar";

import { COLORS, SPACING } from "../constants/theme";
import { ThemeContext } from "../context/ThemeContext";
import { nutritionGoals, tabs } from "../data/mockData";

import { fetchMeals } from "../api/api";

export default function HomeScreen({ navigation }) {
  const [search, setSearch] = useState("");

  const [budget, setBudget] = useState("");

  const [people, setPeople] = useState("");

  const [days, setDays] = useState("");

  const [calories, setCalories] = useState("");

  const [currentGoals, setCurrentGoals] = useState(nutritionGoals || []);

  const [meals, setMeals] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");
  const { theme, toggleTheme } = useContext(ThemeContext);

  const backgroundColor =
    theme === "light" ? COLORS.background : COLORS.darkBackground;

  const textColor = theme === "light" ? COLORS.text : COLORS.darkText;

  const surfaceColor = theme === "light" ? COLORS.surface : COLORS.darkSurface;

  const handleGoalPress = (goalId) => {
    setCurrentGoals((prev) =>
      prev.map((goal) => ({
        ...goal,
        active: goal.id === goalId,
      })),
    );
  };

  const handleGenerate = () => {
    const selectedGoal = currentGoals.find((g) => g.active)?.label;

    navigation.navigate("processing", {
      budget,
      people,
      days,
      calories,
      goal: selectedGoal,
    });
  };

  useEffect(() => {
    const loadMeals = async () => {
      try {
        setLoading(true);

        const data = await fetchMeals();

        setMeals(data);
      } catch (err) {
        setError("Failed to load meals");
      } finally {
        setLoading(false);
      }
    };

    loadMeals();
  }, []);

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor,
          },
        ]}
      >
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loaderContainer}>
        <Text>{error}</Text>
      </View>
    );
  }

 return (
<View
style={[
styles.container,
{
backgroundColor,
},
]}

>

<AppStatusBar
backgroundColor={backgroundColor}
barStyle={theme === "light" ? "dark-content" : "light-content"}
/>
<ScreenHeader
  subtitle="AI Nutrition Planner"
  title="Smart Grocery"
/>

<ScrollView
  contentContainerStyle={styles.scrollContent}
  showsVerticalScrollIndicator={false}
>
  <SearchBar
    value={search}
    onChangeText={setSearch}
  />

  <TouchableOpacity
    onPress={toggleTheme}
    style={styles.themeButton}
  >
    <Text style={styles.themeButtonText}>
      {theme === "light"
        ? "🌙 Dark Mode"
        : "☀️ Light Mode"}
    </Text>
  </TouchableOpacity>

  <View style={styles.topSection}>
    <SectionCard title="Basic Info">
      <View
        style={[
          styles.inputWrapper,
          {
            backgroundColor: surfaceColor,
          },
        ]}
      >
        <Feather
          name="dollar-sign"
          size={24}
          color={COLORS.textMuted}
          style={styles.inputIcon}
        />

        <TextInput
          placeholder="Budget (€)"
          placeholderTextColor={COLORS.textMuted}
          value={budget}
          onChangeText={setBudget}
          style={[
            styles.input,
            {
              color: textColor,

              backgroundColor: surfaceColor,
            },
          ]}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.row}>
        <View
          style={[
            styles.inputWrapper,
            styles.half,
            {
              backgroundColor: surfaceColor,
            },
          ]}
        >
          <Ionicons
            name="people-outline"
            size={22}
            color={COLORS.textMuted}
            style={styles.inputIcon}
          />

          <TextInput
            placeholder="People"
            placeholderTextColor={COLORS.textMuted}
            value={people}
            onChangeText={setPeople}
            style={[
              styles.input,
              {
                color: textColor,

                backgroundColor: surfaceColor,
              },
            ]}
            keyboardType="numeric"
          />
        </View>

        <View
          style={[
            styles.inputWrapper,
            styles.half,
            {
              backgroundColor: surfaceColor,
            },
          ]}
        >
          <Ionicons
            name="calendar-outline"
            size={22}
            color={COLORS.textMuted}
            style={styles.inputIcon}
          />

          <TextInput
            placeholder="Days"
            placeholderTextColor={COLORS.textMuted}
            value={days}
            onChangeText={setDays}
            style={[
              styles.input,
              {
                color: textColor,

                backgroundColor: surfaceColor,
              },
            ]}
            keyboardType="numeric"
          />
        </View>
      </View>
    </SectionCard>

    <SectionCard title="Nutrition Goal">
      <View style={styles.goalGrid}>
        {(currentGoals || []).map((goal) => (
          <GoalOption
            key={goal.id}
            active={goal.active}
            label={goal.label}
            onPress={() =>
              handleGoalPress(goal.id)
            }
          />
        ))}
      </View>

      <View
        style={[
          styles.inputWrapper,
          {
            backgroundColor: surfaceColor,
          },
        ]}
      >
        <Ionicons
          name="flame-outline"
          size={22}
          color={COLORS.textMuted}
          style={styles.inputIcon}
        />

        <TextInput
          placeholder="Calories per day"
          placeholderTextColor={COLORS.textMuted}
          value={calories}
          onChangeText={setCalories}
          style={[
            styles.input,
            {
              color: textColor,

              backgroundColor: surfaceColor,
            },
          ]}
          keyboardType="numeric"
        />
      </View>
    </SectionCard>

    <SectionCard title="Popular Meals">
      <FlatList
        data={meals}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.mealCard}
            onPress={() =>
              navigation.navigate(
                "mealDetails",
                {
                  meal: item,
                },
              )
            }
          >
            <Image
              source={{
                uri: item.strMealThumb,
              }}
              style={styles.mealImage}
            />

            <Text
              style={[
                styles.mealTitle,
                {
                  color: textColor,
                },
              ]}
            >
              {item.strMeal}
            </Text>
          </TouchableOpacity>
        )}
      />
    </SectionCard>
  </View>

  <View style={styles.bottomSection}>
    <PrimaryButton
      title="✨ Generate Plan"
      onPress={handleGenerate}
    />

    <View style={styles.privacyRow}>
      <Ionicons
        name="lock-closed-outline"
        size={16}
        color={COLORS.textMuted}
      />

      <Text style={styles.privacyText}>
        Your plan is 100% personalized and
        private
      </Text>
    </View>
  </View>
</ScrollView>

<BottomTabBar
  activeTab="home"
  onTabPress={(tab) => {
    if (tab === "home") {
      navigation.navigate("home");
    }

    if (tab === "shopping") {
      navigation.navigate("shopping");
    }

    if (tab === "history") {
      navigation.navigate("history");
    }

    if (tab === "meal") {
      navigation.navigate("meal");
    }

    if (tab === "summary") {
      navigation.navigate("summary");
    }
  }}
  tabs={tabs}
/>
```

  </View>
);

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    width: "100%",

    backgroundColor: COLORS.background,
  },

  scrollContent: {
    paddingHorizontal: SPACING.md,

    paddingBottom: 180,
  },

  topSection: {
    gap: 16,
  },

  row: {
    flexDirection: "row",

    alignItems: "center",

    gap: 12,
  },

  half: {
    flex: 1,
  },

  inputWrapper: {
    flexDirection: "row",

    alignItems: "center",

    height: 64,

    backgroundColor: COLORS.surface,

    borderRadius: 22,

    paddingHorizontal: 20,

    borderWidth: 1,

    borderColor: "rgba(0,0,0,0.04)",

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 8,
    },

    shadowOpacity: 0.03,

    shadowRadius: 18,

    elevation: 3,
  },

  input: {
    flex: 1,

    height: 60,

    fontSize: 16,

    color: COLORS.text,

    outlineStyle: "none",
  },

  inputIcon: {
    marginRight: 12,
  },

  goalGrid: {
    flexDirection: "row",

    flexWrap: "wrap",

    gap: 10,

    marginBottom: 16,
  },

  bottomSection: {
    marginTop: 18,

    marginBottom: 20,
  },

  privacyRow: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",

    gap: 8,

    marginTop: 14,
  },

  privacyText: {
    color: COLORS.textMuted,

    fontSize: 14,

    fontWeight: "500",
  },

  loaderContainer: {
    flex: 1,

    justifyContent: "center",

    alignItems: "center",
  },

  mealCard: {
    width: 220,

    marginRight: 16,
  },

  mealImage: {
    width: "100%",

    height: 140,

    borderRadius: 18,
  },

  mealTitle: {
    marginTop: 10,

    fontSize: 16,

    fontWeight: "600",

    color: COLORS.text,
  },
  themeButton: {
    backgroundColor: COLORS.primary,

    paddingVertical: 14,

    borderRadius: 18,

    alignItems: "center",

    marginBottom: 18,
  },

  themeButtonText: {
    color: COLORS.white,

    fontSize: 16,

    fontWeight: "700",
  },
});
