import { OnboardingStepperProps } from "@components/types/componentsTypes";
import { View } from "react-native";

export const OnboardingStepper = ({
  steps,
  activeStep,
}: OnboardingStepperProps) => {
  return (
    <View className="flex-row items-center space-x-1 mt-6">
      {Array.from({ length: steps }).map((_, index) => {
        const isActive = index + 1 === activeStep;
        return (
          <View
            key={index}
            className={
              isActive
                ? "w-2 h-6 rounded-full bg-primaryColor"
                : "w-2 h-2 rounded-full bg-dotColor"
            }
          />
        );
      })}
    </View>
  );
};
