import styles from "@/styles/notelist.module.css";
import Link from 'next/link';
import Select from "react-select";
import { useState } from "react";
import { Tag } from "@/utils/types";

type NoteListProps = {
    availableTags: Tag[];
};

export function NoteList({ availableTags }: NoteListProps) {
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

    return (
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
                {/* <input type="text" name="noteTitle" id="noteTitle" placeholder="Title" ref={titleRef} required /> */}
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
    )
}