import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { BlurView } from "expo-blur";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

const ATouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export type MessageInputProps = {
  //TODO
  onShouldSendMessage: (message: string) => void; // required
};

const MessageInput = ({ onShouldSendMessage }: MessageInputProps) => {
  const [message, setMessage] = useState("");
  const { bottom } = useSafeAreaInsets();
  const expanded = useSharedValue(0);

  const expantItems = () => {
    expanded.value = withTiming(1, { duration: 400 });
  };

  const collapseItems = () => {
    expanded.value = withTiming(0, { duration: 400 });
  };

  const onChangeText = (text: string) => {
    collapseItems();
    setMessage(text);
  };

  const onSend = () => {
    onShouldSendMessage(message);
    setMessage("");
  };

  const expandedButtonStyle = useAnimatedStyle(() => {
    return {
      opacity: expanded.value,
      transform: [{ scale: expanded.value }],
    };
  });

  const buttonViewStyle = useAnimatedStyle(() => {
    return {
      opacity: expanded.value,
    };
  });

  const capAudio = () => {};

  return (
    <BlurView
      intensity={90}
      tint="extraLight"
      style={{ paddingBottom: bottom + 10, paddingTop: 10 }}
    >
      <View style={styles.row}>
        <ATouchableOpacity
          onPress={expantItems}
          style={[styles.roundBtn, expandedButtonStyle]}
        >
          <Ionicons name="add" size={24} color={Colors.grey} />
        </ATouchableOpacity>

        <Animated.View style={[styles.buttonView, buttonViewStyle]}>
          {/* TODO */}
        </Animated.View>

        <TextInput
          autoFocus
          placeholder="Prompt"
          multiline
          value={message}
          onChangeText={setMessage}
          style={styles.messageInput}
          onFocus={collapseItems}
        />
        {message.length > 0 ? (
          <TouchableOpacity onPress={onSend}>
            <Ionicons
              name="arrow-up-circle-outline"
              size={24}
              color={Colors.grey}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={capAudio}>
            <FontAwesome5 name="headphones" size={24} color={Colors.grey} />
          </TouchableOpacity>
        )}
      </View>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  messageInput: {
    flex: 1,
    marginHorizontal: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 20,
    padding: 10,
    borderColor: Colors.greyLight,
    backgroundColor: Colors.light,
  },
  roundBtn: {
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: Colors.input,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
});

export default MessageInput;
