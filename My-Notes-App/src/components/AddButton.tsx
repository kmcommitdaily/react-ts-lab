import { ReactNode } from 'react';

interface AddButtonProps {
  onAdd: () => void;
  children: ReactNode;
}

const AddButton: React.FC<AddButtonProps> = ({ onAdd, children }) => {
  return (
    <button className="add-btn" onClick={onAdd}>
      {children}
    </button>
  );
};

export default AddButton;
