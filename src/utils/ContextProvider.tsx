import React, { createContext, useContext, useMemo } from "react";
// import NoteForm from "@/components/NoteForm";
import { useSessionStorage } from "@/components/useSessionStorage";
import { v4 as uuidV4 } from "uuid";
import { NoteData, RawNote, Tag } from "@/utils/types";

type NotesContextType = {
    notes: RawNote[];
    tags: Tag[];
    notesWithTags: RawNote[];
    onCreateNote: (data: NoteData) => void;
    onUpdateNote: (id: string, data: NoteData) => void;
    onDeleteNote: (id: string) => void;
    addTag: (tag: Tag) => void;
    updateTag: (id: string, label: string) => void;
    deleteTag: (id: string) => void;
};

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const useNotes = () => {
    const context = useContext(NotesContext);
    if (!context) {
        throw new Error("useNotes must be used within a NotesProvider");
    }
    return context;
};

export const NotesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [notes, setNotes] = useSessionStorage<RawNote[]>('NOTES', []);
    const [tags, setTags] = useSessionStorage<Tag[]>('TAGS', []);

    const notesWithTags = useMemo(() => {
        return notes.map((note) => {
            return { ...note, tags: tags.filter(tag => note.tagIds.includes(tag.id)) }
        })
    }, [notes, tags]);

    function onCreateNote({ tags, ...data }: NoteData) {
        setNotes(prevNotes => [
            ...prevNotes,
            { ...data, id: uuidV4(), tagIds: tags.map(tag => tag.id) },
        ]);
    }

    function onUpdateNote(id: string, { tags, ...data }: NoteData) {
        setNotes(prevNotes => prevNotes.map(note => {
            if (note.id === id) {
                return { ...note, ...data, tagIds: tags.map(tag => tag.id) };
            } else {
                return note;
            }
        }));
    }

    function onDeleteNote(id: string) {
        setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
    }

    function addTag(tag: Tag) {
        setTags(prev => [...prev, tag]);
    }

    function updateTag(id: string, label: string) {
        setTags(prevTags => prevTags.map(tag => {
            if (tag.id === id) {
                return { ...tag, label };
            } else {
                return tag;
            }
        }));
    }

    function deleteTag(id: string) {
        setTags(prevTags => prevTags.filter(tag => tag.id !== id));
    }

    return (
        <NotesContext.Provider value={{ notes, tags, notesWithTags, onCreateNote, onUpdateNote, onDeleteNote, addTag, updateTag, deleteTag }}>
            {children}
        </NotesContext.Provider>
    );
};