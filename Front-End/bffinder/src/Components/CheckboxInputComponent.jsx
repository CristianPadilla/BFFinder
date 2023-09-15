import { ErrorMessage, Field, useField } from "formik";
import React from "react";

export const CheckboxInputComponent = ({ label, ...props }) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });
  // console.log(field);
  return (
    <>
      <label className={props.labelClassName}>
        <input
          type="checkbox"
          className={props.className}
          {...field}
          {...props}
          placeholder={props.placeholder}
        />
        <span className={props.spanClassName}></span>
        {label}
      </label>

      <ErrorMessage name={props.name} component="span" className={props.errorClassName} />
    </>
  );
};
