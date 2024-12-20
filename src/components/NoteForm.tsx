import React from "react";

const NoteForm: React.FC = () => {
    return <div>
        <form>
            <input type="text" name="noteTitle" id="noteTitle" placeholder="Title" />
        </form>
    </div>
}

export default NoteForm