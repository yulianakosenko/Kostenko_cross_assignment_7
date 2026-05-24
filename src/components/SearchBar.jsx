import React, { useContext } from "react";

import {
View,
TextInput,
StyleSheet,
} from "react-native";

import { Search } from "lucide-react-native";

import { COLORS } from "../constants/theme";

import { ThemeContext } from "../context/ThemeContext";

export default function SearchBar({
value,
onChangeText,
}) {
const { theme } = useContext(ThemeContext);

return (
<View
style={[
styles.container,
{
backgroundColor:
theme === "light"
? COLORS.surface
: COLORS.darkSurface,
},
]}
> <Search
     size={18}
     color={COLORS.textMuted}
   />


  <TextInput
    value={value}
    onChangeText={onChangeText}
    placeholder="Search healthy meals"
    placeholderTextColor={COLORS.textMuted}
    selectionColor={COLORS.primary}
    cursorColor={COLORS.primary}
    underlineColorAndroid="transparent"
    style={[
      styles.input,
      {
        color:
          theme === "light"
            ? COLORS.text
            : COLORS.darkText,
      },
    ]}
  />
</View>

);
}

const styles = StyleSheet.create({
container: {
flexDirection: "row",


alignItems: "center",

borderRadius: 18,

paddingHorizontal: 18,

height: 56,

marginBottom: 18,


},

input: {
flex: 1,


marginLeft: 12,

fontSize: 15,

outlineStyle: "none",


},
});
