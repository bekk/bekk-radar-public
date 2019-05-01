import React, { Component, PropTypes } from 'react';
import './logo.styl';
import bekkLogo from '../images/logo.svg';
import { buildUrlToIndex } from '../lib/urlBuilders';

export default class Logo extends Component {
  static propTypes = {
    radarTitle: PropTypes.string.isRequired
  };

  render () {
    const { radarTitle } = this.props;
    const indexUrl = buildUrlToIndex();

    return (
      <div className="logo">
        <a className="logo-bekkLink" href={indexUrl} aria-label="Tilbake til radaroversikten">
          <img src={bekkLogo} className="logo-bekkLink-image" alt="BEKK logo" />
        </a>
        <h1 className='logo-radarName'>
          <span className="logo-radarName-link">
            {radarTitle}
          </span>
        </h1>
      </div>
    );
  }
}
