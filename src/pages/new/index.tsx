import React, { useMemo } from "react";
import NoteForm from "@/components/NoteForm";
import { useSessionStorage } from "@/components/useSessionStorage";

export type NoteData = {
    title: string;
    body: string;
    tags: Tag[];
};

export type Note = NoteData & {
    id: string;
};

export type RawNoteData = {
    title: string;
    body: string;
    tagIds: string[];
};

export type RawNote = {
    id: string;
} & RawNoteData;

export type Tag = {
    label: string;
    id: string;
};


const New = () => {
    const [notes, setNotes] = useSessionStorage<RawNote[]>('NOTES', []); //We will pass an array of rawNote type to store in storage
    const [tags, setTags] = useSessionStorage<Tag[]>('TAGS', []);

    const notesWithTags = useMemo(() => {
        return notes.map((note) => {
            return { ...note, tags: tags.filter(tag => note.tagIds.includes(tag.id)) }
        })
    }, [notes, tags])

    return (
        <div>
            <h1>New Note</h1>
            <NoteForm />
        </div>
    )
}
export default New