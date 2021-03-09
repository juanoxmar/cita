import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import moment from 'moment';
import faker from 'faker';
import DayTimePicker from '../lib/react-day-picker';

import Stripe from './Stripe';
import axios from '../axios';

export default function AppointmentModal({
  show, handleClose, businessId, appts, name,
}) {
  const customer = {
    name: faker.name.findName(),
    phone: faker.phone.phoneNumber(),
  };

  const [isScheduling, setIsScheduling] = useState(false);
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduleErr, setScheduleErr] = useState('');
  const [services, setServices] = useState([]);
  const [radioValue, setRadioValue] = useState('');
  const [radioIdx, setRadioIdx] = useState(null);
  const [amount, setAmount] = useState(null);

  useEffect(() => {
    if (show) {
      setIsScheduled(false);
      setIsScheduling(false);
      setScheduleErr('');
      setAmount(null);
      setRadioValue('');
      setRadioIdx(null);
      axios.get(`/service/${businessId}`)
        .then((response) => {
          setServices(response.data);
        })
        .catch((err) => {
          throw err;
        });
    }
  }, [show]);

  const modalHandleClose = () => {
    handleClose();
  };

  const radioChangeHandler = (e, idx) => {
    setRadioValue(e.currentTarget.value);
    setRadioIdx(idx);
    setAmount(services[idx].price);
  };

  const valid = (slotTime) => {
    const a = moment(slotTime);

    const everyCheck = appts.every((appt) => a.diff(appt, 'hour', true));

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

    return everyCheck
      && slotTime.getTime() > earlyMorningBlock.getTime()
      && slotTime.getTime() < eveningBlock.getTime();
  };

  const handleScheduled = (calendarDate) => {
    setIsScheduling(true);
    setScheduleErr('');

    const dataObj = {
      businessId,
      customer,
      appointment: {
        date: calendarDate,
        service: radioValue,
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

  const toggleButtons = services.map(({ service, price }, idx) => (
    <ToggleButton
      key={service}
      type="radio"
      value={service}
      checked={radioValue === service}
      index={idx}
      onChange={(e) => radioChangeHandler(e, idx)}
    >
      {`${service} - $${price}`}
    </ToggleButton>
  ));

  return (
    <>
      <Modal show={show} onHide={modalHandleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>{name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row lg={1} xl={2}>
              <Col className="mb-3">
                <Container>
                  <Row className="d-flex justify-content-center">
                    <ButtonGroup vertical toggle className="mt-3">
                      {toggleButtons}
                    </ButtonGroup>
                  </Row>
                  <Row className="mt-3 mx-0 d-flex justify-content-center">
                    {radioIdx !== null ? services[radioIdx].description : null}
                  </Row>
                </Container>
              </Col>
              <Col>
                {amount ? (
                  <DayTimePicker
                    timeSlotSizeMinutes={60}
                    isLoading={isScheduling}
                    isDone={isScheduled}
                    err={scheduleErr}
                    timeSlotValidator={valid}
                    onConfirm={handleScheduled}
                    doneText="Your Appointment has been booked!"
                    amount={amount}
                    Stripe={Stripe}
                  />
                ) : null}
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={modalHandleClose}>
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
  businessId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  appts: PropTypes.arrayOf(PropTypes.string).isRequired,
};
