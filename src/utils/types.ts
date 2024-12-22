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

export type CardProps = {
    title: string;
    tags: Tag[];
    id: string;
}