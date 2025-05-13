import { OnboardingCard } from "@components/OnboardingCard";
import { AppNavigationProp } from "@navigation/types/navigationTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Image, Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const OnboardingScreen = () => {
  const navigation = useNavigation<AppNavigationProp>();
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      const hasLaunched = await AsyncStorage.getItem("hasLaunched");
      if (hasLaunched) {
        setIsFirstLaunch(false);
      } else {
        await AsyncStorage.setItem("hasLaunched", "true");
      }
    };

    checkFirstLaunch();
  }, []);

  const handleSignUpScreen = () => {
    navigation.navigate("SignUpScreen");
  };

  useEffect(() => {
    if (!isFirstLaunch) {
      handleSignUpScreen();
    }
  }, [isFirstLaunch, navigation]);

  return (
    <SafeAreaView
      className="flex-1 items-center justify-center bg-primaryBg"
      edges={["top", "bottom"]}
    >
      <StatusBar style="auto" />
      <Pressable
        className="bg-secondaryBg rounded-full py-2 px-4 self-end mr-4"
        onPress={handleSignUpScreen}
      >
        <Text className="text-sm font-medium text-blackText">Skip</Text>
      </Pressable>
      <Image
        source={require("@assets/onboarding-image.png")}
        className="mx-auto items-center justify-center w-full"
      />
      <OnboardingCard handleNextStep={handleSignUpScreen} />
    </SafeAreaView>
  );
};
