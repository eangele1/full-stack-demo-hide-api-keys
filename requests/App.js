import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Landing from "./components/Landing";
import Results from "./components/Results";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen
          name="Landing"
          options={{ headerShown: false }}
          component={Landing}
        />
        <Stack.Screen
          name="Results"
          options={{
            title: "",
            headerTintColor: "white",
            headerStyle: { backgroundColor: "#B43304" },
          }}
          component={Results}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
