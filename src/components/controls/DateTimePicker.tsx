import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker as MuiDateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { t } from 'i18next';
import cs from 'date-fns/locale/cs';


const DateTimePicker = (props: any) => {
  const { name, value, onChange } = props;

  const convertToDefEventPara = (name: any, value: any) => ({
    target: {
      name,
      value,
    },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={cs}>
      <MuiDateTimePicker
        label={t(name)}
        value={value}
        onChange={(date) => onChange(convertToDefEventPara(name, date))}
        renderInput={(params: any) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};

export default DateTimePicker;
