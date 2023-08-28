import { InputHTMLAttributes } from "react";
import {FormInputLabel, Group, Input} from "./form-input.styles";

export type FormInputProps = {
  label: string;
} & InputHTMLAttributes<HTMLInputElement>;

const FormInput = ({ label, ...inputProps }: FormInputProps) => {
  return (
    <Group>
      <Input {...inputProps} />
      {label && (
        <FormInputLabel
          shrink={Boolean(inputProps.value && typeof inputProps.value === "string" && inputProps.value.length).toString()}
        >
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
};

export default FormInput;
