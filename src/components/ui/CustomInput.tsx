import { EyeIcon } from "@assets/svg/EyeIcon";
import { EyeOffIcon } from "@assets/svg/EyeOffIcon";
import { InputProps } from "@components/types/componentsTypes";
import { useState, useEffect, useRef } from "react";
import { TextInput, View, Animated, Platform, Pressable } from "react-native";

export const CustomInput: React.FC<InputProps> = ({
  placeholder,
  value,
  keyboardType = "default",
  onChangeText,
  color,
  error,
  readOnly,
  secureTextEntry = false,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isFocused || value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  const labelStyle = {
    position: "absolute" as const,
    left: 16,
    top: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [20, 4],
    }),
    fontSize: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 10],
    }),
    fontWeight: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["400", "600"],
    }),
    color: "#8F94A3",
  };

  return (
    <View
      className={`relative w-full bg-white rounded-2xl p-4 shadow-sm border ${
        error ? "border-borderRed" : "border-primaryBg"
      } mt-4 flex-row items-center`}
    >
      <Animated.Text style={labelStyle}>{placeholder}</Animated.Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`flex-1 text-black text-base ${
          Platform.OS === "ios" ? "py-0.5" : "py-1"
        }`}
        keyboardType={keyboardType}
        editable={!readOnly}
        autoCapitalize="none"
        secureTextEntry={secureTextEntry && !showPassword}
        {...props}
      />
      {secureTextEntry && isFocused && (
        <Pressable onPress={() => setShowPassword((prev) => !prev)}>
          {showPassword ? <EyeOffIcon /> : <EyeIcon />}
        </Pressable>
      )}
    </View>
  );
};
