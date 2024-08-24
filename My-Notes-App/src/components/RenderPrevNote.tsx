import { Note } from '../lib/types';

interface handleRenderPreProps {
  setHeader: React.Dispatch<React.SetStateAction<string>>;
  setNote: React.Dispatch<React.SetStateAction<string>>;
  index: number;
  setIsPreview: React.Dispatch<React.SetStateAction<boolean>>;
}

export function handleRenderPrev({
  setHeader,
  setNote,
  index,
  setIsPreview,
}: handleRenderPreProps) {
  const noteList = localStorage.getItem('noteList');
  const savedNotes = (noteList ? JSON.parse(noteList) : []) as Note[];

  const renderHeader = savedNotes[index]?.header || '';
  const renderNote = savedNotes[index]?.note || '';

  setHeader(renderHeader);
  setNote(renderNote);
  setIsPreview(true);
}
