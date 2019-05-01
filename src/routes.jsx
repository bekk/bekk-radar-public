import React from 'react';
import { Route } from 'react-router';
import App from './containers/App';
import RadarIndex from './containers/RadarIndex';
import virtualPath from './config/virtualPath';

export default (
  <Route>
    <Route path={`${virtualPath}/:radarId`} component={App} />
    <Route path={`${virtualPath}/:radarId/:categoryId`} component={App} />
    <Route path={`${virtualPath}/:radarId/:categoryId/:pointId`} component={App} />
    <Route path={`${virtualPath}/`} component={RadarIndex} />
    <Route path={`${virtualPath}`} component={RadarIndex} />
  </Route>
);
