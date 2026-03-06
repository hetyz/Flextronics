import { Field, Dropdown, Option } from "@fluentui/react-components";
import { JSX } from "react";

export interface SelectOption {
  value: string;
  label: string;
  icon?: JSX.Element;
}

interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
}

const FluentSelectInput = ({
  label,
  value,
  onChange,
  options,
  placeholder = "Select...",
}: Props) => {
  const selected = value ? options.find((o) => o.value === value) : undefined;

  const buttonContent = selected ? (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
      {selected.icon}
      {selected.label}
    </span>
  ) : (
    <span style={{ opacity: 0.7 }}>{placeholder}</span>
  );

  return (
    <Field label={label}>
      <Dropdown
        button={buttonContent}
        selectedOptions={value ? [value] : []}
        onOptionSelect={(_, data) => onChange(data.optionValue ?? "")}
      >
        {options.map((o) => (
          <Option key={o.value} value={o.value} text={o.label}>
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {o.icon}
              {o.label}
            </span>
          </Option>
        ))}
      </Dropdown>
    </Field>
  );
};

export default FluentSelectInput;
