import { ChangeEvent } from 'react';

interface NotePadHeaderProps {
  value: string | number | readonly string[];
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  name: string;
  id: string;
  cols: number;
  rows: number;
}

const NotePadHeader: React.FC<NotePadHeaderProps> = ({
  value,
  onChange,
  name,
  id,
  cols,
  rows,
}) => {
  return (
    <textarea
      className="header"
      name={name}
      id={id}
      cols={cols}
      rows={rows}
      value={value}
      onChange={onChange}></textarea>
  );
};

export default NotePadHeader;
