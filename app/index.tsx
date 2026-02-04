import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace("/login");
    }, 2000);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 28, fontWeight: "bold" }}>MY APP</Text>
      <ActivityIndicator size="large" style={{ marginTop: 20 }} />
    </View>
  );
}
