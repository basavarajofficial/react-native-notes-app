
// @ts-ignore
import PostImage from "@/assets/images/notes-icon-main.png";
import { registerRootComponent } from "expo";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import 'react-native-get-random-values';
import App from "./App";

registerRootComponent(App);

export default function HomeScreen() {
    const router = useRouter();

    return (
        <View style={styles.container} >
            <Image source={PostImage} style={styles.image} />
            <Text style={styles.header}>Welcome to Notes App</Text>
            <TouchableOpacity onPress={() => router.push("/notes")}>
                <Text className="text-xl font-bold text-black bg-blue-200 p-2 rounded">Get Started</Text>
            </TouchableOpacity>
        </View>
    );
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
        gap: 10,
    },
    button: {
        fontSize: 16,
        color: "black",
        fontWeight: 800,
        backgroundColor: "lightblue",
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 10
    },
    countText: {
        fontSize: 20,
        color: "black",
        fontWeight: 800,
        letterSpacing: 2,
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 10
    },
    header:{
        fontSize: 25,
        color: "white",
        fontWeight: 800,
        paddingHorizontal: 5,
        paddingVertical: 8,
        borderRadius: 10
    },
     image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
})
