import { ChangeEvent } from "react";

export function ComponenteEntrada({ onChange, name, type, value, label, placeholderText, id }: { onChange: (key: string, value: string | boolean) => void, name: string, type: string, value?: string | boolean, label: string, placeholderText?: string, id: string }) {
  let valueBoolean = false;
  let valueText = '';
  let clase = "";

  if (typeof (value) === 'boolean') {
    clase = "inputComponenteEntradaCheckbox";
    valueBoolean = value;
  } else {
    clase = "inputComponenteEntrada";
    if (value) valueText = value;
  }

  const handleChangeDebounce = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, type, value, checked } = e.target as HTMLInputElement;
    if (type === 'checkbox') {
      onChange(name, checked);
    } else {
      onChange(name, value);
    }
  };

  return (
    <div className="entrada" >
      <label className="labelComponenteEntrada" id={id} >
        {label}
      </label>
      {
        type === 'textarea' ? (
          <textarea className="textareaComponenteEntrada"
            id={id}
            name={name}
            value={valueText || ''}
            onChange={handleChangeDebounce} />
        ) : (
          <input className={clase}
            type={type}
            id={id}
            name={name}
            checked={type === 'checkbox' ? valueBoolean : undefined}
            value={type === 'checkbox' ? undefined : valueText}
            onChange={handleChangeDebounce}
            placeholder={placeholderText} />
        )
      }
    </div>
  );
}