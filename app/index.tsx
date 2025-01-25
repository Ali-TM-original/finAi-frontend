import * as WebBrowser from "expo-web-browser";
import { useEffect } from "react";
import { View, Text } from "react-native";
import { useUser } from "@clerk/clerk-react";
import React from "react";
import AnimatedIntro from "@/components/AnimatedIntro";
import BottomLoginSheet from "@/components/BottomLoginSheet";

export const useWarmUpBrowser = () => {
  useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

const index = () => {
  useWarmUpBrowser();
  const { isSignedIn, user } = useUser();
  useEffect(() => {
    console.log(isSignedIn);
    console.log(user);
  }, [isSignedIn]);

  return (
    <View style={{ flex: 1 }}>
      <AnimatedIntro />
      <BottomLoginSheet />
    </View>
  );
};

export default index;
