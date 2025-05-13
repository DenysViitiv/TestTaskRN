import { GestureResponderEvent } from "react-native";
export interface ButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  style?: string;
  loading?: boolean;
  disabled?: boolean;
  loadingText?: string;
  color?: string;
  icon?: React.ReactNode;
  titleColor?: string;
}

export interface OnboardingStepperProps {
  steps: number;
  activeStep: number;
}

export interface InputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?:
    | "default"
    | "number-pad"
    | "numeric"
    | "email-address"
    | "phone-pad";
  error?: boolean;
  color?: string;
  readOnly?: boolean;
  secureTextEntry?: boolean;
}
