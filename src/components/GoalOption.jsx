import React, { useContext } from "react";

import {
TouchableOpacity,
Text,
StyleSheet,
} from "react-native";

import { COLORS } from "../constants/theme";

import { ThemeContext } from "../context/ThemeContext";

export default function GoalOption({
label,
active,
onPress,
}) {
const { theme } = useContext(ThemeContext);

const backgroundColor =
theme === "light"
? COLORS.surface
: COLORS.darkSurface;

const borderColor =
theme === "light"
? "rgba(0,0,0,0.05)"
: "#334155";

const textColor =
theme === "light"
? COLORS.textMuted
: COLORS.darkText;

const activeBackground =
theme === "light"
? "#E7F5EC"
: "#1E293B";

return (
<TouchableOpacity
activeOpacity={0.9}
onPress={onPress}
style={[
styles.container,


    {
      backgroundColor,

      borderColor,
    },

    active && {
      backgroundColor:
        activeBackground,

      borderColor:
        COLORS.primary,
    },
  ]}
>
  <Text
    style={[
      styles.label,

      {
        color: textColor,
      },

      active &&
        styles.activeLabel,
    ]}
  >
    {label}
  </Text>
</TouchableOpacity>


);
}

const styles = StyleSheet.create({
container: {
minWidth: 116,


height: 62,

paddingHorizontal: 24,

borderRadius: 24,

justifyContent: "center",

alignItems: "center",

borderWidth: 1,

shadowColor: "#000",

shadowOffset: {
  width: 0,
  height: 6,
},

shadowOpacity: 0.03,

shadowRadius: 14,

elevation: 3,


},

label: {
fontSize: 17,

fontWeight: "600",

},

activeLabel: {
color: COLORS.primary,
fontWeight: "700",

},
});
