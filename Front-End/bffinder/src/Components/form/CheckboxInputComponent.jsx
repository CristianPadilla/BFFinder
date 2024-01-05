import { ErrorMessage, Field, useField } from "formik";
import React, {useState, useEffect} from "react";

export const CheckboxInputComponent = ({ label, ...props }) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });
// console.log(field);
  const [isChecked, setIsChecked] = useState(props.checked || false);

  useEffect(() => {
    setIsChecked(props.checked || false);
  }, [props.checked]);

  const handleInputChange = (e) => {
    // Actualiza el estado local y llama a la función proporcionada
    setIsChecked(e.target.checked);

    if (props.onInputChange) {
      props.onInputChange(e);
    }
  };
  return (
    <>
 <label className={props.labelClassName} style={{ display: 'flex', alignItems: 'center' }}>
  <span className={props.spanClassName} style={{ order: -1 }}></span>
  <input
    name={props.name}
    onChange={props.onInputChange}
    // checked={props.value}
    checked={isChecked}
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
        style={{ fontSize: '.7rem', color: 'red' }}
      />
      </div>
    </>
  );
};
