// context/NotesContext.tsx

import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import uuid from 'react-native-uuid';


// types/note.ts
export type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
};


type NotesContextType = {
  notes: Note[];
  addNote: (title: string, content: string) => void;
  deleteNote: (id: string) => void;
  deleteMultipleNotes: (ids: string[]) => void;
};

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>([]);



  // Load from storage
  useEffect(() => {
    (async () => {
      try {
        const data = await AsyncStorage.getItem("NOTES");
        if (data) setNotes(JSON.parse(data));
      } catch (err) {
        console.error("Failed to load notes", err);
      }
    })();
  }, []);

  // Save to storage on change
  useEffect(() => {
    AsyncStorage.setItem("NOTES", JSON.stringify(notes)).catch(console.error);
  }, [notes]);

  const addNote = (title: string, content: string) => {
    if (!title.trim()) {
      Alert.alert("Error", "Title is required");
      return;
    }

    const newNote: Note = {
      id: uuid.v4() as string,
      title,
      content,
      createdAt: new Date().toISOString(),
    };

    setNotes((prev) => [newNote, ...prev]);
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter(note => note.id !== id))
  };

  const deleteMultipleNotes = (ids: string[]) => {
  setNotes((prev) => prev.filter(note => !ids.includes(note.id)));
};

  return (
    <NotesContext.Provider value={{ notes, addNote, deleteNote, deleteMultipleNotes }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = (): NotesContextType => {
  const context = useContext(NotesContext);
  if (!context) throw new Error("useNotes must be used inside NotesProvider");
  return context;
};
