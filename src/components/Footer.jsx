import React, { Component } from 'react';
import Icon from './Icon';

import './footer.styl';
import twitter from '!svg-sprite!../images/icons/twitter.svg';
import facebook from '!svg-sprite!../images/icons/facebook.svg';
import linkedin from '!svg-sprite!../images/icons/linkedin.svg';
import share from '!svg-sprite!../images/icons/share.svg';

class Footer extends Component {
  render () {
    return (
      <div className="footer">
        <div className="footer-firstRow">
          <div className="footer-feedback">Gi tilbakemeldinger</div>
          <ul className="footer-buttonList">
            <li className="footer-buttonListItemShare">
              <Icon glyph={share} />
            </li>
            <li className="footer-buttonListItemFacebook">
              <Icon glyph={facebook} />
            </li>
            <li className="footer-buttonListItemTwitter">
              <Icon glyph={twitter} />
            </li>
            <li className="footer-buttonListItemLinkedin">
              <Icon glyph={linkedin} />
            </li>
          </ul>
        </div>
        <ul className="footer-linkList">
          <li>Gå til:</li>
          <li><a href="http://open.bekk.no">Bekk Open</a></li>
          <li><a href="http://open.bekk.no">bekk.no</a></li>
        </ul>
      </div>
    );
  }
}

export default Footer;
