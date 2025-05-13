import { GoBackIcon } from "@assets/svg/GoBackIcon";
import {
  AppNavigationProp,
  BasicAuthCredentials,
} from "@navigation/types/navigationTypes";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useState } from "react";
import { Pressable, Text, View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AccountDetails, Transaction } from "./types/screensTypes";

export const MyAccountScreen = () => {
  const navigation = useNavigation<AppNavigationProp>();
  const route = useRoute();
  const { basicAuthCredentials } = route?.params as {
    basicAuthCredentials: BasicAuthCredentials;
  };
  const [accountDetails, setAccountDetails] = useState<AccountDetails | null>(
    null
  );
  const [error, setError] = useState<string>("");

  const fetchAccountDetails = async () => {
    try {
      const response = await axios.get(
        "https://artjoms-spole.fly.dev/account",
        {
          auth: {
            username: basicAuthCredentials.username,
            password: basicAuthCredentials.password,
          },
        }
      );
      setAccountDetails(response.data);
    } catch (err) {
      console.error("Error fetching account details:", err);
      setError("Failed to fetch account details.");
    }
  };

  useEffect(() => {
    fetchAccountDetails();
  }, []);

  const renderTransaction = ({ item }: { item: Transaction }) => (
    <View className="flex-row items-center justify-between mt-4">
      <View className="flex-1">
        <Text className="text-blackText font-bold text-base">{item.name}</Text>
        <Text className="text-secondaryColor font-medium text-sm mt-0.5">
          {item.bank} {item.time}
        </Text>
      </View>
      <Text
        style={{
          color: item.amount > 0 ? "#009218" : "#CA7081",
          fontWeight: "bold",
        }}
      >
        {item.amount > 0 ? `+N${item.amount}` : `-N${Math.abs(item.amount)}`}
      </Text>
    </View>
  );

  return (
    <SafeAreaView
      className="flex-1 bg-primaryBg px-4"
      edges={["top", "bottom"]}
    >
      <View className="flex-row items-center justify-between">
        <Pressable
          onPress={() => navigation.goBack()}
          className="self-start rounded-full py-2 px-2.5 bg-secondaryBg"
        >
          <GoBackIcon />
        </Pressable>
        <Text className="text-base font-medium text-blackText">My Account</Text>
        <View className="w-8" />
      </View>

      {error ? (
        <Text className="text-2xl font-bold text-redText">{error}</Text>
      ) : (
        <>
          <View className="mt-7 rounded-2xl bg-secondaryBg py-6 px-4">
            {accountDetails && (
              <View className="space-y-4">
                <View className="flex-row items-center justify-between">
                  <Text className="text-base font-medium text-secondaryColor">
                    Account No
                  </Text>
                  <Text className="text-base font-medium text-blackText">
                    {accountDetails.accountType}
                  </Text>
                </View>

                <View className="flex-row items-center justify-between">
                  <Text className="text-base font-medium text-secondaryColor">
                    Available Balance
                  </Text>
                  <Text className="text-base font-medium text-balanceColor">
                    {accountDetails.currency}
                    {accountDetails.availableBalance.toLocaleString()}
                  </Text>
                </View>
                <View className="flex-row items-center justify-between">
                  <Text className="text-base font-medium text-secondaryColor">
                    Date added
                  </Text>
                  <Text className="text-base font-medium text-blackText">
                    {accountDetails.dateAdded}
                  </Text>
                </View>
              </View>
            )}
          </View>
          <View className="mt-6 bg-secondaryBg rounded-2xl py-6 px-4">
            <Text className="text-base font-bold mb-2">
              Recent Transactions
            </Text>
            <FlatList
              data={accountDetails?.transactions}
              renderItem={renderTransaction}
              keyExtractor={(item) => item.name + item.time}
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};
