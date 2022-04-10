import { TextValidator } from 'react-material-ui-form-validator';
import { t } from 'i18next';
import { FormGroup, FormControlLabel, Checkbox as MuiCheckBox } from '@mui/material';

const Checkbox = (props: any) => {
  const { name, value, onChange, ...rest } = props;
  return (
    <FormGroup>
      <FormControlLabel control={<MuiCheckBox {...rest} onChange={onChange} />} label={t(name)} />
    </FormGroup>
  );
};

export default Checkbox;
