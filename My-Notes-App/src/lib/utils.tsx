// types

import {
  handleAddProps,
  renderNoteListProps,
  handleDeleteProps,
} from '../lib/types';
import DeleteButton from '../components/DeleteButton';

// utils
export function handleAdd({
  noteList,
  setNoteList,
  setHeader,
  setNote,
  header,
  note,
}: handleAddProps): void {
  const newNote = { header, note }; // I put the  updated header and note state value here
  const updatedNoteList = [...noteList, newNote]; // and append it to my noteList array
  localStorage.setItem('noteList', JSON.stringify(updatedNoteList)); // all the array list will be save in my local storage
  setNoteList(updatedNoteList); // my notelist will be updated whenever new note was added
  setHeader('');
  setNote('');
}

export function handleExtend(
  setIsExtended: React.Dispatch<React.SetStateAction<boolean>>
) {
  const aside = document.querySelector('.aside') as HTMLElement;
  if (aside) {
    aside.style.display = 'none';
  }

  const noteDocument = document.querySelector('.note-document') as HTMLElement;

  if (noteDocument) {
    noteDocument.style.width = '100vw';
  }

  setIsExtended((prev) => !prev);
}

export function handleMinimize(
  setIsExtended: React.Dispatch<React.SetStateAction<boolean>>
) {
  const aside = document.querySelector('.aside') as HTMLElement;
  if (aside) {
    aside.style.display = 'block';
  }

  const noteDocument = document.querySelector('.note-document') as HTMLElement;

  if (noteDocument) {
    noteDocument.style.width = '80vw';
  }

  setIsExtended((prev) => !prev);
}

function handleDelete({ setNoteList, index }: handleDeleteProps) {
  const noteList = localStorage.getItem('noteList');
  const savedNotes = noteList ? JSON.parse(noteList) : [];

  const updatedList = savedNotes.filter((_, i) => i !== index);
  setNoteList(updatedList);
  localStorage.setItem('noteList', JSON.stringify(updatedList));
}

export function renderNoteList({ noteList, setNoteList }: renderNoteListProps) {
  return (
    <>
      {noteList.map((noteItem, index) => (
        <div className="list-container" key={index}>
          <DeleteButton
            onAdd={() => {
              handleDelete({ setNoteList, index });
            }}
          />
          <h3>{noteItem.header}</h3>

          <p>{noteItem.note.split(' ').slice(0, 7).join(' ')}</p>
        </div>
      ))}
    </>
  );
}

// export function expandHeader() {
//   const textArea = document.querySelector('header');
//   const scrollHeight = textArea.scrollHeight;

//   textArea.style.height = `${scrollHeight}px`;
// }
