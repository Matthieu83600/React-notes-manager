import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { NoteForm } from 'components/NoteForm/NoteForm';
import { useState } from 'react';
import { NoteAPI } from 'api/note-api';
import { updateNote, deleteNote } from 'store/note/note-slice';

export function Note(props) {
    const [isEditable, setIsEditable] = useState(false);
    const dispatch = useDispatch();
    const { noteId } = useParams();
    const note = useSelector((store) => 
        store.NOTE.noteList.find(note => note.id === noteId));
    const navigate = useNavigate();
    async function submit(formValues) {
        const updatedNote = await NoteAPI.update({...formValues, id: note.id});
        dispatch(updateNote(updatedNote));
        setIsEditable(false);
    };
    async function deleteNote_(note) {
        if (window.confirm('Delete note ?')) {
            await NoteAPI.deleteById(note.id);
            dispatch(deleteNote(note));
            navigate('/');
        };
    };
    return (
        <>
            {
                note && (
                    <NoteForm 
                        isEditable={isEditable} 
                        title={isEditable ? 'Edit note' : note.title}
                        note={note}
                        onClickEdit={() => setIsEditable(!isEditable)}
                        onClickTrash={() => deleteNote_(note)}
                        onSubmit={isEditable && submit}
                    />
                )
            }    
        </>
    )
};