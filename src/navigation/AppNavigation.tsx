import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MyAccountScreen } from "@screens/MyAccountScreen";
import { OnboardingScreen } from "@screens/OnboardingScreen";
import { SignUpScreen } from "@screens/SignUpScreen";

const Stack = createNativeStackNavigator();

export const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="MyAccountScreen" component={MyAccountScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
