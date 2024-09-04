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
  const savedNotes = (noteList ? JSON.parse(noteList) : []) as Note[];

  const updatedList = savedNotes.filter((_, i) => i !== index);

  setNoteList(updatedList);
  localStorage.setItem('noteList', JSON.stringify(updatedList));
}

export function handleSaveNote({
  noteList,
  setNoteList,
  setHeader,
  setNote,
  header,
  note,
  editIndex,
}: handleAddProps & { editIndex: number }) {
  const updatedNoteList = noteList.map((n, index) =>
    index === editIndex ? { header, note } : n
  );

  localStorage.setItem('noteList', JSON.stringify(updatedNoteList));
  setNoteList(updatedNoteList);
  setHeader('');
  setNote('');
}

export function renderNoteList({
  noteList,
  setNoteList,
  handleClick,
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
          <div className="archive-container">
            <DeleteButton
              onAdd={(event) => {
                event.stopPropagation();
                handleDelete({ setNoteList, index });
              }}
            />
            <h3 className="archive-header">{noteItem.header}</h3>
          </div>
          <p className="archive-body">
            {noteItem.note.split(' ').slice(0, 7).join(' ')}...
          </p>
        </div>
      ))}
    </>
  );
}

// try to make it more cleaner
