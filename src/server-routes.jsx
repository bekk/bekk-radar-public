import React from 'react';
import { Route } from 'react-router';
import Index from './Index';

export default (
  <Route>
    <Route path={`/:radarId`} component={Index} />
    <Route path={`/:radarId/:categoryId`} component={Index} />
    <Route path={`/:radarId/:categoryId/:pointId`} component={Index} />
    <Route path={`/`} component={Index} />
    <Route path={``} component={Index} />
  </Route>
);
