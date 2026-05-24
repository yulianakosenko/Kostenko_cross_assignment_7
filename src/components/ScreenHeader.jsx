import React, { useContext } from "react";

import {
Platform,
View,
Text,
StyleSheet,
} from "react-native";

import { COLORS } from "../constants/theme";

import { ThemeContext } from "../context/ThemeContext";

export default function ScreenHeader({
title,
subtitle,
}) {
const { theme } = useContext(ThemeContext);

const titleColor =
theme === "light"
? "#07162E"
: COLORS.darkText;

const subtitleColor =
theme === "light"
? COLORS.textMuted
: "#94A3B8";

return ( <View style={styles.container}>
<Text
style={[
styles.subtitle,
{
color: subtitleColor,
},
]}
>
{subtitle} </Text>

  <Text
    style={[
      styles.title,
      {
        color: titleColor,
      },
    ]}
  >
    {title}
  </Text>
</View>

);
}

const styles = StyleSheet.create({
container: {
paddingTop: Platform.select({
ios: 20,
android: 10,
}),

paddingHorizontal: 24,

paddingBottom: 18,

},

subtitle: {
fontSize: 15,

marginBottom: 8,

fontWeight: "500",

},

title: {
fontSize: 34,

lineHeight: 38,

fontWeight: "800",

letterSpacing: -1.5,


},
});
