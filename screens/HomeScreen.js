import React, { useLayoutEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
} from "react-native";
import CustomListItem from "../components/CustomListItem";
import { Avatar } from "react-native-elements/dist/avatar/Avatar";
import { auth, storage } from "../firebase";

const HomeScreen = ({ navigation }) => {
  const [img, setImg] = useState("");
  storage
    .ref(`users/${auth.currentUser.uid}/profileImage`)
    .getDownloadURL()
    .then((imgURl) => {
      setImg(imgURl);
    });
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "messages",
      headerStyle: {
        backgroundColor: "white",
      },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <TouchableOpacity />
          <Avatar
            rounded
            source={{
              uri: img,
            }}
          />
          <Text style={{ color: "white" }}>{auth.currentUser.displayName}</Text>
        </View>
      ),
    });
  }, []);
  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView>
        <CustomListItem />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
