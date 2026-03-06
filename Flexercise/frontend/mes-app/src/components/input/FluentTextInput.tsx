import { Field, Input } from "@fluentui/react-components";

interface TextInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const FluentTextInput = ({
  label,
  value,
  onChange,
  placeholder,
}: TextInputProps) => {
  return (
    <Field label={label}>
      <Input
        value={value}
        placeholder={placeholder}
        onChange={(_, data) => onChange(data.value)}
      />
    </Field>
  );
};

export default FluentTextInput;
