interface InputProps {
  type: string;
  label: string;
  id: string;
}

const TextField = ({ type, label, id }: InputProps) => {
  return (
    <div className="flex flex-col w-full">
      <label htmlFor={id} className="pb-1 text-sm text-neutral-700">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        className="h-11 px-4 text-sm border border-solid border-neutral-300 rounded-md"
      />
    </div>
  );
};

export default TextField;
