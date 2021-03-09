import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { MdLocationCity } from 'react-icons/md';

export default function ListingCard({ service, handleShow, idx }) {
  const {
    name, street, city, state, zip, photo,
  } = service;
  return (
    <Card onClick={() => handleShow(idx)} className="shadow-sm p-3 mb-3 bg-white rounded" border="light">
      <Card.Img variant="top" src={photo} alt="Card image" />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
      </Card.Body>
      <Card.Footer>
        <MdLocationCity />
        <span className="ml-3">{`${street} ${city}, ${state}, ${zip}`}</span>
      </Card.Footer>
    </Card>
  );
}

ListingCard.propTypes = {
  service: PropTypes.shape({
    name: PropTypes.string,
    businessId: PropTypes.string,
    serviceType: PropTypes.string,
    street: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zip: PropTypes.string,
    photo: PropTypes.string,
  }).isRequired,
  handleShow: PropTypes.func.isRequired,
  idx: PropTypes.number.isRequired,
};
