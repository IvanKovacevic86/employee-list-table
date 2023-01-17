import { Button } from "@mui/material";
import React from "react";

export default function ActionButtons(props) {
  const { children, onClick } = props;
  return <Button onClick={onClick}>{children}</Button>;
}
