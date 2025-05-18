import CustomHeader from '@/components/Header';
import { useNotes } from '@/context/NotesContext';
import { useRelativeTime } from '@/context/useRelativeTime';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const ReadNotes = () => {
    const { id } = useLocalSearchParams();
    const { notes } = useNotes();
    const router = useRouter();

    const currentNote = notes.find(note => note.id === id);
    const relativeTime = useRelativeTime(currentNote?.createdAt || "");

    if (!currentNote) {
    return (
      <View className='flex-1 bg-[#000] px-4 pt-12'>
        <Text className='text-red-500 text-lg font-semibold'>Note not found</Text>
      </View>
    );
  }


  return (
    <View className='flex-1'>
      {/* <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity> */}
      <CustomHeader
        title={"Note"}
        showBack={true}
        />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{currentNote.title}</Text>
        <Text style={styles.date}>{relativeTime}</Text>
        <Text style={styles.body}>{currentNote.content}</Text>
      </ScrollView>
    </View>
  )
}

export default ReadNotes;


const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000',
//     paddingHorizontal: 20,
//     paddingTop: 50,
//   },
  backButton: {
    marginBottom: 10,
  },
  content: {
    padding: 10,
  },
  title: {
    fontSize: 26,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  date: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 20,
  },
  body: {
    fontSize: 18,
    color: '#ccc',
    lineHeight: 28,
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    alignSelf: 'center',
    marginTop: 50,
  },
});
