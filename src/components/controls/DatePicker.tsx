import {
  DateTimePicker,
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import React from 'react';
import { t } from 'i18next';
import { TextField } from '@mui/material';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

const DatePicker = (props: any) => {
  const { name, value, onChange } = props;

  const convertToDefEventPara = (name: any, value: any) => ({
    target: {
      name,
      value,
    },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          variant="inline"
          inputVariant="outlined"
          label={t(name)}
          format="MM/dd/yyyy"
          value={value}
          InputAdornmentProps={{ position: 'start' }}
          onChange={(date) => onChange(convertToDefEventPara(name, date))}
        />
      </MuiPickersUtilsProvider>
    </LocalizationProvider>
  );
};

export default DatePicker;
