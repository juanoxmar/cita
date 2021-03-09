import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import axios from '../axios';

export default function Home({ setServices }) {
  const [search, setSearch] = useState({
    serviceType: '',
    city: '',
  });

  const [errMsg, setErr] = useState(null);

  const onChangeHandler = (e) => {
    setSearch({
      ...search,
      [e.target.id]: e.target.value,
    });
  };

  const onSearchHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/business', search);
      setServices(response.data);
    } catch (error) {
      setErr(error.message);
    }
  };

  return (
    <>
      <Row>
        <Container>
          <Form onSubmit={onSearchHandler} className="mt-3">
            <InputGroup className="mb-3">
              <FormControl id="serviceType" placeholder="Service?" value={search.serviceType} onChange={onChangeHandler} />
              <FormControl id="city" placeholder="City?" value={search.city} onChange={onChangeHandler} />
              <InputGroup.Append>
                <Button variant="primary" type="submit">
                  Search
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form>
          <div>{errMsg}</div>
        </Container>
      </Row>
    </>
  );
}

Home.propTypes = {
  setServices: PropTypes.func.isRequired,
};
