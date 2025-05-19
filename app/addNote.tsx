import { useNotes } from "@/context/NotesContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function NoteEditor() {
    const router = useRouter();
    const { addNote } = useNotes();
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  const onSubmit = () => {
    console.log("submitted", note);
    addNote(note.title, note.content);
    router.back();
  }

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: 'black',
        width: '100%',
        position: 'relative'
       }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
    <SafeAreaView className="flex-row items-center justify-between px-2">
      <View className='flex-row items-center justify-start gap-5 p-4' >
          <TouchableOpacity onPress={() => router.back()} >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
        <Text className='text-white text-lg font-semibold'>Add Notes</Text>
      </View>

        <View className="mr-4">
            <TouchableOpacity onPress={onSubmit} disabled={note.title.length === 0} className="bg-blue-500/60 rounded-full p-1 disabled:bg-gray-500">
                <Ionicons name="checkmark" size={24} color="white" />
            </TouchableOpacity>
        </View>

    </SafeAreaView>
      <ScrollView className="p-4 flex-grow-0" keyboardShouldPersistTaps="handled">
        <TextInput
          className="text-gray-200 text-2xl font-semibold"
          placeholder="Title"
          placeholderTextColor="#999"
          value={note.title}
          onChangeText={(text => setNote({ ...note, title: text }))}
        />
        <View className={"my-4 h-0.5 bg-gray-600"}></View>

        <TextInput
          className="text-gray-200 text-base"
          placeholder="Note something down..."
          placeholderTextColor="#aaa"
          value={note.content}
          onChangeText={(text => setNote({ ...note, content: text }))}
          multiline
          textAlignVertical="top"
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
