import {
  View,
  Text,
  Button,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import React from "react";
import { useAuth } from "@clerk/clerk-expo";
import MessageInput from "@/components/messageInput";
import { defaultStyles } from "@/constants/styles";

const index = () => {
  const { signOut } = useAuth();

  const getCompletion = async (message: string) => {
    console.log("Getting completion for: ", message);
  };

  return (
    <View style={defaultStyles.pageContainer}>
      <View style={{ flex: 1 }}>
        <Text>Dummy COntent</Text>
        <Button title="Sign Out" onPress={() => signOut()} />
        <ScrollView>
          {Array.from({ length: 100 }).map((_, index) => (
            <Text key={index}>1</Text>
          ))}
        </ScrollView>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={70}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
        }}
      >
        <MessageInput onShouldSendMessage={getCompletion} />
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    backgroundColor: "#000",
    borderRadius: 50,
  },
  image: {
    width: 30,
    height: 30,
    resizeMode: "cover",
  },
  page: {
    flex: 1,
  },
});

export default index;
