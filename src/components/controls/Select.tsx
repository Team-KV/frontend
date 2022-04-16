import { MenuItem, TextField } from '@mui/material';
import { t } from 'i18next';

const Select = (props: any) => {
  const { name, value, label, onChange, options, ...rest } = props;

  return (
    <TextField
      {...rest}
      label={label}
      name={name}
      onChange={onChange}
      select
      value={value}
      fullWidth
    >
      {options.map((option: any) => (
        <MenuItem key={option.id} value={option.value}>
          {t(option.label ?? option.id)}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default Select;
