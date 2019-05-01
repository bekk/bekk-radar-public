import React, { Component } from 'react';
import { Link } from 'react-router';
import radarContainers from '../content';
import bekkLogo from '../images/logo.svg';
import placeholderImage from '../images/radar-index-placeholder.jpg';
import { getCoverImage } from '../content';
import { buildUrlToRadar } from '../lib/urlBuilders';
import getAvailableRadars from '../lib/getAvailableRadars';
import { breakpoints } from '../lib/media';
import './radarIndex.styl';

const radars = getAvailableRadars(radarContainers);

export default class RadarIndex extends Component {
  constructor(props){
    super(props);

    this.state = { isSmallDevice: false, isRetinaDevice : false};
  }

  componentWillMount(){
    this.mediaQueryListSmall = window.matchMedia(`screen and (max-width: ${breakpoints.maxSmall})`);
    this.mediaQueryListRetina = window.matchMedia(`screen and (min-width: ${breakpoints.minRetina})`);

    this.mediaQueryListSmall.addListener(this.handleMediaQueryChanged);
    this.mediaQueryListRetina.addListener(this.handleMediaQueryChanged);
    this.handleMediaQueryChanged();
  }

  componentWillUnmount() {
    this.mediaQueryListSmall.removeListener(this.handleMediaQueryChanged);
    this.mediaQueryListRetina.removeListener(this.handleMediaQueryChanged);
  }

  handleMediaQueryChanged = () => {

    this.setState({
      isSmallDevice: this.mediaQueryListSmall.matches,
      isRetinaDevice: this.mediaQueryListRetina.matches
    });
  };

  render() {

    const { isSmallDevice, isRetinaDevice } = this.state;

    const links = radars.map(function(radar){

      let imageUrl = getCoverImage(radar.id);
      const extension = imageUrl.substr(imageUrl.lastIndexOf('.'));

      // Only do this for new radars
      if(radar.id === 'ux2016' || radar.id === 'tech2016'){

        if(isRetinaDevice){
          imageUrl = imageUrl.replace(extension,`-retina${extension}`);
        } else if(isSmallDevice){
          imageUrl = imageUrl.replace(extension,`-small${extension}`);
        }

      } else {
        if( !imageUrl || !imageUrl.length){
          imageUrl = placeholderImage;
        }
      }
      return (
        <li key={radar.id} className="radarIndex-radars-list-radar">
          <Link to={buildUrlToRadar(radar)}
            className="radarIndex-radars-list-radar-link">
            <div className="radarIndex-radars-list-radar-link-image"
              style={{backgroundImage: `url('${imageUrl}')`}} />
            <div className="radarIndex-radars-list-radar-link-textWrapper">
              <span className="radarIndex-radars-list-radar-link-textWrapper-text">{radar.title}</span>
            </div>
          </Link>
        </li>
      );
    });

    return (
      <div>
        <header className="radarIndex">
          <div className="radarIndex-header">
            <div className="radarIndex-header-container">
              <img className="radarIndex-header-logo" src={bekkLogo} alt="logo"/>
              <span className="radarIndex-header-text">Radar</span>
            </div>
          </div>
        </header>
        <div className="radarIndex-radars">
          <ul className="radarIndex-radars-list">{links}</ul>
        </div>
      </div>
    );
  }
}
