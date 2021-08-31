import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, KeyboardAvoidingView } from "react-native";
import { Button, Input, Image, Text } from "react-native-elements/";
import { auth, storage } from "../firebase";

const LoginScreeen = ({ navigation }) => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace("HomeScreen");
      }
      setMounted(true);
    });
    return () => {
      unsub();
    };
  }, []);

  const signIn = async () => {
    try {
      const authUser = await auth.signInWithEmailAndPassword(login.email, login.password)
      console.log(authUser)
    } catch (error) {
      alert(error)
    }
   
  };
  if (mounted) {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <StatusBar style="dark" />
        <Image
          source={{
            uri: "https://play-lh.googleusercontent.com/jCln_XT8Ruzp7loH1S6yM-ZzzpLP1kZ3CCdXVEo0tP2w5HNtWQds6lo6aLxLIjiW_X8",
          }}
          style={{
            width: 200,
            height: 200,
            borderRadius: 15,
            marginBottom: 25,
          }}
        />
        <View style={styles.inputContainer}>
          <Input
            placeholder="Email"
            S
            type="email"
            value={login.email}
            onChangeText={(email) => setLogin({ ...login, email })}
          />
          <Input
            placeholder="Password"
            secureTextEntry
            type="password"
            value={login.password}
            onChangeText={(password) => setLogin({ ...login, password })}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <Button
            containerStyle={styles.button}
            onPress={() => signIn()}
            title="Login"
          />
          <Button
            containerStyle={styles.button}
            onPress={() => navigation.navigate("RegisterScreen")}
            type="outline"
            title="Register"
          />
        </View>
      </KeyboardAvoidingView>
    );
  } else {
    return (
      <Text h1 containerStyle={{ textAlign: "center" }}>
        Wait
      </Text>
    );
  }
};

export default LoginScreeen;

const styles = StyleSheet.create({
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
});
