import { ErrorMessage, Field, useField } from "formik";
import React from "react";

export const CheckboxInputComponent = ({ label, ...props }) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });
  // console.log(field);
  return (
    <>
 <label className={props.labelClassName} style={{ display: 'flex', alignItems: 'center' }}>
  <span className={props.spanClassName} style={{ order: -1 }}>{/* Estilo para el span (checkbox) */}
    {/* Contenido del checkbox */}
  </span>
  <input
    name={props.name}
    onChange={props.onInputChange}
    checked={props.value}
    type="checkbox"
    className={props.className}
    style={{ margin: 0, padding: 0 }}
    {...field}
    {...props}
  />
  <span style={{ flex: 1, paddingLeft: '80px' }}>{label}</span>
</label>


      <div style={{ textAlign: 'center' }}>
        <ErrorMessage
        name={props.name}
        component="span"
        className={props.errorClassName}
        style={{ fontSize: '.7rem' }}
      />
      </div>
    </>
  );
};
