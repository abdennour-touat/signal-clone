import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView } from "react-native";
import { StyleSheet, View } from "react-native";
import { Button, Input, Text, Icon } from "react-native-elements/";
import * as ImagePicker from "expo-image-picker";
import { storage, auth, db } from "../firebase";

const RegisterScreen = ({ navigation }) => {
  const [register, setRegister] = useState({
    fullName: "",
    password: "",
    email: "",
    image: null,
  });

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setRegister({ ...register, image: result.uri });
    }
  };

  const Login = async () => {
    try {
      const authUser = await auth.createUserWithEmailAndPassword(
        register.email,
        register.password
      );

      authUser.user
        .updateProfile({
          displayName: register.fullName,
        })
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });

      const uri = register.image;
      const response = await fetch(uri);
      const blob = await response.blob();
      const result = await storage
        .ref(`users/${authUser.user.uid}/profileImage`)
        .put(blob);

      setRegister({
        fullName: "",
        email: "",
        password: "",
        image: null,
      });
    } catch (error) {
      alert(error);
    }
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar style="light" />

      <Text h3 style={{ marginBottom: 50 }}>
        Create signal account
      </Text>
      <View style={styles.inputContainer}>
        <Input
          placeholder="full Name"
          type="text"
          value={register.fullName}
          onChangeText={(fullName) => setRegister({ ...register, fullName })}
        />
        <Input
          placeholder="email"
          type="text"
          value={register.email}
          onChangeText={(email) => setRegister({ ...register, email })}
        />
        <Input
          placeholder="password"
          secureTextEntry
          type="text"
          value={register.password}
          onChangeText={(password) => setRegister({ ...register, password })}
        />
        <Button
          containerStyle={{ backgroundColor: "red" }}
          title="set Profile Image"
          onPress={() => pickImage()}
        ></Button>
      </View>
      <Button
        containerStyle={styles.button}
        raised
        title="Register"
        onPress={() => Login()}
        icon={<Icon name="done" size={15} color="white" />}
      ></Button>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    color: "red",
    marginTop: 50,
  },
});
