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
import { handleRenderPrev } from './components/RenderPrevNote';
import { handleNewNote } from './lib/utils';

function App() {
  const [header, setHeader] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [noteList, setNoteList] = useState<Note[]>([]);
  const [isExtended, setIsExtended] = useState(false);
  const [isPreview, setIsPreview] = useState(false);

  console.log(isPreview);

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

  const handleClick = (index: number) => {
    handleRenderPrev({ setHeader, setNote, index, setIsPreview });
  };

  return (
    <>
      <h1>Notes</h1>
      <div className="main-container">
        {' '}
        {/** clean the divs or make it more semantic */}
        <aside className="aside">
          <div className="search-container">
            <SearchBox /> {/** work on this */}
          </div>
          <h3>{noteList.length > 0 ? 'Saved Notes' : 'Start Adding Notes'}</h3>

          <NoteArchive>
            {renderNoteList({
              noteList,
              setNoteList,
              handleClick,
              setIsPreview,
            })}
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
                !isPreview
                  ? handleAdd({
                      noteList,
                      setNoteList,
                      setHeader,
                      setNote,
                      header,
                      note,
                    })
                  : // : console.log('isPreview before toggle:', isPreview);
                    handleNewNote({ setHeader, setIsPreview, setNote });
                // console.log('isPreview after toggle:', isPreview);
              }}>
              {!isPreview ? 'Add' : 'New Note'}
            </AddButton>
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
