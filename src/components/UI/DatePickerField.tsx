import { DatePicker } from "material-ui-pickers";
import React from "react";

const DatePickerField = ({ field, form, ...other }) => {
  const currentError = form.errors[field.name];
  return (
    <DatePicker
      id="datepicker"
      keyboard
      clearable
      disablePast
      name={field.name}
      value={field.value}
      format="yyyy/MM/dd"
      helperText={currentError}
      error={Boolean(currentError)}
      onError={(_, error) => form.setFieldError(field.name, error)}
      onChange={date => form.setFieldValue(field.name, date, true)}
      mask={value => {
        return value
          ? [/\d/, /\d/, /\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/]
          : [];
      }}
      {...other}
    />
  );
};

export default DatePickerField;
