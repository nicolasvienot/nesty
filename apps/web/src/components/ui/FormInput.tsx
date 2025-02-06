type FormInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export function FormInput({
  label,
  error,
  className = "",
  ...props
}: FormInputProps) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-foreground/70">
          {label}
        </label>
      )}
      <input
        className={`w-full p-3 rounded bg-background border border-foreground/20 
          focus:border-foreground/40 outline-none ${error ? "border-red-500" : ""} 
          ${className}`}
        {...props}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
