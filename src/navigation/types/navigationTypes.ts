import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type BasicAuthCredentials = {
  password: string;
  username: string;
};

export type RootStackParamsList = {
  OnboardingScreen: undefined;
  SignUpScreen: undefined;
  MyAccountScreen: { basicAuthCredentials: BasicAuthCredentials };
};

export type AppNavigationProp = NativeStackNavigationProp<
  RootStackParamsList,
  "OnboardingScreen"
>;
