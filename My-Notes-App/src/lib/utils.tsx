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
}: handleAddProps) {
  const newNote = { header, note }; // store them to one variable
  const updatedNoteList = [...noteList, newNote]; // append to old list
  localStorage.setItem('noteList', JSON.stringify(updatedNoteList)); // save to local storage
  setNoteList(updatedNoteList); // update the existing list
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
  {
    /** clean this or add types */
  }
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

// try to make it more cleaner
