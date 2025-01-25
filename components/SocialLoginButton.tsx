import { useOAuth, useUser, useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import * as Linking from "expo-linking";
import { defaultStyles } from "@/constants/styles";
import React, { useState } from "react";

const SocialLoginButton = ({
  strategy,
}: {
  strategy: "facebook" | "google" | "apple";
}) => {
  const { isSignedIn } = useAuth();
  const getStrategy = () => {
    if (strategy === "facebook") {
      return "oauth_facebook";
    } else if (strategy === "google") {
      return "oauth_google";
    } else if (strategy === "apple") {
      return "oauth_apple";
    }
    return "oauth_facebook";
  };

  const { startOAuthFlow } = useOAuth({ strategy: getStrategy() });
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const buttonText = () => {
    if (isLoading) {
      return "Loading...";
    }

    if (strategy === "facebook") {
      return "Continue with Facebook";
    } else if (strategy === "google") {
      return "Continue with Google";
    } else if (strategy === "apple") {
      return "Continue with Apple";
    }
  };

  const buttonIcon = () => {
    if (strategy === "facebook") {
      return (
        <Ionicons
          name="logo-facebook"
          size={24}
          color="#1977F3"
          style={styles.btnIcon}
        />
      );
    } else if (strategy === "google") {
      return (
        <Ionicons
          name="logo-google"
          size={24}
          color="#DB4437"
          style={styles.btnIcon}
        />
      );
    } else if (strategy === "apple") {
      return (
        <Ionicons
          name="logo-apple"
          size={24}
          color="black"
          style={styles.btnIcon}
        />
      );
    }
  };

  const onSocialLoginPress = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const { createdSessionId, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL("/"),
      });

      // If sign in was successful, set the active session and reload user info
      if (createdSessionId) {
        console.log("Session created", createdSessionId);
        setActive!({ session: createdSessionId });
        await user?.reload(); // This line is added to reload user info
      } else {
        // Use signIn or signUp returned from startOAuthFlow
        // for next steps, such as MFA
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setIsLoading(false);
    }
  }, []);
  return (
    <TouchableOpacity
      style={[defaultStyles.btn, styles.btnLight]}
      disabled={isSignedIn ? true : isLoading}
      onPress={onSocialLoginPress}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color="black" />
      ) : (
        buttonIcon()
      )}
      <Text style={[styles.btnLightText]}>{buttonText()}</Text>
    </TouchableOpacity>
  );
};

export default SocialLoginButton;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderColor: "gray",
    borderWidth: StyleSheet.hairlineWidth,
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "medium",
  },
  btnIcon: {
    paddingRight: 6,
  },
  btnLight: {
    backgroundColor: "#fff",
  },
  btnLightText: {
    fontSize: 20,
  },
});
