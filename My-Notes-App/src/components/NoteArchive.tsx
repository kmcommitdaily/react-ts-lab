import { ReactNode } from 'react';

interface NoteArchiveProps {
  children: ReactNode;
}

const NoteArchive: React.FC<NoteArchiveProps> = ({ children }) => {
  return <aside className="prev-list-container">{children}</aside>;
};

export default NoteArchive;
//   {renderNoteList({ noteList })}
