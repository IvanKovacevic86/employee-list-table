import { TextField } from "@mui/material";
import React from "react";

const textField = {
  width: "80%",
  margin: "8px",
};

export default function Input(props) {
  const { name, label, onChange, value, ...other } = props;
  return (
    <TextField
      variant="outlined"
      label={label}
      value={value}
      name={name}
      sx={textField}
      onChange={onChange}
      {...other}
    />
  );
}
