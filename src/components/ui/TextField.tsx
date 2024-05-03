interface InputProps {
  type: string;
  label: string;
  id: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
}

const TextField = ({ type, label, id, value, onChange, onKeyDown }: InputProps) => {
  return (
    <div className="flex flex-col w-full">
      <label htmlFor={id} className="pb-1 text-sm text-base-300">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className="h-12 px-4 text-sm bg-transparent border border-solid border-base-700 rounded-md"
      />
    </div>
  );
};

export default TextField;
