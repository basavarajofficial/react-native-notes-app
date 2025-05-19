import CustomHeader from '@/components/Header';
import NoteItem from '@/components/NoteItem';
import { useNotes } from '@/context/NotesContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { FlatList, Image, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Dialog, Portal } from 'react-native-paper';

const NotesMainScreen = () => {
  const router = useRouter();
  const { notes, deleteMultipleNotes } = useNotes();

  const [selectedNoteIds, setSelectedNoteIds] = useState<Set<string>>(new Set());
  const [selectionMode, setSelectionMode] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const [visible, setVisible] = useState(false);

  const flatListRef = useRef<FlatList>(null);

  const toggleSelect = (id: string) => {
    setSelectedNoteIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setShowScrollToTop(offsetY > 100); // Show when scrolled down
  };

  const scrollToTop = () => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const deleteSelectedNotes =() => {
    deleteMultipleNotes(Array.from(selectedNoteIds));
    setSelectionMode(false);
    setSelectedNoteIds(new Set());
    setVisible(false);
  }

  const CancelAction = () => {
    setSelectionMode(false);
    setSelectedNoteIds(new Set());
    setVisible(false);
  }

  return (
    <View style={styles.container}>
      <CustomHeader
        title="Notes"
        showBack={true}
        rightIcon={
            notes.length > 0 && (
                !selectionMode ? (
                  <TouchableOpacity onPress={() => setSelectionMode(true)}>
                    <Text className='text-white'>Select</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={CancelAction}>
                    <Text className='text-white'>Cancel</Text>
                  </TouchableOpacity>
                )
            )
        }
      />

      <FlatList
        ref={flatListRef}
        data={notes}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 5 }}
        ListEmptyComponent={
          <View className='flex-1 items-center justify-center mt-52'>
            <Image source={require('../assets/images/no-notes.png')} style={{ width: 200, height: 200 }} />
          </View>
        }
        renderItem={({ item }) => (
          <NoteItem
            item={item}
            selected={selectedNoteIds.has(item.id)}
            onToggleSelect={() => toggleSelect(item.id)}
            onLongPress={() => {
              if (!selectionMode) setSelectionMode(true);
              toggleSelect(item.id);
            }}
            selectionMode={selectionMode}
            onOpen={() => {
              if (!selectionMode)
                router.push({ pathname: '/readnotes/[id]', params: { id: item.id } });
              else toggleSelect(item.id);
            }}
          />
        )}
      />

      {/* Floating Add or Delete Button */}
      {selectedNoteIds.size > 0 ? (
        <TouchableOpacity className='absolute bottom-10 right-5 rounded-full p-1'>
            <Ionicons name='trash' color="red" size={38} onPress={showDialog}  />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity className='absolute bottom-10 right-5 bg-blue-500/60 rounded-full p-1'>
          <Ionicons name="add-circle-outline" size={38} color={"white"} onPress={() => router.push("/note/form")} />
        </TouchableOpacity>
      )}

      {/* 🆙 Scroll to Top Button */}
      {showScrollToTop && (
        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: 30,
            left: 20,
            backgroundColor: '#1e40af',
            borderRadius: 25,
            padding: 8,
          }}
          onPress={scrollToTop}
        >
          <Ionicons name="arrow-up" size={28} color="white" />
        </TouchableOpacity>
      )}
      {/* pop up */}

      <View>
        {/* <Button onPress={showDialog}>Show Dialog</Button> */}
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Delete Note</Dialog.Title>
            <Dialog.Content>
              <Text className='text-white'>This action can&apos;t be undone</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={CancelAction}>Cancel</Button>
              <Button onPress={deleteSelectedNotes}>Delete</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </View>
  );
};

export default NotesMainScreen;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#12172C',
    width: '100%',
    position: 'relative',
  },
  NoItemText: {
    fontSize: 20,
    color: 'white',
    fontWeight: '800',
    letterSpacing: 2,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
  },
});
