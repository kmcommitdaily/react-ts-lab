import { ChangeEvent } from 'react';

interface NotePadBodyProps {
  value: string | number | readonly string[];
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  name: string;
  id: string;
  cols: number;
  rows: number;
}

const NotePadBody: React.FC<NotePadBodyProps> = ({
  value,
  onChange,
  name,
  id,
  cols,
  rows,
}) => {
  return (
    <textarea
      name={name}
      id={id}
      cols={cols}
      rows={rows}
      value={value}
      onChange={onChange}></textarea>
  );
};

export default NotePadBody;
