import { useState } from 'react';
import { ValidatorForm } from 'react-material-ui-form-validator';

export const useForm = (initialValues: any) => {
  const [values, setValues] = useState(initialValues);

  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  return {
    values,
    setValues,
    handleInput,
  };
};

export const Form = (props: any) => {
  return (
    <ValidatorForm
      onSubmit={props.onSubmit}
      onError={(errors) => console.log(errors)}
    >
      {props.children}
    </ValidatorForm>
  );
};
