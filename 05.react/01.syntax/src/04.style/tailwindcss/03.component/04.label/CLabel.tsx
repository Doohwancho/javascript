interface CLabelProps {
  htmlFor: string;
  labelText: string;
}

const CLabel: React.FC<CLabelProps> = ({ htmlFor, labelText }) => {
  return (
    <label htmlFor={htmlFor} className="block text-gray-700 font-bold mb-2">
      {labelText}
    </label>
  );
};

export default CLabel;
