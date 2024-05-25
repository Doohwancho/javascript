interface InputProps {
  placeholder: string;
}

const CInput: React.FC<InputProps> = ({ placeholder }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="border border-gray-300 py-2 px-4 w-full focus:outline-none focus:border-blue-500"
    />
  );
};

export default CInput;
