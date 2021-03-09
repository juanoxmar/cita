import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useAuth0 } from '@auth0/auth0-react';

export default function SignIn() {
  const { loginWithRedirect } = useAuth0();
  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Card className="shadow-sm p-3 mb-5 bg-white rounded text-center" border="light">
          <Card.Body className="justify-content-md-center">
            <Card.Title className="text-primary">
              Cita
            </Card.Title>
            <Card.Text>
              A one stop point of sale application for everyone!
            </Card.Text>
            <Button type="button" variant="primary" onClick={() => loginWithRedirect()}>
              Log In / Sign Up
            </Button>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
}
