import React, { PropTypes, Component } from 'react';
import isEqual from 'lodash/lang/isEqual';

import Icon from '../Icon';
import downIcon from '!svg-sprite!../../images/icons/arrow-down.svg';
import upIcon from '!svg-sprite!../../images/icons/arrow-up.svg';

export default class PointListExpandButton extends Component {
  static propTypes = {
    clickHandler: PropTypes.func.isRequired,
    hide: PropTypes.bool.isRequired,
    expand: PropTypes.bool.isRequired
  };

  shouldComponentUpdate(nextProps){
    return !isEqual(this.props,nextProps);
  }

  onClick = () => {
    const { clickHandler } = this.props;
    if(clickHandler){
      clickHandler();
    }
  };

  render(){
    const {  expand, hide, clickHandler } = this.props;

    return hide ? null : (
      <button type="button" aria-label={expand ? 'Vis færre punkter' : 'Vis flere punkter'} className="points-pointList-expandButton" onClick={clickHandler}>
          {expand ? <Icon glyph={upIcon} className="icon icon--small" /> : <Icon glyph={downIcon} className="icon icon--small" /> }
      </button>
    );
  }
}
