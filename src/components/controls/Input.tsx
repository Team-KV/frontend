
import { TextValidator} from 'react-material-ui-form-validator';

const Input = (props: any) => {
  const { name, value, label, onChange, ...rest } = props;
  return (
    <TextValidator
      fullWidth
      label={label}
      name={name}
      onChange={onChange}
      value={value}
      {...rest}
    />
  );
};

export default Input;
