import { Tag, CardProps } from "@/utils/types"
import Link from 'next/link';

export default function NoteCard({ title, tags, id }: CardProps) {
    return (
        <Link href={`/${id}`}>
            <div>
                <h1>{title}</h1>
                <div>
                    {tags.map(tag => (
                        <span key={tag.id} style={{ border: "1px solid grey" }}>{tag.label}&nbsp;</span>
                    ))}
                </div>
            </div>
        </Link>
    )
}

