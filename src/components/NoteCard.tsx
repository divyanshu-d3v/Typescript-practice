import { Tag, CardProps } from "@/utils/types"
import Link from 'next/link';
import styles from "@/styles/notecard.module.css";

export default function NoteCard({ title, tags, id }: CardProps) {
    return (
        <div className={styles.note_card}>
            <Link href={`/${id}`} style={{ textDecoration: "none" }}>
                <p className={styles.title}>{title}</p>
                <div>
                    {tags.map(tag => (
                        <span key={tag.id} className={styles.tag_container}>{tag.label}&nbsp;</span>
                    ))}
                </div>
            </Link >
        </div >
    )
}

