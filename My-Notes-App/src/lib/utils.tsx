// types

import {
  handleAddProps,
  renderNoteListProps,
  handleDeleteProps,
  Note,
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

interface handleNewNoteProps {
  setHeader: React.Dispatch<React.SetStateAction<string>>;
  setNote: React.Dispatch<React.SetStateAction<string>>;
  setIsPreview: React.Dispatch<React.SetStateAction<boolean>>;
}

export function handleNewNote({
  setHeader,
  setNote,
  setIsPreview,
}: handleNewNoteProps) {
  setHeader('');
  setNote('');
  setIsPreview(false);
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

function handleDelete({ setNoteList, index, setIsPreview }: handleDeleteProps) {
  const noteList = localStorage.getItem('noteList');
  const savedNotes = (noteList ? JSON.parse(noteList) : []) as Note[];

  const updatedList = savedNotes.filter((_, i) => i !== index);

  setNoteList(updatedList);
  localStorage.setItem('noteList', JSON.stringify(updatedList));
  setIsPreview(false);
  console.log('After delete:', { index, isPreview: setIsPreview });
}

export function renderNoteList({
  noteList,
  setNoteList,
  handleClick,
  setIsPreview,
}: renderNoteListProps) {
  return (
    <>
      {noteList.map((noteItem, index) => (
        <div
          className="list-container"
          key={index}
          onClick={() => {
            handleClick(index);
          }}>
          <DeleteButton
            onAdd={() => {
              handleDelete({ setNoteList, index, setIsPreview });
            }}
          />
          <h3>{noteItem.header}</h3>

          <p>{noteItem.note.split(' ').slice(0, 7).join(' ')}...</p>
        </div>
      ))}
    </>
  );
}

// try to make it more cleaner
