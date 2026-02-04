import { useRouter } from "expo-router";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function RegisterScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Register</Text>

      <TextInput placeholder="Name" style={inputStyle} />
      <TextInput placeholder="Mobile / Email" style={inputStyle} />
      <TextInput placeholder="Password" secureTextEntry style={inputStyle} />
      <TextInput
        placeholder="Confirm Password"
        secureTextEntry
        style={inputStyle}
      />

      <TouchableOpacity
        style={{
          backgroundColor: "#16a34a",
          padding: 14,
          borderRadius: 8,
          alignItems: "center",
          marginTop: 10
        }}
        onPress={() => router.back()}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const inputStyle = {
  borderWidth: 1,
  borderRadius: 8,
  padding: 12,
  marginBottom: 12
};
