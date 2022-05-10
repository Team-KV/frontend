import { FormControlLabel, FormGroup, Checkbox as MuiCheckBox } from '@mui/material';

const Checkbox = (props: any) => {
  const { name, value, label, onChange, ...rest } = props;
  return (
    <FormGroup>
      <FormControlLabel control={<MuiCheckBox {...rest} onChange={onChange} />} label={label} />
    </FormGroup>
  );
};

export default Checkbox;
