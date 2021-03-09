import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import CardColumns from 'react-bootstrap/CardColumns';

import ListingCard from './ListingCard';

export default function Listing({ services, handleShow }) {
  return (
    <Container>
      <CardColumns>
        {services.map((service, idx) => (
          <ListingCard
            key={service.businessId}
            service={service}
            handleShow={handleShow}
            idx={idx}
          />
        ))}
      </CardColumns>
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
