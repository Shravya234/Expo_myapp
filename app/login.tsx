import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

   
    router.replace("/home");
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Login</Text>

      <TextInput
        placeholder="Mobile / Email"
        value={email}
        onChangeText={setEmail}
        style={{
          borderWidth: 1,
          borderRadius: 8,
          padding: 12,
          marginBottom: 12,
        }}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{
          borderWidth: 1,
          borderRadius: 8,
          padding: 12,
          marginBottom: 12,
        }}
      />

      <TouchableOpacity>
        <Text style={{ color: "blue", textAlign: "right", marginBottom: 20 }}>
          Forgot Password?
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: "#4f46e5",
          padding: 14,
          borderRadius: 8,
          alignItems: "center",
        }}
        onPress={handleLogin}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/register")}>
        <Text style={{ textAlign: "center", marginTop: 15 }}>
          New user? Register
        </Text>
      </TouchableOpacity>
    </View>
  );
}
