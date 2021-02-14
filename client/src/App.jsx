import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Home from './containers/Home';
import Listing from './containers/Listing';
import AppointmentModal from './containers/AppointmentModal';

export default function App() {
  const [services, setServices] = useState([]);
  const [show, setShow] = useState(false);
  const [currentBiz, setCurrentBiz] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setCurrentBiz(services[id]);
    setShow(true);
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <Home setServices={setServices} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Listing services={services} handleShow={handleShow} />
        </Col>
      </Row>
      <Row>
        <AppointmentModal show={show} handleClose={handleClose} business={currentBiz} />
      </Row>
    </Container>
  );
}
