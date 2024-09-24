import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TextCard } from 'components/TextCard/TextCard';
import { NoteAPI } from 'api/note-api';
import { deleteNote } from 'store/note/note-slice';
import s from './style.module.css';

export function NoteList({ noteList }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    async function deleteNote_(note) {
        if (window.confirm('Delete note ?')) {
            await NoteAPI.deleteById(note.id);
            dispatch(deleteNote(note));
        };
    };
    return (
        <div className='row justify-content-center'>
            {
                noteList.map( note => {
                    return (
                        <div className={s.card_container} key={note.id}>
                            <TextCard 
                                title={note.title}
                                subtitle={note.created_at}
                                content={note.content}
                                onClick={() => navigate('/note/' + note.id)}
                                onClickTrash={() => deleteNote_(note)}
                            />
                        </div>
                    );
                })
            }
        </div>
    );
};