import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View , KeyboardAvoidingView} from "react-native";
import { Button, Input, Image } from "react-native-elements/";
import { auth, storage } from "../firebase";

const LoginScreeen = ({navigation}) => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  useEffect(()=>{
    const unsub = auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        navigation.replace('HomeScreen');
        storage.ref(`users/${authUser.uid}/profileImage}`).getDownloadURL().then(imgURl=>{
          console.log(imgURl)
        })
      }
    });
    return ()=>{
      unsub();
    }
  },[])

  const signIn = ()=>{

  }
  return (
    <KeyboardAvoidingView style={styles.container} > 
      <StatusBar style="dark" />
      <Image
        source={{
          uri: "https://play-lh.googleusercontent.com/jCln_XT8Ruzp7loH1S6yM-ZzzpLP1kZ3CCdXVEo0tP2w5HNtWQds6lo6aLxLIjiW_X8",
        }}
        style={{ width: 200, height: 200, borderRadius: 15 , marginBottom: 25}}
      />
      <View style={styles.inputContainer}>
        <Input
          placeholder="Email"
S          type="email"
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
      <View style={{marginTop: 20}}>
      <Button containerStyle={styles.button} onPress={()=>signIn()} title='Login'/>
      <Button containerStyle={styles.button} onPress={()=>navigation.navigate('RegisterScreen')} type='outline' title='Register'/>
      </View>
    </KeyboardAvoidingView>
  
  );
};

export default LoginScreeen;

const styles = StyleSheet.create({
  inputContainer: {
      width: 300, 
      
  },
  button:{
    width: 200,
    marginTop: 10
  }, 
  container:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      backgroundColor: 'white'

  }
});
