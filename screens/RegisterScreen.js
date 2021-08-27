import React, { useState, useEffect, useLayoutEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView } from "react-native";
import { StyleSheet, View } from "react-native";
import { Button, Input, Text, Icon } from "react-native-elements/";
import * as ImagePicker from "expo-image-picker";

const register = () => {};

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
        <Input placeholder="full Name" type="text" value={register.fullName} />
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
        onPress={() => register()}
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
