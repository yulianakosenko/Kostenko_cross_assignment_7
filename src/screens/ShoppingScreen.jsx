import React, { useContext, useEffect } from "react";

import {
ScrollView,
StyleSheet,
Text,
View,
TouchableOpacity,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";

import AppStatusBar from "../components/AppStatusBar";
import BottomTabBar from "../components/BottomTabBar";
import PrimaryButton from "../components/PrimaryButton";
import ScreenHeader from "../components/ScreenHeader";

import {
COLORS,
SHADOW,
SPACING,
} from "../constants/theme";

import { tabs } from "../data/mockData";

import {
addItem,
toggleChecked,
} from "../redux/shoppingSlice";

import { ThemeContext } from "../context/ThemeContext";

export default function ShoppingScreen({
navigation,
}) {
const dispatch = useDispatch();

const products = useSelector(
(state) => state.shopping,
);

const { theme } = useContext(ThemeContext);

const backgroundColor =
theme === "light"
? COLORS.background
: COLORS.darkBackground;

const cardColor =
theme === "light"
? COLORS.surface
: COLORS.darkSurface;

const textColor =
theme === "light"
? COLORS.text
: COLORS.darkText;

useEffect(() => {
if (products.length === 0) {
dispatch(
addItem({
id: 1,
name: "Chicken Breast",
amount: "800 g",
price: "€8.50",
}),
);

  dispatch(
    addItem({
      id: 2,
      name: "Avocado",
      amount: "4 pcs",
      price: "€5.20",
    }),
  );

  dispatch(
    addItem({
      id: 3,
      name: "Greek Yogurt",
      amount: "1 kg",
      price: "€4.90",
    }),
  );

  dispatch(
    addItem({
      id: 4,
      name: "Brown Rice",
      amount: "2 kg",
      price: "€6.10",
    }),
  );
}


}, []);

const allCompleted = products.every(
(item) => item.checked,
);

return (
<View
style={[
styles.container,
{
backgroundColor,
},
]}
> <AppStatusBar />

```
  <ScreenHeader title="Shopping List" />

  <ScrollView
    contentContainerStyle={
      styles.scrollContent
    }
    showsVerticalScrollIndicator={
      false
    }
  >
    <View
      style={[
        styles.summaryCard,
        {
          backgroundColor:
            theme === "light"
              ? COLORS.primarySoft
              : "#1E293B",
        },
      ]}
    >
      <Text
        style={[
          styles.summaryTitle,
          {
            color: textColor,
          },
        ]}
      >
        Weekly Budget
      </Text>

      <Text
        style={[
          styles.summaryPrice,
          {
            color: COLORS.primary,
          },
        ]}
      >
        €24.70
      </Text>

      <Text
        style={[
          styles.summarySubtitle,
          {
            color: textColor,
          },
        ]}
      >
        Healthy groceries for your
        personalized meal plan
      </Text>
    </View>

    {products.map((item) => (
      <View
        key={item.id}
        style={[
          styles.card,
          {
            backgroundColor:
              cardColor,
          },
        ]}
      >
        <View style={styles.left}>
          <TouchableOpacity
            onPress={() =>
              dispatch(
                toggleChecked(
                  item.id,
                ),
              )
            }
            style={[
              styles.checkbox,

              item.checked &&
                styles.checkboxActive,
            ]}
          >
            {item.checked && (
              <Text style={styles.check}>
                ✓
              </Text>
            )}
          </TouchableOpacity>

          <View>
            <Text
              style={[
                styles.name,
                {
                  color: textColor,
                },
              ]}
            >
              {item.name}
            </Text>

            <Text
              style={styles.amount}
            >
              {item.amount}
            </Text>
          </View>
        </View>

        <Text style={styles.price}>
          {item.price}
        </Text>
      </View>
    ))}

    {allCompleted && (
      <View
        style={
          styles.completedBox
        }
      >
        <Text
          style={
            styles.completedText
          }
        >
          ✅ Shopping Completed
        </Text>
      </View>
    )}

    <View
      style={styles.buttonSection}
    >
      <PrimaryButton
        title="Open Summary"
        onPress={() =>
          navigation.navigate(
            "summary",
          )
        }
      />
    </View>
  </ScrollView>

  <BottomTabBar
    activeTab="shopping"
    onTabPress={(tab) => {
      if (tab === "home") {
        navigation.navigate("home");
      }

      if (tab === "shopping") {
        navigation.navigate(
          "shopping",
        );
      }

      if (tab === "history") {
        navigation.navigate(
          "history",
        );
      }

      if (tab === "meal") {
        navigation.navigate("meal");
      }

      if (tab === "summary") {
        navigation.navigate(
          "summary",
        );
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
},

scrollContent: {
paddingHorizontal: SPACING.md,
paddingTop: SPACING.sm,

paddingBottom: 160,

},

summaryCard: {
borderRadius: SPACING.xl,

padding: SPACING.xl,

marginBottom: SPACING.lg,

},

summaryTitle: {
fontSize: 16,

marginBottom: SPACING.sm,

},

summaryPrice: {
fontSize: 44,

fontWeight: "700",

marginBottom: SPACING.sm,
},

summarySubtitle: {
fontSize: 15,

lineHeight: 24,

},

card: {
borderRadius: SPACING.xl,

padding: SPACING.lg,

marginBottom: SPACING.md,

flexDirection: "row",

justifyContent: "space-between",

alignItems: "center",

...SHADOW,

},

left: {
flexDirection: "row",

alignItems: "center",

gap: SPACING.md,

},

checkbox: {
width: 26,

height: 26,

borderRadius: 999,

borderWidth: 2,

borderColor: COLORS.primary,
},

checkboxActive: {
backgroundColor: COLORS.primary,
justifyContent: "center",

alignItems: "center",

},

check: {
color: "#fff",

fontWeight: "700",

},

name: {
fontSize: 17,

fontWeight: "600",

marginBottom: 4,

},

amount: {
fontSize: 14,

color: COLORS.textMuted,

},

price: {
fontSize: 16,

fontWeight: "700",

color: COLORS.primary,

},

completedBox: {
backgroundColor: COLORS.primarySoft,

padding: 18,

borderRadius: 20,

alignItems: "center",

marginTop: 10,

marginBottom: 20,

},

completedText: {
fontSize: 16,

fontWeight: "700",

color: COLORS.primaryDark,

},

buttonSection: {
marginTop: 10,

marginBottom: 40,


},
});
