import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Listings from './pages/Listings';

export default function App() {
  const [services, setServices] = useState([]);
  return (
    <Switch>
      <Route path="/listing" render={() => <Listings services={services} />} />
      <Route path="/" render={() => <Home setServices={setServices} />} />
    </Switch>
  );
}
