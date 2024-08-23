import { useEffect, useState } from 'react';
import './App.css';
import {
  handleAdd,
  handleExtend,
  handleMinimize,
  renderNoteList,
} from './lib/utils';

import { Note } from '../src/lib/types';
import SearchBox from './components/SearchBox';
import ExtendButton from './components/ExtendButton';
import AddButton from './components/AddButton';
import NoteArchive from './components/NoteArchive';
import NotePadHeader from './components/NotePadHeader';
import NotePadBody from './components/NotePadBody';

function App() {
  // localStorage.removeItem('noteList');
  const [header, setHeader] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [noteList, setNoteList] = useState<Note[]>([]);
  const [isExtended, setIsExtended] = useState(false);

  useEffect(() => {
    const savedNotes = localStorage.getItem('noteList');

    if (savedNotes) {
      try {
        const parsedNotes = JSON.parse(savedNotes);
        setNoteList(parsedNotes);
      } catch (error) {
        console.log('error', error);
      }
    }
  }, []);

  return (
    <>
      <h1>Notes</h1>
      <div className="main-container">
        <aside className="aside">
          <div className="search-container">
            <SearchBox />
          </div>
          <h3>{noteList.length > 0 ? 'Saved Notes' : 'Start Adding Notes'}</h3>

          <NoteArchive>
            {' '}
            {renderNoteList({ noteList, setNoteList })}
          </NoteArchive>
        </aside>
        <div className="notepad">
          <div className="note-doc-header">
            <ExtendButton
              isExtended={isExtended}
              onExtend={() => {
                handleExtend(setIsExtended);
              }}
              onMinimize={() => {
                handleMinimize(setIsExtended);
              }}
            />

            <AddButton
              onAdd={() => {
                handleAdd({
                  noteList,
                  setNoteList,
                  setHeader,
                  setNote,
                  header,
                  note,
                });
              }}
            />
          </div>
          <div className="note-document">
            <NotePadHeader
              value={header}
              onChange={(e) => {
                setHeader(e.target.value);
              }}
              name="header"
              id="header"
              cols={2}
              rows={1}
            />
            <NotePadBody
              value={note}
              onChange={(e) => {
                setNote(e.target.value);
              }}
              name="body"
              id="body"
              cols={30}
              rows={50}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
