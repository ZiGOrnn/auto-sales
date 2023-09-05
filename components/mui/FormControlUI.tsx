"use client";

import FormControl from "@mui/joy/FormControl";
import FormHelperText from "@mui/joy/FormHelperText";
import FormLabel from "@mui/joy/FormLabel";
import { Children } from "../../src/types/children";
import { SizeProp } from "./types";

interface Props extends Children {
  label?: string;
  error?: boolean;
  size?: SizeProp;
  errorText?: string;
}

const FormControlUI = ({ children, label, error, size, errorText }: Props) => {
  return (
    <FormControl size={size} error={error}>
      <FormLabel>{label}</FormLabel>
      {children}
      {error && <FormHelperText>{errorText}</FormHelperText>}
    </FormControl>
  );
};

export default FormControlUI;
