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
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import { Button } from "react-native";

const HomeScreen = ({ navigation }) => {
  const [img, setImg] = useState("");
  storage
    .ref(`users/${auth.currentUser?.uid}/profileImage`)
    .getDownloadURL()
    .then((imgURl) => {
      setImg(imgURl);
    });
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "signal",
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
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 80,
            marginRight: 20,
          }}
        >
          <TouchableOpacity activeOpacity={0.5}>
            <AntDesign name="camerao" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{ navigation.navigate('AddChat')}} activeOpacity={0.5}>
            <SimpleLineIcons name="pencil" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);
  const logOut = async() =>{
    try {
      await auth.signOut();
      navigation.navigate('LoginScreen')
      
    } catch (error) {
      alert(error)
    }
  }
  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView>
        <CustomListItem />
      </ScrollView>
      <Button title = 'logout'onPress={()=>logOut()}></Button>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
