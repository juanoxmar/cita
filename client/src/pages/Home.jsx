import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavBar from 'react-bootstrap/Navbar';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import axios from '../axios';

export default function Home({ setServices }) {
  const [search, setSearch] = useState({
    service: '',
    location: '',
  });

  const [loading, setLoading] = useState(false);
  const [errMsg, setErr] = useState(null);

  const onChangeHandler = (event) => {
    setSearch({
      ...search,
      [event.target.id]: event.target.value,
    });
  };

  const onSearchHandler = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/services');
      setServices([{ listing: response.data }]);
      setLoading(false);
    } catch (error) {
      setErr(error.message);
      setLoading(false);
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <NavBar>
            <NavBar.Brand>Cita</NavBar.Brand>
          </NavBar>
        </Col>
      </Row>
      <Row>
        <Container>
          <InputGroup className="mb-3">
            <FormControl id="service" placeholder="Service?" value={search.service} onChange={onChangeHandler} />
            <FormControl id="location" placeholder="City and State?" value={search.location} onChange={onChangeHandler} />
            <InputGroup.Append>
              <Button variant="primary" onClick={onSearchHandler}>
                { loading ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : 'Search' }
              </Button>
            </InputGroup.Append>
          </InputGroup>
          <div>{errMsg}</div>
        </Container>
      </Row>
    </Container>
  );
}
