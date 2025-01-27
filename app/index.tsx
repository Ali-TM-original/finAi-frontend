import * as WebBrowser from "expo-web-browser";
import { useEffect } from "react";
import { View } from "react-native";
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
  return (
    <View style={{ flex: 1 }}>
      <AnimatedIntro />
      <BottomLoginSheet />
    </View>
  );
};

export default index;
