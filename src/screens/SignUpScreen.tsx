import { GoBackIcon } from "@assets/svg/GoBackIcon";
import { CustomInput } from "@components/ui/CustomInput";
import { AppNavigationProp } from "@navigation/types/navigationTypes";
import { useNavigation } from "@react-navigation/native";
import { Linking, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CheckBox from "react-native-elements/dist/checkbox/CheckBox";
import { useState } from "react";
import { CustomButton } from "@components/ui/CustomButton";
import { Controller, useForm } from "react-hook-form";
import { SignUpFormData, signUpSchema } from "@utils/zod/validationSchemes";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

export const SignUpScreen = () => {
  const navigation = useNavigation<AppNavigationProp>();
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignUpFormData) => {
    setIsLoading(true);
    try {
      const signUpData = {
        name: data.username,
        email: data.email,
        password: data.password,
      };

      const response = await axios.post(
        "https://artjoms-spole.fly.dev/signup",
        signUpData
      );

      if (response.data.message === "User signup successful!") {
        navigation.navigate("MyAccountScreen", {
          basicAuthCredentials: response.data.basicAuthCredentials,
        });
      } else {
        console.error("Error:", response.data.message);
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView
      className="flex-1 bg-primaryBg px-4"
      edges={["top", "bottom"]}
    >
      <Pressable
        onPress={() => navigation.goBack()}
        className="self-start rounded-full py-2 px-2.5 bg-secondaryBg"
      >
        <GoBackIcon />
      </Pressable>
      <View className="flex-1 mt-11">
        <Text className="text-3xl font-bold text-primaryColor">
          Create account
        </Text>
        <Text className="text-base font-medium text-secondaryColor mt-2">
          Complete the sign up to get started
        </Text>
        <View className="flex-1 mt-4">
          <Controller
            control={control}
            name="username"
            render={({ field: { onChange, value } }) => (
              <CustomInput
                placeholder="Name"
                value={value}
                onChangeText={onChange}
                error={!!errors.username}
              />
            )}
          />
          {errors.username && (
            <Text className="text-sm text-redText m-1">
              {errors.username.message}
            </Text>
          )}
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <CustomInput
                placeholder="Email"
                value={value}
                onChangeText={onChange}
                error={!!errors.email}
              />
            )}
          />
          {errors.email && (
            <Text className="text-sm text-redText m-1">
              {errors.email.message}
            </Text>
          )}
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <CustomInput
                placeholder="Password"
                value={value}
                onChangeText={onChange}
                secureTextEntry
                error={!!errors.password}
              />
            )}
          />
          {errors.password && (
            <Text className="text-sm text-redText m-1">
              {errors.password.message}
            </Text>
          )}
          <View className="flex-row items-start mt-4">
            <CheckBox
              checked={isChecked}
              checkedIcon="checkbox-marked"
              iconType="material-community"
              uncheckedIcon="checkbox-blank-outline"
              onPress={() => setIsChecked((prev) => !prev)}
              checkedColor="#2C14DD"
              uncheckedColor="#DFDCF0"
              containerStyle={{
                marginTop: 2,
                marginLeft: 0,
                padding: 0,
                backgroundColor: "transparent",
                borderColor: "transparent",
              }}
            />
            <View className="flex-1">
              <Text className="text-blackText text-base">
                By signing up, you agree to the{" "}
                <Text
                  className="text-primaryColor"
                  onPress={() =>
                    Linking.openURL("https://example.com/terms-and-privacy")
                  }
                >
                  Terms of Service and Privacy Policy
                </Text>
              </Text>
            </View>
          </View>
        </View>
        <View className="items-center justify-center">
          <Text>
            Already have an account?{" "}
            <Text
              className="text-primaryColor"
              onPress={() => Linking.openURL("https://example.com/sign-in")}
            >
              Sign in
            </Text>
          </Text>
          <CustomButton
            title="Create account"
            onPress={handleSubmit(onSubmit)}
            disabled={!isChecked || isLoading}
            loading={isLoading}
            style="w-full bg-primaryColor p-4 rounded-full mt-8"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
