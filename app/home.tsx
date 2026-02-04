import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View
        style={{
          height: 56,
          backgroundColor: "#4f46e5",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 16,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 18 }}>
          Home
        </Text>

        
        <TouchableOpacity onPress={() => setShowMenu(true)}>
          <Text style={{ color: "#fff", fontSize: 22 }}>⋮</Text>
        </TouchableOpacity>
      </View>

      {/* Screen Content */}
      <View style={{ padding: 20,alignItems:"center"}}>
        <Text
    style={{
      fontSize: 32,
      fontWeight: "bold",
      marginBottom: 10,
      textAlign: "center",
    }}
  >
    Welcome to My App 👋
  </Text>
      </View>

     
      {showMenu && (
        <Pressable
          onPress={() => setShowMenu(false)}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.2)",
          }}
        >
          {/* Right Side Menu */}
          <View
            style={{
              position: "absolute",
              top: 56,
              right: 0,
              width: 180,
              backgroundColor: "#fff",
              elevation: 5,
              borderRadius: 4,
            }}
          >
            <MenuItem
              title="Profile"
              onPress={() => {
                setShowMenu(false);
                router.push({ pathname: "/profile" });
              }}
            />

            <MenuItem
              title="Settings"
              onPress={() => setShowMenu(false)}
            />

            <MenuItem
              title="About"
              onPress={() => setShowMenu(false)}
            />

            <MenuItem
              title="Logout"
              onPress={() => {
                setShowMenu(false);
                router.replace({ pathname: "/login" });
              }}
            />
          </View>
        </Pressable>
      )}
    </View>
  );
}

function MenuItem({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
      }}
    >
      <Text style={{ fontSize: 15 }}>{title}</Text>
    </TouchableOpacity>
  );
}
