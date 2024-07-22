import { ChangeEvent } from "react";

export function LabelInput({
  label,
  placeholder,
  onChange,
  type,
}: LabelledInputType) {
  return (
    <div className="auth">
      <label className="block mb-1 mt-1 text-sm font-medium text-black">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type ? type : "text"}
        id={label}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        placeholder={placeholder}
        required
      />
    </div>
  );
}
export interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  auth?: string;
}
