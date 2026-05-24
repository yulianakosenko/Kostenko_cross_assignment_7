import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import ProcessingScreen from "../screens/ProcessingScreen";
import SummaryScreen from "../screens/SummaryScreen";
import ShoppingScreen from "../screens/ShoppingScreen";
import HistoryScreen from "../screens/HistoryScreen";
import MealPlanScreen from "../screens/MealPlanScreen";
import MealDetailsScreen from "../screens/MealDetailsScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#F8FAF8",
          },

          headerShadowVisible: false,

          headerTintColor: "#111827",

          headerTitleStyle: {
            fontWeight: "700",
          },
        }}
      >
        <Stack.Screen
          name="home"
          component={HomeScreen}
          options={{
            title: "AI Meal Planner",
          }}
        />

        <Stack.Screen
          name="processing"
          component={ProcessingScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="summary"
          component={SummaryScreen}
          options={{
            title: "Meal Summary",
          }}
        />

        <Stack.Screen
          name="shopping"
          component={ShoppingScreen}
          options={{
            title: "Shopping List",
          }}
        />

        <Stack.Screen
          name="history"
          component={HistoryScreen}
          options={{
            title: "History",
          }}
        />

        <Stack.Screen
          name="meal"
          component={MealPlanScreen}
          options={{
            title: "Meal Plan",
          }}
        />

        <Stack.Screen
          name="mealDetails"
          component={MealDetailsScreen}
          options={{
            title: "Meal Details",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
