interface ButtonProps {
  onClick: () => void;
}

const CButton: React.FC<ButtonProps> = ({ onClick }) => {
  return (
    <button className="bg-sky-500 hover:to-blue-200 text-white font-bold py-2 px-4 rounded">
      Button
    </button>
  );
};

export default CButton;
