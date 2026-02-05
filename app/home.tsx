import axios from "axios";
import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from "expo-notifications";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Button,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

//Notify
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

async function sendPushNotification(expoPushToken: string) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

function handleRegistrationError(errorMessage: string) {
  alert(errorMessage);
  throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      handleRegistrationError('Permission not granted to get push token for push notification!');
      return;
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
    if (!projectId) {
      handleRegistrationError('Project ID not found');
    }
    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log(pushTokenString);
      return pushTokenString;
    } catch (e: unknown) {
      handleRegistrationError(`${e}`);
    }
  } else {
    handleRegistrationError('Must use physical device for push notifications');
  }
}

//notend
export default function HomeScreen() {
  const router = useRouter();
  const [setup, setSetup] = useState("");
  const [punchline, setPunchline] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  const loadJoke = async () => {
    try {
      const response = await axios.get(
        "https://official-joke-api.appspot.com/random_joke"
      );
      setSetup(response.data.setup);
      setPunchline(response.data.punchline);
    } catch (error) {
      console.log(error);
    }
  };
//notification code

 const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState<Notifications.Notification | undefined>(
    undefined
  );
    useEffect(() => {
    registerForPushNotificationsAsync()
      .then(token => setExpoPushToken(token ?? ''))
      .catch((error: any) => setExpoPushToken(`${error}`));

    const notificationListener = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      notificationListener.remove();
      responseListener.remove();
    };
  }, []);


//till here
  return (
    <View style={{ flex: 1 }}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Home</Text>
        <TouchableOpacity onPress={() => setShowMenu(true)}>
          <Text style={styles.menuIcon}>⋮</Text>
        </TouchableOpacity>
      </View>

      {/* CONTENT */}
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to My App 👋</Text>

        <Text style={styles.title}>😂 Random Joke</Text>

        {setup ? (
          <>
            <Text style={styles.text}>{setup}</Text>
            <Text style={styles.punchline}>{punchline}</Text>
          </>
        ) : (
          <Text>Click the button to load a joke</Text>
        )}

        <TouchableOpacity style={styles.button} onPress={loadJoke}>
          <Text style={styles.buttonText}>Get Joke</Text>
        </TouchableOpacity>

      <Button
        title="Press to Send Notification"
        onPress={async () => {
          await sendPushNotification(expoPushToken);
        }}
      />

      </View>

      {/* MENU OVERLAY */}
      {showMenu && (
        <Pressable
          onPress={() => setShowMenu(false)}
          style={styles.overlay}
        >
          <View style={styles.menu}>
            <MenuItem
              title="Profile"
              onPress={() => {
                setShowMenu(false);
                router.push("/profile");
              }}
            />
            <MenuItem title="Settings" onPress={() => setShowMenu(false)} />
            <MenuItem title="About" onPress={() => setShowMenu(false)} />
            <MenuItem 
              title="Weather" 
              onPress={()=>{
                setShowMenu(false);
                router.push("/robo");
              }}
              />
              <MenuItem 
              title="Text" 
              onPress={()=>{
                setShowMenu(false);
                router.push("/text-similarity");
              }}
              />
            <MenuItem
              title="Logout"
              onPress={() => {
                setShowMenu(false);
                router.replace("/login");
              }}
            />
          </View>
        </Pressable>
      )}
    </View>
  );
}

function MenuItem({ title, onPress }: { title: string; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 56,
    backgroundColor: "#4f46e5",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
  },
  menuIcon: {
    color: "#fff",
    fontSize: 22,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  welcome: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  title: {
    fontSize: 22,
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: "center",
  },
  punchline: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#4f46e5",
    padding: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: "#fff",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  menu: {
    position: "absolute",
    top: 56,
    right: 0,
    width: 180,
    backgroundColor: "#fff",
    elevation: 5,
  },
  menuItem: {
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});
