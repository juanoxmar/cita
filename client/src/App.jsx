import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import { useAuth0 } from '@auth0/auth0-react';

import Signin from './components/Signin';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Profile from './components/Profile';

export default function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  let routes = (
    <>
      <Route path="/" component={Signin} />
      <Redirect to="/" />
    </>
  );

  if (isLoading) {
    routes = (
      <>
        <Row className="mt-5 d-flex justify-content-center">
          <Spinner animation="border" variant="primary" />
        </Row>
      </>
    );
  }

  if (isAuthenticated) {
    routes = (
      <>
        <Route path="/profile" exact component={Profile} />
        <Route path="/" exact component={Home} />
      </>
    );
  }

  return (
    <>
      <Navigation />
      <Container>
        <Switch>
          {routes}
        </Switch>
      </Container>
    </>
  );
}
