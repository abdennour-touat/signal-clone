import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import LoginScreeen from "./screens/LoginScreeen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from './screens/HomeScreen'
import AddChatScreen from "./screens/AddChatScreen";

const Stack = createStackNavigator();

const globalScreenOptions = {
  headerStyle: { backgroundColor: "#2c6bed" },
  headerTitleStyle: { color: "white"},
  headerTintColor: "white",
  headerTitleAlign: "left",
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='LoginScreen' screenOptions={globalScreenOptions}>
        <Stack.Screen
          options={{
            title: "Login",
          }}
          name="LoginScreen"
          component={LoginScreeen}
        />
        <Stack.Screen
          options={{
            title: "Register",
          }}
          name="RegisterScreen"
          component={RegisterScreen}
        />
         <Stack.Screen
          options={{
            title: "Home",
          }}
          name="HomeScreen"
          component={HomeScreen}
        />
        <Stack.Screen
          options={{
            title: "create new Chat",
          }}
          name="AddChat"
          component={AddChatScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
