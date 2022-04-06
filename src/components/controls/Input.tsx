import { RestaurantMenu } from '@mui/icons-material';
import { TextField } from '@mui/material';
import { t } from 'i18next';

const Input = (props: any) => {
  const { name, value, onChange, ...rest } = props;
  return (
    <div>
      <TextField
        fullWidth
        label={t(props.label ?? name)}
        name={name}
        onChange={onChange}
        value={value}
        {...rest}
      />
    </div>
  );
};

export default Input;
