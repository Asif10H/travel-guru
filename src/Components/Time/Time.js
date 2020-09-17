import React from 'react';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const Time = () => {

  //material ui

  const [selectedDate, setSelectedDate] = React.useState(new Date('2020-08-18T21:11:54'));
  const [selectedDateFrom, setSelectedDateFrom] = React.useState(new Date('2020-08-18T21:11:54'));
  const handleDateChangeFrom = (date) => {
    setSelectedDateFrom(date);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  return (
    <div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid>
          <KeyboardDatePicker
            style={{ fontWeight: 'bold', color: 'black' }}
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="From"
            value={selectedDateFrom}
            onChange={handleDateChangeFrom}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          <KeyboardDatePicker
            style={{ fontWeight: 'bold', color: 'black' }}
            margin="normal"
            id="date-picker-dialog"
            label="To"
            format="MM/dd/yyyy"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </Grid>
      </MuiPickersUtilsProvider>
    </div>
  );
};
export default Time;