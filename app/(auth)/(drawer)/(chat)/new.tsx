import {
  View,
  Text,
  Image,
  Button,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Keyboard,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-expo";
import MessageInput from "@/components/messageInput";
import { defaultStyles } from "@/constants/styles";
import Suggestions from "@/components/Suggestions";
import { Role } from "@/utils/interfaces";
import ChatMessage from "@/components/ChatMessage";

const dummyMessages = [
  {
    id: "1",
    content: "This is a really good content",
    role: Role.User,
  },
  {
    id: "2",
    content: "This is a really good content",
    role: Role.Bot,
  },
  {
    id: "3",
    content: "This is a really good content",
    role: Role.User,
  },
  {
    id: "4",
    content: "This is a really good content",
    role: Role.Bot,
  },
];

const Page = () => {
  const { signOut } = useAuth();
  const [messages, setMessages] = useState<any[]>(dummyMessages);
  const [height, setHeight] = useState(0);

  const onLayout = (event: any) => {
    const { height } = event.nativeEvent.layout;
    console.log("Height of the page: ", height);
    setHeight(height);
  };

  const getCompletion = async (message: string) => {
    console.log("Getting completion for: ", message);
  };

  return (
    <View style={defaultStyles.pageContainer}>
      <View style={styles.page} onLayout={onLayout}>
        {/* <Button title="Sign Out" onPress={() => signOut()} /> */}
        {/* <ScrollView>
          {Array.from({ length: 100 }).map((_, index) => (
            <Text key={index}>1</Text>
          ))}
        </ScrollView> */}
        {messages.length == 0 && (
          <View style={[styles.logoContainer, { marginTop: height / 2 - 100 }]}>
            <Image
              source={require("@/assets/images/icon.png")}
              style={styles.image}
            />
          </View>
        )}
        <FlashList
          data={messages}
          renderItem={({ item }) => <ChatMessage {...item} />}
          estimatedItemSize={messages.length}
          contentContainerStyle={{ paddingTop: 30, paddingBottom: 150 }}
          keyboardDismissMode="on-drag"
        />
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
        {messages.length === 0 && (
          <Suggestions onSelectMessage={getCompletion} />
        )}
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

export default Page;
