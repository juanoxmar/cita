import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import ListingCard from './ListingCard';

export default function Listing({ services, handleShow }) {
  return (
    <Container fluid>
      {services.map((service, idx) => (
        <Row key={service.businessId} className="mb-3">
          <ListingCard service={service} handleShow={handleShow} idx={idx} />
        </Row>
      ))}
    </Container>
  );
}

Listing.propTypes = {
  services: PropTypes.arrayOf(PropTypes.shape({
    businessId: PropTypes.string,
    name: PropTypes.string,
    serviceType: PropTypes.string,
    street: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zip: PropTypes.string,
    photo: PropTypes.string,
  })).isRequired,
  handleShow: PropTypes.func.isRequired,
};
