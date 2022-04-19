import { TextValidator } from 'react-material-ui-form-validator';
import { Autocomplete as MuiAutocomplete } from '@mui/material';

const Autocomplete = (props: any) => {
  const { name, value, label, onChange, options, ...rest } = props;
  return (
    <MuiAutocomplete
      id={name}
      disablePortal
      onChange={onChange}
      options={options}
      value={value}
      renderInput={(params: any) => (
        <TextValidator {...params} {...rest} label={label} value={value}/>
      )}
    />
  );
};

export default Autocomplete;
