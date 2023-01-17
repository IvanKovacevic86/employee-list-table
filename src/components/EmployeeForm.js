import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import Input from "./Input";
import Button from "./Button";
import Form from "./useForm";

export default function EmployeeForm(props) {
  const {
    insertEmployee,
    handleInputChange,
    resetForm,
    values,
    recordForEdit,
    setValues,
    updateEmployee,
    formState,
  } = props;

  useEffect(() => {
    if (recordForEdit !== null) setValues({ ...recordForEdit });
  }, [recordForEdit]);

  const handleSubmit = () => {
    if (formState === "create") insertEmployee(values);
    else {
      updateEmployee(values);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Input
            type="text"
            label="Name"
            name="fullName"
            value={values.fullName}
            onChange={handleInputChange}
          />
          <Input
            type="text"
            label="Address"
            name="address"
            value={values.address}
            onChange={handleInputChange}
          />
          <Input
            type="text"
            label="Phone Number"
            name="phoneNumber"
            value={values.phoneNumber}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            type="email"
            label="Email"
            name="email"
            value={values.email}
            onChange={handleInputChange}
          />
          <Box>
            <Button type="submit" text="Submit" />
            <Button text="Reset" color="secondary" onClick={resetForm} />
          </Box>
        </Grid>
      </Grid>
    </Form>
  );
}
