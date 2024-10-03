import { ChangeEvent } from "react";

export function Inputs({ onChange, name, type, value, label, placeholderText }: { onChange: (key: string, value: string) => void, name: string, type: string, value: string | undefined, label: string, placeholderText: string | undefined }) {

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.name, e.target.value);
  };

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input onChange={handleChange} type={type} name={name} id={name} value={value} placeholder={placeholderText} />
    </div>
  );
}