import React, { PropTypes, Component } from 'react';
import bekkLogo from '../../images/logo.svg';
import RadarAnimation from './RadarAnimation';

import './radarIntro.styl';
import IntroButton from './introButton';

class RadarIntro extends Component {
  static propTypes = {
    radar: PropTypes.object.isRequired,
    actions: PropTypes.objectOf(PropTypes.func).isRequired
  };

  goToRadar = (categoryId) => {
    return () =>
    {
      const {radar: {categories}, actions: {selectCategory}} = this.props;
      let category = categories[categoryId];
      selectCategory(category);
    };
  };

  render () {
    const { title, intro } = this.props.radar;
    const introSplit = intro.replace(/([.?!])\s*(?=[A-Z])/g, '$1|').split('|'); //split sentences

    const {radar: {categories}} = this.props;

    return (
      <div style={{height: '100%', position: 'relative'}}>

        <div className="radarIntro">
          <div className="radarIntro-logo">
            <img src={bekkLogo} className="radarIntro-logo-image" alt="Bekk-logo" />
          </div>
          <span className="radarIntro-name">{title}</span>

          <div className="radarIntro-text">
            {introSplit.map((p, i) => <p key={i}>{p}</p>)}
          </div>

          <div>Gå til radar:</div>

          <div className={"radarIntro-navbar"}>
            {Object.keys(categories).map(id =>
            (<IntroButton onClick={this.goToRadar(id)} title={categories[id].title} categoryId={id} key={id}/>))}
          </div>
        </div>
        <RadarAnimation className="radarIntro-backgroundAnimation" />
      </div>
    );
  }
}

export default RadarIntro;
