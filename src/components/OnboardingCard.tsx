import { Text, View } from "react-native";
import { CustomButton } from "./ui/CustomButton";
import { OnboardingStepper } from "./ui/OnboardingStepper";

export const OnboardingCard = ({
  handleNextStep,
}: {
  handleNextStep: () => void;
}) => {
  return (
    <View className="flex-1 px-5">
      <View className="flex-1 bg-secondaryBg items-center justify-center rounded-[48px] py-9 px-6">
        <Text className="text-2xl font-bold text-primaryColor text-center">
          You ought to know where your money goes
        </Text>
        <Text className="text-sm font-medium text-secondaryColor text-center mt-4">
          {[
            "Get an overview of how you are",
            "performing and motivate yourself to",
            "achieve even more.",
          ].join("\n")}
        </Text>
        <OnboardingStepper steps={4} activeStep={1} />
        <CustomButton
          title="Next"
          onPress={handleNextStep}
          style="w-full bg-primaryColor p-4 rounded-full mt-8"
        />
      </View>
    </View>
  );
};
