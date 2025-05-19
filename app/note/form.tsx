import { useNotes } from "@/context/NotesContext";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

const NoteEditor =() => {
    const { notes, addNote, updateNote } = useNotes();
     const { id } = useLocalSearchParams(); // id present? => edit mode
     const isEditMode = !!id;
     const existingNote = notes.find(note => note.id === id);

    const router = useRouter();
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    if(isEditMode && existingNote ){
        setNote({
            title: existingNote.title,
            content: existingNote.content
        })
    }
  }, [id]);

  const onSubmit = () => {
    if(isEditMode && existingNote){
        updateNote({...existingNote, ...note});
    }else{
        addNote(note.title, note.content);
    }
    router.back();
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#12172c" }}
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
          multiline
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

export default NoteEditor;
