import { View, Text } from "react-native";
import React from "react";
import { Message } from "@/utils/interfaces";

const ChatMessage = ({ content, role, imageUrl }: Message) => {
  return (
    <View>
      <Text>ChatMessage</Text>
    </View>
  );
};

export default ChatMessage;
