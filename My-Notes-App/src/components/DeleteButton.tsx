import { MouseEvent } from 'react';

interface DeleteButtonProps {
  onAdd: (event: MouseEvent<HTMLButtonElement>) => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onAdd }) => {
  return (
    <button className="delete-btn" onClick={onAdd}>
      X
    </button>
  );
};

export default DeleteButton;
