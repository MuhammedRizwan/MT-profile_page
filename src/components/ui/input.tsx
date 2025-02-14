import { InputFieldProps } from "@/interface/inputFieldProps";

export default function InputField({
    label,
    type,
    name,
    placeholder,
    value,
    onChange,
    error,
}: InputFieldProps) {
    return (
        <div className="flex flex-col">
            <label htmlFor={name} className="text-slate-400 mb-1 text-xs">
                {label}
            </label>
            <input
                type={type}
                name={name}
                id={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="border border-slate-400 bg-black text-slate-400 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
            />
            <p className="text-red-500 text-xs min-h-[16px]">{error || " "}</p>
        </div>
    );
}
