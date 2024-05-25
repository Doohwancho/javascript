interface RadioButtonProps {
  id: string;
  name: string;
  label: string;
}

const CRadio: React.FC<RadioButtonProps> = ({ id, name, label }) => {
  return (
    <div className="flex items-center">
      <input
        type="radio"
        id={id}
        name={name}
        className="h-4 w-4 text-blue-600 focus:ring-2 focus:ring-blue-600 border-gray-300 rounded cursor-pointer"
      />
      <label htmlFor={id} className="ml-2 text-gray-700">
        {label}
      </label>
    </div>
  );
};

export default CRadio;
