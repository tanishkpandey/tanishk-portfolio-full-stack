const FormField = ({
    label,
    value,
    onChange,
    type = "text",
    name,
  }: {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    name: string;
  }) => (
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-3 border rounded-lg"
      />
    </div>
  );
  
  export default FormField;
  