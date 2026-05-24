import React from "react";

import { View, Text, StyleSheet, Image, ScrollView } from "react-native";

import AppStatusBar from "../components/AppStatusBar";
import ScreenHeader from "../components/ScreenHeader";

import { COLORS, SPACING } from "../constants/theme";

export default function MealDetailsScreen({ route }) {
  const meal = route?.params?.meal;

  if (!meal) {
    return (
      <View style={styles.center}>
        <Text>No meal data</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AppStatusBar />

      <ScreenHeader title={meal.strMeal} />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Image source={{ uri: meal.strMealThumb }} style={styles.image} />

        <View style={styles.badge}>
          <Text style={styles.badgeText}>{meal.strCategory}</Text>
        </View>

        <Text style={styles.sectionTitle}>Instructions</Text>

        <Text style={styles.instructions}>{meal.strInstructions}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  content: {
    padding: SPACING.md,
    paddingBottom: 80,
  },

  image: {
    width: "100%",
    height: 260,
    borderRadius: 28,
    marginBottom: 20,
  },

  badge: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.primarySoft,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 999,
    marginBottom: 24,
  },

  badgeText: {
    color: COLORS.primaryDark,
    fontWeight: "700",
    fontSize: 14,
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 14,
  },

  instructions: {
    fontSize: 16,
    lineHeight: 28,
    color: COLORS.textMuted,
  },
});
