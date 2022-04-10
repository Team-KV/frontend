
import { TextValidator} from 'react-material-ui-form-validator';
import { t } from 'i18next';

const Input = (props: any) => {
  const { name, value, onChange, ...rest } = props;
  return (
    <TextValidator
      fullWidth
      label={t(props.label ?? name)}
      name={name}
      onChange={onChange}
      value={value}
      {...rest}
    />
  );
};

export default Input;
