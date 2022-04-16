import { TextValidator } from 'react-material-ui-form-validator';
import { t } from 'i18next';
import { FormGroup, FormControlLabel, Checkbox as MuiCheckBox } from '@mui/material';

const Checkbox = (props: any) => {
  const { name, value, label, onChange, ...rest } = props;
  return (
    <FormGroup>
      <FormControlLabel control={<MuiCheckBox {...rest} onChange={onChange} />} label={label} />
    </FormGroup>
  );
};

export default Checkbox;
