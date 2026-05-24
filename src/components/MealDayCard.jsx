import { Dimensions, Image, StyleSheet, Text, View } from "react-native";

import { COLORS, SHADOW } from "../constants/theme";

const { width } = Dimensions.get("window");

const mealImages = {
  Breakfast: "https://images.unsplash.com/photo-1490645935967-10de6ba17061",

  Lunch: "https://images.unsplash.com/photo-1547592180-85f173990554",

  Dinner: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
};

export default function MealDayCard({ meals, title }) {
  return (
    <View style={styles.dayContainer}>
      <Text style={styles.dayTitle}>{title}</Text>

      {meals.map((meal, index) => (
        <View key={index} style={styles.card}>
          <Image
            source={{
              uri:
                mealImages[meal.type] ||
                "https://images.unsplash.com/photo-1490645935967-10de6ba17061",
            }}
            style={styles.image}
          />

          <View style={styles.content}>
            <Text style={styles.imageType}>{meal.type}</Text>

            <Text style={styles.imageTitle}>{meal.name}</Text>

            <View style={styles.infoRow}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{meal.kcal} kcal</Text>
              </View>

              <Text style={styles.grams}>{meal.grams} g</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  dayContainer: {
    marginBottom: 28,
  },

  dayTitle: {
    fontSize: 28,

    fontWeight: "700",

    color: COLORS.text,

    marginBottom: 18,
  },

  card: {
    flexDirection: "row",

    alignItems: "center",

    backgroundColor: COLORS.surface,

    borderRadius: 28,

    marginBottom: 16,

    padding: 14,

    ...SHADOW,
  },

  image: {
    width: 92,

    height: 92,

    borderRadius: 22,
  },

  content: {
    flex: 1,

    justifyContent: "center",

    marginLeft: 16,
  },

  imageType: {
    color: COLORS.primaryDark,

    fontSize: 12,

    fontWeight: "700",

    marginBottom: 6,
  },

  imageTitle: {
    color: COLORS.text,

    fontSize: 18,

    lineHeight: 24,

    fontWeight: "700",

    marginBottom: 14,
  },

  infoRow: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",
  },

  badge: {
    backgroundColor: COLORS.primarySoft,

    borderRadius: 999,

    paddingHorizontal: 14,

    paddingVertical: 8,
  },

  badgeText: {
    color: COLORS.primaryDark,

    fontSize: 12,

    fontWeight: "700",
  },

  grams: {
    fontSize: 14,

    color: COLORS.textMuted,

    fontWeight: "600",
  },
});
