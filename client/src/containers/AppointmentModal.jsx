import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import DayTimePicker from '@mooncake-dev/react-day-time-picker';
import moment from 'moment';
import axios from '../axios';

export default function AppointmentModal({ show, handleClose, business }) {
  const {
    // name,
    businessId,
    // street, city, state, zip, photo,
  } = business;

  const customer = {
    name: 'Juan Ramirez',
    phone: '555-555-2365',
  };

  const [isScheduling, setIsScheduling] = useState(false);
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduleErr, setScheduleErr] = useState('');

  const date = new Date(2021, 1, 14, 17, 0, 0);

  const valid = (slotTime) => {
    const a = moment(slotTime);
    const b = moment(date);

    const eveningBlock = new Date(
      slotTime.getFullYear(),
      slotTime.getMonth(),
      slotTime.getDate(),
      17,
      0,
      0,
    );

    const earlyMorningBlock = new Date(
      slotTime.getFullYear(),
      slotTime.getMonth(),
      slotTime.getDate(),
      8,
      0,
      0,
    );

    return a.diff(b, 'hour', true) !== 0 && slotTime.getTime() > earlyMorningBlock.getTime() && slotTime.getTime() < eveningBlock.getTime();
  };

  const handleScheduled = (calendarDate) => {
    setIsScheduling(true);
    setScheduleErr('');

    const dataObj = {
      businessId,
      customer,
      appointment: {
        date: calendarDate,
      },
    };

    axios.post('/appt', dataObj)
      .then(() => {
        setScheduleErr('');
        setIsScheduled(true);
      })
      .catch((err) => {
        setScheduleErr(err);
      })
      .finally(() => {
        setIsScheduling(false);
      });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Book Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DayTimePicker
            timeSlotSizeMinutes={60}
            isLoading={isScheduling}
            isDone={isScheduled}
            err={scheduleErr}
            timeSlotValidator={valid}
            onConfirm={handleScheduled}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

AppointmentModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  business: PropTypes.shape({
    businessId: PropTypes.string,
    name: PropTypes.string,
    serviceType: PropTypes.string,
    street: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zip: PropTypes.string,
    photo: PropTypes.string,
  }).isRequired,
};
