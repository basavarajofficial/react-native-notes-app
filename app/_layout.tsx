import { NotesProvider } from "@/context/NotesContext";
import { Stack } from "expo-router";
import { useState } from "react";
import { PaperProvider } from "react-native-paper";
import "./globals.css";
import CustomSplash from "./SplashScreen";

export default function RootLayout() {
    const [isReady, setIsReady] = useState(false);

  if (!isReady) return <CustomSplash onFinish={() => setIsReady(true)} />;
    return (
        <NotesProvider>
            <PaperProvider>
                <Stack
                    screenOptions={{
                        headerShown: false,
                        gestureEnabled: true,
                        contentStyle: {
                            backgroundColor: "#12172C",
                            paddingHorizontal: 10,
                            paddingTop: 10,
                        },
                    }}
                >
                    <Stack.Screen name="index" options={{ title: "Home" }} />
                    <Stack.Screen name="notes" options={{ headerTitle: "Notes" }} />
                    <Stack.Screen name="note/form" options={{ headerTitle: "Editor" }} />
                    <Stack.Screen name="readnotes/[id]" options={{headerTitle: "Note", headerShown: false }} />
                </Stack>
            </PaperProvider>
        </NotesProvider>
    )
}
