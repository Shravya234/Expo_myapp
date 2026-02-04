import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Profile() {
     const router = useRouter();

  const user = {
    name: "Shravya",
    mobile: "9686143208",
    email: "shravyar@gmail.com",
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      
      <View style={styles.card}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{user.name}</Text>

        <Text style={styles.label}>Mobile</Text>
        <Text style={styles.value}>{user.mobile}</Text>

        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{user.email}</Text>
      </View>

    
      <TouchableOpacity
        style={styles.button}
        onPress={() => alert("Edit Profile")}
      >
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>

       <TouchableOpacity
        style={[styles.button, { backgroundColor: "#6b7280" }]}
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
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 2,
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#4f46e5",
    padding: 15,
    borderRadius: 8,
    marginTop: 30,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
  },
});