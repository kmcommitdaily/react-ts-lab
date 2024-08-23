interface DeleteButtonProps {
  onAdd: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onAdd }) => {
  return (
    <button className="delete-btn" onClick={onAdd}>
      X
    </button>
  );
};

export default DeleteButton;
