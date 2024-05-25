interface CheckboxProps {
  id: string;
  label: string;
}

const CCheckbox: React.FC<CheckboxProps> = ({ id, label }) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={id}
        className="h-4 w-4 text-blue-600 focus:ring-2 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
      />
      <label htmlFor={id} className="ml-2 text-gray-700">
        {label}
      </label>
    </div>
  );
};

export default CCheckbox;
