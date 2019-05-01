import React, { Component, PropTypes } from 'react';

import Icon from './Icon';
import closeIcon from '!svg-sprite!./../images/icons/close.svg';

import './smallFilterButton.styl';

export default class SmallFilterButton extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    clickHandler: PropTypes.func.isRequired
  };

  onClick = () => {

    const { clickHandler, text } = this.props;

    if(clickHandler){
      clickHandler(text);
    }

  };

  render(){
    const { text } = this.props;

    return (
      <div className='smallFilterButton' aria-label={'Filter ' + text}>
        <span className='smallFilterButton-text'>{text}</span>
        <button type="button" aria-label={'Fjern filter ' + text} className='smallFilterButton-iconHolder' onClick={this.onClick}>
          <Icon glyph={closeIcon} className="icon icon--small" />
        </button>
      </div>
    );
  }
}