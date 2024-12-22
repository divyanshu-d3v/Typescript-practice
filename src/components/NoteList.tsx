import styles from "@/styles/notelist.module.css";
import Link from 'next/link';
import Select from "react-select";
import { useMemo, useState } from "react";
import { Tag, Note, CardProps, RawNote } from "@/utils/types";
import NoteCard from "./NoteCard";

type NoteListProps = {
    availableTags: Tag[];
    // notes: Note[];
    notes: CardProps[];
};

export function NoteList({ availableTags, notes }: NoteListProps) {
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const [title, setTitle] = useState("");

    const filteredNotes = useMemo(() => {
        return notes.filter(note => {
            return (
                (title === "" ||
                    note.title.toLowerCase().includes(title.toLowerCase())) &&
                // Make sure that all selected tags are present in the note
                (selectedTags.length === 0 ||
                    selectedTags.every(tag =>
                        note.tags.some(noteTag => noteTag.id === tag.id)
                    ))
            )
        })
    }, [title, selectedTags, notes])

    return (
        <>
            <div>
                <div className={styles.top_container}>
                    <h1>Notes</h1>
                    <div className={styles.top_right_container}>
                        <Link href="/new">
                            <button>Create</button>
                        </Link>
                        <button>Edit Tags</button>
                    </div>
                </div>
                <form>
                    <input type="text" name="noteTitle" id="noteTitle" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    <div className={styles.tag_container}>
                        <Select
                            value={selectedTags.map(tag => {
                                return { label: tag.label, value: tag.id }
                            })}
                            options={availableTags?.map(tag => {
                                return { label: tag.label, value: tag.id }
                            })}
                            onChange={tags => {
                                setSelectedTags(
                                    tags.map(tag => {
                                        return { label: tag.label, id: tag.value }
                                    })
                                )
                            }}
                            isMulti
                        />
                    </div>
                </form>
            </div>
            <div>
                {filteredNotes.map(note => (
                    <div key={note.id}>
                        <NoteCard id={note.id} title={note.title} tags={note.tags} />
                    </div>
                ))}
            </div>
        </>
    )
}