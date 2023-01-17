import React from "react";

export default function Form(props) {
  const { children, onSubmit, onClick } = props;

  return (
    <form onSubmit={onSubmit} onClick={onClick}>
      {children}
    </form>
  );
}
