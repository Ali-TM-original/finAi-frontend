import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Colors from "@/constants/Colors";

const exampleSuggestions = [
  { title: "Something", text: "Some Cool Description" },
  { title: "Something", text: "Some Cool Description" },
  { title: "Something", text: "Some Cool Description" },
];

type Props = {
  onSelectMessage: (message: string) => void;
};

const Suggestions = ({ onSelectMessage }: Props) => {
  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          gap: 16,
          paddingVertical: 10,
        }}
      >
        {exampleSuggestions.map((message, index) => (
          <TouchableOpacity
            style={styles.card}
            key={index}
            onPress={() => onSelectMessage(`${message.title} ${message.text}`)}
          >
            <Text style={{ fontSize: 16, fontWeight: "500" }}>
              {message.title}
            </Text>
            <Text style={{ fontSize: 14, color: Colors.grey }}>
              {message.text}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.input,
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
});

export default Suggestions;
