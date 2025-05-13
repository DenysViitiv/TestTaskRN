import { ButtonProps } from "@components/types/componentsTypes";
import { Text, ActivityIndicator, View, TouchableOpacity } from "react-native";

export const CustomButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  style = "",
  loading = false,
  disabled = false,
  loadingText = "Loading...",
  color,
  titleColor = "#ffffff",
}) => {
  const isButtonDisabled = disabled || loading;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isButtonDisabled}
      className={`h-13 justify-center items-center rounded-xl px-4 my-2 ${
        isButtonDisabled ? "bg-primaryColor" : color
      } ${style}`}
      style={[
        color && !isButtonDisabled ? { backgroundColor: color } : undefined,
        isButtonDisabled && { opacity: 0.4 },
      ]}
    >
      <View className="flex-row items-center gap-4">
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text
            className="text-white text-base font-bold"
            style={{ color: titleColor }}
          >
            {title}
          </Text>
        )}
        {loading && (
          <Text className="text-white ml-2 text-base font-bold">
            {loadingText}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};
