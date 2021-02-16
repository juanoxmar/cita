/* eslint-disable no-nested-ternary */
// modified version of https://github.com/mooncake-dev/react-day-time-picker
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import dateFns from 'date-fns';
import { ThemeProvider } from 'styled-components';

import {
  PopupWrapper, Popup, PopupHeader, PopupClose,
} from './Popup';
import {
  DayIcon, ClockIcon, SuccessIcon, FailedIcon,
} from './Icons';
import { Success, Failed } from './Feedback';

import Calendar from './calendar';
import TimeSlots from './time-slots';

import { preventPastDays } from './validators';

function DayTimePicker({
  timeSlotValidator,
  timeSlotSizeMinutes,
  isLoading,
  isDone,
  err,
  onConfirm,
  doneText,
  theme,
  amount,
  Stripe,
}) {
  const [pickedDay, setPickedDay] = useState(null);
  const [pickedTime, setPickedTime] = useState(null);
  const [showPickTime, setShowPickTime] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handlePickDay = (day) => {
    setPickedDay(day);
    setShowPickTime(true);
  };

  const handlePickTime = (time) => {
    setPickedTime(time);
    setShowPickTime(false);
    setShowConfirm(true);
  };

  const handleClosePickTime = () => {
    setShowPickTime(false);
  };

  const handleConfirm = () => {
    onConfirm(pickedTime);
  };

  const handleCloseConfirm = () => {
    setShowConfirm(false);
    setShowPickTime(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <PopupWrapper>
        <Calendar validator={preventPastDays} pickDay={handlePickDay} />

        {showPickTime && (
          <Popup>
            <PopupHeader>
              <p>
                <DayIcon />
                {' '}
                {dateFns.format(pickedDay, 'dddd, MMMM Do, YYYY')}
              </p>
              <p>
                <PopupClose onClick={handleClosePickTime}>Go Back</PopupClose>
              </p>
            </PopupHeader>

            <TimeSlots
              pickedDay={pickedDay}
              slotSizeMinutes={timeSlotSizeMinutes}
              validator={timeSlotValidator}
              pickTime={handlePickTime}
            />
          </Popup>
        )}

        {showConfirm && (
          <Popup>
            <PopupHeader>
              <p>
                <DayIcon />
                {' '}
                {dateFns.format(pickedTime, 'dddd, MMMM Do, YYYY')}
              </p>

              <p>
                <ClockIcon />
                {' '}
                {dateFns.format(pickedTime, 'h:mm a')}
              </p>

              {!isDone && (
                <p>
                  <PopupClose disabled={isLoading} onClick={handleCloseConfirm}>
                    Go Back
                  </PopupClose>
                </p>
              )}
            </PopupHeader>

            {!isDone ? (
              <>
                <Stripe handleConfirm={handleConfirm} amount={amount} />
              </>
            ) : doneText ? (
              <Success>
                <p>
                  <SuccessIcon />
                  {' '}
                  {doneText}
                </p>
              </Success>
            ) : null}

            {err && (
              <Failed>
                <p>
                  <FailedIcon />
                  {' '}
                  {err}
                </p>
              </Failed>
            )}
          </Popup>
        )}
      </PopupWrapper>
    </ThemeProvider>
  );
}

DayTimePicker.propTypes = {
  timeSlotValidator: PropTypes.func.isRequired,
  Stripe: PropTypes.elementType.isRequired,
  amount: PropTypes.number,
  timeSlotSizeMinutes: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isDone: PropTypes.bool.isRequired,
  err: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  doneText: PropTypes.string,
  theme: PropTypes.shape({
    primary: PropTypes.string,
    secondary: PropTypes.string,
    background: PropTypes.string,
    buttons: PropTypes.shape({
      disabled: PropTypes.shape({
        color: PropTypes.string,
        background: PropTypes.string,
      }),
      confirm: PropTypes.shape({
        color: PropTypes.string,
        background: PropTypes.string,
        hover: PropTypes.shape({
          color: PropTypes.string,
          background: PropTypes.string,
        }),
      }),
    }),
  }),
};

DayTimePicker.defaultProps = {
  amount: null,
  doneText: 'Your event has been scheduled!',
  theme: {
    primary: '#3a9ad9',
    secondary: '#f0f0f0',
    background: '#fff',
    buttons: {
      disabled: {
        color: '#333',
        background: '#dfdfdf',
      },
      confirm: {
        color: '#fff',
        background: '#3a9ad9',
        hover: {
          color: '',
          background: '#3a9ad9d6',
        },
      },
    },
    feedback: {
      success: {
        color: '#29aba4',
      },
      failed: {
        color: '#eb7260',
      },
    },
  },
};

export default DayTimePicker;
