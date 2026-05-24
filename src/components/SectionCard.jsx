import React, { useContext } from "react";

import { StyleSheet, Text, View } from "react-native";

import { COLORS, RADII, SHADOW, SPACING, TYPOGRAPHY } from "../constants/theme";

import { ThemeContext } from "../context/ThemeContext";

export default function SectionCard({ title, children }) {
  const { theme } = useContext(ThemeContext);

  const surfaceColor = theme === "light" ? COLORS.surface : COLORS.darkSurface;

  const textColor = theme === "light" ? COLORS.primary : COLORS.darkText;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: surfaceColor,
        },
      ]}
    >
      <Text
        style={[
          styles.title,
          {
            color: textColor,
          },
        ]}
      >
        {title}
      </Text>

      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: RADII.lg,

    padding: SPACING.md,

    ...SHADOW,
  },

  title: {
    fontSize: TYPOGRAPHY.caption,

    fontWeight: "700",

    textTransform: "uppercase",

    letterSpacing: 1,

    marginBottom: SPACING.md,
  },

  content: {
    gap: SPACING.sm,
  },
});
