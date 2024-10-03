import { ChangeEvent } from "react";
import { AreaSelect } from "../types";

export default function Select_Area({ AREAS_REGISTROS, onChange, label, value }: { AREAS_REGISTROS: AreaSelect[], onChange: (key: string, value: string) => void, label: string, value: string }) {

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  return (
    <div className="divSelectArea">
      <label htmlFor="area">{label} </label>
      <select className="select" name="area" id="area" onChange={handleChange} value={value}>
        <option value=""></option>
        {
          AREAS_REGISTROS?.map((elemento, index) => (
            <option key={index} value={elemento.value}>
              {elemento.elemento}
            </option>
          ))
        }
      </select>
    </div>
  );
}
