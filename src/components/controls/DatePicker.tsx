import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextValidator } from 'react-material-ui-form-validator';

const DatePicker = (props: any) => {
  const { name, value, label, onChange, ...rest } = props;

  const convertToDefEventPara = (name: any, value: any) => ({
    target: {
      name,
      value,
    },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MuiDatePicker
        label={label}
        value={value}
        inputFormat="dd.MM.yyyy"
        mask={'__.__.____'}
        onChange={(date) => onChange(convertToDefEventPara(name, date))}
        renderInput={(params: any) => <TextValidator fullWidth {...params} {...rest} value={value}/>}
      />
    </LocalizationProvider>
  );
};

export default DatePicker;
