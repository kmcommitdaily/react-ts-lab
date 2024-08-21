import { useEffect, useState } from 'react';
import './App.css';

function App() {
  // localStorage.removeItem('noteList');
  const [header, setHeader] = useState('');
  const [note, setNote] = useState('');
  const [noteList, setNoteList] = useState([]);

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
  });

  function handleAdd() {
    const newNote = { header, note }; // I put the  updated header and note state value here
    const updatedNoteList = [...noteList, newNote]; // and append it to my noteList array
    localStorage.setItem('noteList', JSON.stringify(updatedNoteList)); // all the array list will be save in my local storage
    setNoteList(updatedNoteList); // my notelist will be updated whenever new note was added
    setHeader('');
    setNote('');
  }

  function renderNoteList() {
    return (
      <>
        {noteList.map((noteItem, index) => (
          <div className="list-container" key={index}>
            <h3>{noteItem.header}</h3>
            <p>{noteItem.note.split(' ').slice(0, 7).join(' ')}</p>
          </div>
        ))}
      </>
    );
  }

  // when i click the add
  // it should save the header and body to localstorage as notes
  //push the savaed header and body to previewlist array

  // render the previewlist array
  // clear the notepad

  return (
    <>
      <h1>Notes</h1>
      <div className="main-container">
        <aside className="aside">
          <div className="search-container">
            <input id="search-input" type="text" />
            <button>search</button>
          </div>
          <h3>Preview</h3>
          <div className="prev-container">
            <div className="prev-list-container">{renderNoteList()}</div>
          </div>
        </aside>
        <div className="notepad">
          <div className="note-doc-header">
            <button className="extend-btn">extend</button>
            <button className="add-btn" onClick={handleAdd}>
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
