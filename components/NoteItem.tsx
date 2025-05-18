import { Note } from '@/context/NotesContext'
import { useRelativeTime } from '@/context/useRelativeTime'
import { Checkbox } from 'expo-checkbox'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

interface NoteItemProps {
  item: Note;
  selected: boolean;
  onToggleSelect: () => void;
  onLongPress: () => void;
  selectionMode: boolean;
  onOpen: () => void;
}

const NoteItem = ({ item, selected, onToggleSelect, onOpen, onLongPress, selectionMode }: NoteItemProps) => {
     const time = useRelativeTime(item.createdAt);

  return (
    <Pressable onPress={onOpen} onLongPress={onLongPress}>
    <View style={styles.noteItem}>
        <View>
            <Text style={styles.noteText}>{item.title}</Text>
            <Text className='text-gray-300 text-base' numberOfLines={1} ellipsizeMode='tail'>{item.content}</Text>
            <Text style={styles.noteSubText}>{time}</Text>
        </View>
        {/* <View>
            <TouchableOpacity onPress={() => onDelete(item.id)}>
                <Ionicons name="trash" size={24} color="white" />
            </TouchableOpacity>
        </View> */}
        {
            selectionMode && (
                <Checkbox
                    value={selected}
                    onValueChange={onToggleSelect}
                    />
            )
        }
    </View>
    </Pressable>
  )
}

export default NoteItem

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        width: "100%",
        position: "relative",
    },
    noteItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#333',
        padding: 15,
        borderRadius: 10,
        marginVertical: 5,
    },
    noteText: {
        fontSize: 18,
        color: "white",
        fontWeight: 'bold',
    },
    noteSubText: {
        fontSize: 14,
        color: "gray",
        marginTop: 5,
    },
    NoItemText: {
        fontSize: 20,
        color: "white",
        fontWeight: 800,
        letterSpacing: 2,
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 10
    }
})
