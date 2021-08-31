import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Input } from "react-native-elements/dist/";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { db } from "../firebase";

const AddChatScreen = ({ navigation }) => {
  const [input, setInput] = useState("");
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add new Chat",
      headerBackTitle: "chats",
    });
    
  }, [navigation]);

  const createChat = async ()=>{
      try {
          await db.collection('chat').add({
              chatName : input
          })
          navigation.goBack();
          
      } catch (error) {
          alert(error)
      }
  }
  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter the Chat name:"
        value={input}
        onChangeText={(input) => setInput(input)}
        onSubmitEditing={()=>createChat()}
        leftIcon={
          <Icon name="wechat" type="antdesign" size={24} color="black" />
        }
      />
      <Button onPress={() => createChat()} title="Create new Chat" />
    </View>
  );
};

export default AddChatScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 30,
        height: '100%'
    }
});
