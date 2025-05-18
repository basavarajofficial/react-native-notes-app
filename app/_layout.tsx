import { NotesProvider } from "@/context/NotesContext";
import { Stack } from "expo-router";
import "./globals.css";

export default function RootLayout() {
  return (
    <NotesProvider>
    <Stack
    screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        contentStyle: {
            backgroundColor: "black",
            paddingHorizontal: 10,
            paddingTop: 10,
        },
    }}
    >
        <Stack.Screen name="index" options={{ title: "Home"}} />
        <Stack.Screen name="notes" options={{ headerTitle: "Notes" }} />
        <Stack.Screen name="addNote" options={{ headerTitle: "Add Note" }} />
        <Stack.Screen name="readnotes/[id]" options={{ headerShown: false }} />
    </Stack>
    </NotesProvider>
)
}
