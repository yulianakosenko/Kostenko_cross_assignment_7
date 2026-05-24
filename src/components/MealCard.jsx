import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const MealCard = ({ title, image, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />

      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: 180,
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
    padding: 16,
  },
});

export default MealCard;
