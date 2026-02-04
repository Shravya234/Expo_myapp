import axios from "axios";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

export default function TextSimilarityScreen() {
    const router=useRouter();
  const [text, setText] = useState("");
  const [results, setResults] = useState<any[]>([]);

  const checkSimilarity = async () => {
    if (!text) return;

    const res = await axios.get(
      `https://api.datamuse.com/words?ml=${text}`
    );

    setResults(res.data.slice(0, 5));
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>
        Text Similarity
      </Text>

      <TextInput
        placeholder="Enter a word"
        value={text}
        onChangeText={setText}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />

      <TouchableOpacity onPress={checkSimilarity}>
        <Text style={{ color: "blue" }}>Check Similar Words</Text>
      </TouchableOpacity>

      {results.map((item, index) => (
        <Text key={index}>{item.word}</Text>
      ))}

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
button: {
    backgroundColor: "#4f46e5",
    padding: 12,
    borderRadius: 6,
    
  },
  buttonText: {
    color: "#fff",
    textAlign:"center"
  }
});