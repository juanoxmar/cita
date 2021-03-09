import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Search from './Search';
import Listing from './Listing';
import AppointmentModal from './AppointmentModal';
import axios from '../axios';

export default function Home() {
  const [services, setServices] = useState([]);
  const [show, setShow] = useState(false);
  const [currentBiz, setCurrentBiz] = useState('');
  const [currentBizName, setCurrentBizName] = useState('');
  const [appts, setAppts] = useState([]);

  const fetchAppt = (id) => {
    axios.get(`/appt/${id}`)
      .then((response) => {
        setAppts(response.data);
      })
      .catch((err) => {
        throw (err);
      });
  };

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setCurrentBiz(services[id].businessId);
    setCurrentBizName(services[id].name);
    fetchAppt(services[id].businessId);
    setShow(true);
  };
  return (
    <Container fluid>
      <Row>
        <Col>
          <Search setServices={setServices} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Listing services={services} handleShow={handleShow} />
        </Col>
      </Row>
      <Row>
        <AppointmentModal
          show={show}
          handleClose={handleClose}
          businessId={currentBiz}
          name={currentBizName}
          appts={appts}
        />
      </Row>
    </Container>
  );
}
