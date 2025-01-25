import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React from "react";
import { defaultStyles } from "@/constants/styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "@/constants/Colors";
import SocialLoginButton from "@/components/SocialLoginButton";

import { useUser } from "@clerk/clerk-react";

const BottomLoginSheet = () => {
  const insets = useSafeAreaInsets(); // Get the safe area insets
  const { isSignedIn, user } = useUser();
  return (
    <SafeAreaView style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View style={[defaultStyles.btn, styles.btnLight]}>
        <Text style={styles.btnLightText}>Login To Continue</Text>
      </View>
      <View style={styles.divider} />
      <SocialLoginButton strategy="facebook" />
      <SocialLoginButton strategy="google" />
      <SocialLoginButton strategy="apple" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#000",
    padding: 26,
    gap: 14,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  divider: {
    height: 2,
    backgroundColor: "#fff",
    marginVertical: 8,
    borderRadius: 10,
  },
  btnLight: {
    backgroundColor: "#fff",
  },

  btnDark: {
    backgroundColor: Colors.grey,
    marginBottom: 10,
  },
  btnIcon: {
    paddingRight: 6,
  },
  btnLightText: {
    fontSize: 20,
  },
  btnDarkText: {
    color: "#fff",
    fontSize: 20,
  },
  btnOutline: {
    borderWidth: 3,
    borderColor: Colors.grey,
  },
});

export default BottomLoginSheet;
