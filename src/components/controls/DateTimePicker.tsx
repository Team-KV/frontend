import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker as MuiDateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { TextValidator } from 'react-material-ui-form-validator';

const DateTimePicker = (props: any) => {
  const { name, value, label, onChange, ...rest } = props;

  const convertToDefEventPara = (name: any, value: any) => ({
    target: {
      name,
      value,
    },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MuiDateTimePicker
        label={label}
        value={value}
        inputFormat="dd.MM.yyyy hh:mm"
        mask={'__.__.____ __:__'}
        onChange={(date) => onChange(convertToDefEventPara(name, date))}
        renderInput={(params: any) => (
          <TextValidator fullWidth {...params} {...rest} value={value} />
        )}
      />
    </LocalizationProvider>
  );
};

export default DateTimePicker;
