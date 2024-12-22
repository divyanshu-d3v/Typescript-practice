import React, { useMemo } from "react";
import NoteForm from "@/components/NoteForm";
import { useSessionStorage } from "@/components/useSessionStorage";
import { v4 as uuidV4 } from "uuid";
import { NoteData, Note, RawNoteData, RawNote, Tag } from "@/utils/types";
import { useNotes } from "@/utils/ContextProvider";

const New = () => {
    const { notes, setNotes, tags, setTags, addTag, updateTag, deleteTag, onCreateNote, onUpdateNote, onDeleteNote } = useNotes();

    const notesWithTags = useMemo(() => {
        return notes.map((note) => {
            return { ...note, tags: tags.filter(tag => note.tagIds.includes(tag.id)) }
        })
    }, [notes, tags])


    return (
        <div>
            <h1>New Note</h1>
            <NoteForm onSubmit={onCreateNote} onAddTag={addTag} availableTags={tags} />
        </div>
    )
}
export default New