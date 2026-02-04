import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function RobohashScreen() {
      const router = useRouter();
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const generateRobot = () => {
    if (!text) {
      alert("Enter some text");
      return;
    }

    // Robohash does not need axios request
    const url = `https://robohash.org/${text}`;
    setImageUrl(url);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🤖 Robohash Generator</Text>

      <TextInput
        placeholder="Enter text"
        value={text}
        onChangeText={setText}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={generateRobot}>
        <Text style={styles.buttonText}>Generate Robot</Text>
      </TouchableOpacity>

      {imageUrl !== "" && (
        <Image
          source={{ uri: imageUrl }}
          style={{ width: 200, height: 200, marginTop: 20 }}
        />
      )}

        <TouchableOpacity
              style={[styles.button]}
              onPress={() => router.back()}
            >
              <Text style={styles.buttonText}>Go Back</Text>
            </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    width: "100%",
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#4f46e5",
    padding: 12,
    marginTop:12,
    borderRadius: 6,
  },
  buttonText: {
    color: "#fff",
  },
});
