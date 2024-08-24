export interface handleAddProps {
  noteList: { header: string; note: string }[];
  setNoteList: React.Dispatch<
    React.SetStateAction<{ header: string; note: string }[]>
  >;
  setHeader: React.Dispatch<React.SetStateAction<string>>;
  setNote: React.Dispatch<React.SetStateAction<string>>;
  header: string;
  note: string;
}

export interface Note {
  header: string;
  note: string;
}

export interface renderNoteListProps {
  noteList: Note[];
  setNoteList: React.Dispatch<
    React.SetStateAction<{ header: string; note: string }[]>
  >;
  handleClick: (index: number) => void;
  setIsPreview: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface handleDeleteProps {
  setNoteList: React.Dispatch<
    React.SetStateAction<{ header: string; note: string }[]>
  >;
  index: string | number;
  setIsPreview: React.Dispatch<React.SetStateAction<boolean>>;
}
