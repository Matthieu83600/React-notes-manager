import { NoteList } from 'containers/NoteList/NoteList';
import { SearchBar } from 'components/SearchBar/SearchBar';
import { useState } from 'react';
import s from './style.module.css';
import { useSelector } from 'react-redux';

export function NoteBrowse(props) {
    const [searchText, setSearchText] = useState('');
    const noteList = useSelector((store) => store.NOTE.noteList);
    const filteredList = noteList.filter(note => {
        const containsTitle = note.title
            .toUpperCase()
            .includes(searchText.trim().toUpperCase());
        const containsContent = note.content
            .toUpperCase()
            .includes(searchText.trim().toUpperCase()); 
        return containsTitle || containsContent;
    });
    return (
        <>
            <div className='row justify-content-center mb-5'>
                <div className='col-sm-12 col-md-4'>
                    <SearchBar  placeholder='Search your note...' onTextChange={setSearchText} />
                </div>
            </div>
            <NoteList noteList={filteredList}/>
        </>
    )
};