interface AddButtonProps {
  onAdd: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({ onAdd }) => {
  return (
    <button className="add-btn" onClick={onAdd}>
      Add
    </button>
  );
};

export default AddButton;
