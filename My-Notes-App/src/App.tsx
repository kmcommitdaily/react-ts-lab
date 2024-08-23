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
          <h3>Preview</h3>
          <div className="prev-container">
            <div className="prev-list-container">
              {renderNoteList({ noteList })}
            </div>
          </div>
        </aside>
        <div className="notepad">
          <div className="note-doc-header">
            {/* <button
              className="extend-btn"
              onClick={() => {
                !isExtended
                  ? handleExtend(setIsExtended)
                  : handleMinimize(setIsExtended);
              }}>
              {isExtended ? 'minimize' : 'extend'}
            </button> */}
            <ExtendButton
              isExtended={isExtended}
              onExtend={() => {
                handleExtend(setIsExtended);
              }}
              onMinimize={() => {
                handleMinimize(setIsExtended);
              }}
            />

            <button
              className="add-btn"
              onClick={() => {
                handleAdd({
                  noteList,
                  setNoteList,
                  setHeader,
                  setNote,
                  header,
                  note,
                });
              }}>
              add
            </button>
          </div>
          <div className="note-document">
            <textarea
              value={header}
              onChange={(e) => {
                setHeader(e.target.value);
              }}
              name="header"
              id="header"
              cols={2}
              rows={2}></textarea>
            <textarea
              value={note}
              onChange={(e) => {
                setNote(e.target.value);
              }}
              name="body"
              id="body"
              cols={30}
              rows={50}></textarea>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
