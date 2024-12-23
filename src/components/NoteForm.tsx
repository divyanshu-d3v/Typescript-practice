import React, { FormEvent, useRef, useState } from "react";
import CreatableSelect from "react-select/creatable";
import styles from "@/styles/noteform.module.css";
import { useRouter } from 'next/router'
import { NoteData, Note, RawNoteData, RawNote, Tag } from "@/utils/types";
import { v4 as uuidV4 } from "uuid";

//We define the type for props being passed here.
type NoteFormProps = {
    onSubmit: (note: NoteData) => void; //a function that takes a NoteData object and returns void.
    onAddTag: (tag: Tag) => void;
    availableTags: Tag[];
};

const NoteForm = ({ onSubmit, onAddTag, availableTags }: NoteFormProps) => {
    const router = useRouter();
    const titleRef = useRef<HTMLInputElement>(null);
    const markdownRef = useRef<HTMLTextAreaElement>(null);
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

    const handleCancel = (): void => {
        router.back();
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log("submitting:", e);
        onSubmit({
            title: titleRef.current!.value, //titleRef.current would be never be null as it is required.
            body: markdownRef.current!.value, //never be null as it is required.
            tags: selectedTags
        });
        router.back();
    }

    return <div className={styles.form_container}>
        <form onSubmit={handleSubmit}>
            <div className={styles.title_tag_container}>
                {/* <div className={styles.title_container}> */}
                <input type="text" name="noteTitle" id="noteTitle" className={styles.input_title} placeholder="Title" ref={titleRef} required />
                {/* </div> */}
                <div className={styles.tag_container}>
                    {/* React select expects data in the form of {label:... , value:...} */}
                    <CreatableSelect
                        onCreateOption={label => {
                            const newTag = { id: uuidV4(), label }
                            onAddTag(newTag)
                            setSelectedTags(prev => [...prev, newTag])
                        }}
                        value={selectedTags.map(tag => {
                            return { label: tag.label, value: tag.id }
                        })}
                        options={availableTags.map(tag => {
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
            </div>
            <div style={{ fontSize: "24px", fontWeight: 500, color: "#444", marginTop: "15px" }}>Body</div>
            <textarea rows={30} cols={100} ref={markdownRef} required className={styles.text_area} />
            <div className={styles.button_container}>
                <button type="submit" className={`${styles.save_button} ${styles.form_button}`}>Save</button>
                <button type="button" className={`${styles.cancel_button} ${styles.form_button}`} onClick={handleCancel}>Cancel</button>
            </div>
        </form>
    </div>
}

export default NoteForm