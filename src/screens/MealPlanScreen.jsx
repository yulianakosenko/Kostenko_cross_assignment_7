import React from "react";

import { FlatList, StyleSheet, Text, View } from "react-native";

import AppStatusBar from "../components/AppStatusBar";
import BottomTabBar from "../components/BottomTabBar";
import MealDayCard from "../components/MealDayCard";
import PrimaryButton from "../components/PrimaryButton";
import ScreenHeader from "../components/ScreenHeader";

import { COLORS, SPACING } from "../constants/theme";

import { mealDays, tabs } from "../data/mockData";

export default function MealPlanScreen({ navigation, route }) {
  const currentCalories = route?.params?.calories || "1980";

  const currentDays = route?.params?.days || "7";

  return (
    <View style={styles.container}>
      <AppStatusBar />

      <ScreenHeader subtitle="AI Generated Nutrition" title="Your Meal Plan" />

      <FlatList
        data={mealDays}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <>
            <View style={styles.metricsRow}>
              <View style={styles.metricCard}>
                <Text style={styles.metricValue}>{currentDays}</Text>

                <Text style={styles.metricLabel}>Days</Text>
              </View>

              <View style={styles.metricCard}>
                <Text style={styles.metricValue}>{currentCalories}</Text>

                <Text style={styles.metricLabel}>kcal</Text>
              </View>

              <View style={styles.metricCard}>
                <Text style={styles.metricValue}>3</Text>

                <Text style={styles.metricLabel}>Meals</Text>
              </View>
            </View>

            <View style={styles.noticeCard}>
              <Text style={styles.noticeText}>
                Personalized balanced meal plan optimized for your nutrition
                goals
              </Text>
            </View>
          </>
        }
        renderItem={({ item }) => (
          <MealDayCard meals={item.meals} title={item.title} />
        )}
      />

      <View style={styles.buttonWrapper}>
        <PrimaryButton
          title="Generate Shopping List"
          onPress={() => navigation.navigate("shopping")}
        />
      </View>

      <BottomTabBar
        activeTab="meal"
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
            navigation.navigate("meal", {
              calories: currentCalories,
              days: currentDays,
            });
          }

          if (tab === "summary") {
            navigation.navigate("summary");
          }
        }}
        tabs={tabs}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: COLORS.background,
  },

  listContent: {
    paddingHorizontal: SPACING.md,

    paddingTop: 8,

    paddingBottom: 220,
  },

  metricsRow: {
    flexDirection: "row",

    gap: 12,

    marginBottom: 18,
  },

  metricCard: {
    flex: 1,

    backgroundColor: COLORS.surface,

    borderRadius: 24,

    paddingVertical: 18,

    alignItems: "center",

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 6,
    },

    shadowOpacity: 0.04,

    shadowRadius: 12,

    elevation: 3,
  },

  metricValue: {
    fontSize: 22,

    fontWeight: "700",

    color: COLORS.text,

    marginBottom: 4,
  },

  metricLabel: {
    fontSize: 13,

    color: COLORS.textMuted,

    fontWeight: "600",
  },

  noticeCard: {
    backgroundColor: COLORS.primarySoft,

    borderRadius: 24,

    padding: 18,

    marginBottom: 22,
  },

  noticeText: {
    color: COLORS.primaryDark,

    fontSize: 15,

    lineHeight: 24,

    fontWeight: "600",
  },

  buttonWrapper: {
    position: "absolute",

    left: 16,

    right: 16,

    bottom: 92,
  },
});
