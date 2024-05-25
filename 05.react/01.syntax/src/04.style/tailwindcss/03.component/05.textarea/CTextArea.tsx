interface TextAreaProps {
  placeholder: string;
}

const CTextArea: React.FC<TextAreaProps> = ({ placeholder }) => {
  return (
    <textarea
      placeholder={placeholder}
      className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:border-blue-500 resize-none"
    />
  );
};

export default CTextArea;
