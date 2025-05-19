import CustomHeader from '@/components/Header';
import { useNotes } from '@/context/NotesContext';
import { useRelativeTime } from '@/context/useRelativeTime';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { IconButton, Menu } from 'react-native-paper';

const ReadNotes = () => {
    const { id } = useLocalSearchParams();
    const { notes, deleteNote } = useNotes();
    const router = useRouter();

    const currentNote = notes.find(note => note.id === id);
    const relativeTime = useRelativeTime(currentNote?.createdAt || "");

    const [copied, setCopied] = useState<boolean>(false);
    const [visible, setVisible] = useState(false);

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const handleCopy = () => {
        Clipboard.setStringAsync(currentNote?.content ?? "");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const openEditPage = () => {
        router.push({ pathname: '/note/form', params: { id: currentNote?.id } });
        setVisible(false);
    }

    const onDeleteNote = () => {
        if (currentNote) {
            deleteNote(currentNote.id);
            router.back();
        }
    }

    if (!currentNote) {
        return (
            <View className='flex-1 bg-[#000] px-4 pt-12'>
                <Text className='text-red-500 text-lg font-semibold'>Note not found</Text>
            </View>
        );
    }


    return (
        <View style={{ flex: 1, backgroundColor: "#12172c" }}>
            <CustomHeader title="Note" showBack={true}
                rightIcon={
                    <Menu
                        visible={visible}
                        onDismiss={closeMenu}
                        anchorPosition='bottom'
                        anchor={
                            <IconButton
                                icon="dots-vertical"
                                size={24}
                                iconColor="white"
                                onPress={openMenu}
                            />
                        }
                    >
                        <Menu.Item onPress={openEditPage} title="Edit" />
                        <Menu.Item onPress={onDeleteNote} title="Delete" />
                    </Menu>
                }
            />



            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.title}>{currentNote.title}</Text>
                <Text style={styles.date}>{relativeTime}</Text>
                <Text style={styles.body}>{currentNote.content}</Text>
            </ScrollView>

            {/* Clipboard Button */}
            <Pressable
                onPress={handleCopy}
                style={styles.clipboardButton}
            >
                {copied ? (
                    <Ionicons name="clipboard" size={28} color="#fff" />
                ) : (
                    <Ionicons name="clipboard-outline" size={28} color="#fff" />
                )}
            </Pressable>
        </View>
    );

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
        position: "relative"
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
    clipboardButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#333',
        padding: 12,
        borderRadius: 30,
        elevation: 4, // for Android shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
});
