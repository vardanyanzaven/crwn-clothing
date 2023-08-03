import { InputHTMLAttributes } from "react";
import {FormInputLabel, Group, Input} from "./form-input.styles";

export type FormInputProps = {
  label: string;
  // inputProps: InputHTMLAttributes<HTMLInputElement>;
} & InputHTMLAttributes<HTMLInputElement>;

const FormInput = ({ label, ...inputProps }: FormInputProps) => {
  console.log(
    Boolean(
      inputProps.value &&
        typeof inputProps.value === "string" &&
        inputProps.value.length
    )
  );
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
