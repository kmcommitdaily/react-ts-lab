interface ExtendButtonProps {
  isExtended: boolean;
  onExtend: () => void;
  onMinimize: () => void;
}

const ExtendButton: React.FC<ExtendButtonProps> = ({
  isExtended,
  onExtend,
  onMinimize,
}) => {
  return (
    <button
      className="extend-btn"
      onClick={() => {
        if (!isExtended) {
          onExtend();
        } else {
          onMinimize();
        }
      }}>
      {isExtended ? 'Minimize' : 'Extend'}
    </button>
  );
};

export default ExtendButton;
