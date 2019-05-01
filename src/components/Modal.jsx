import React, { PropTypes } from 'react';
import CssTransitionGroup from 'react-addons-css-transition-group';
import './modal.styl';

export default class Modal extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    onDismiss: PropTypes.func
  };

  handleClick = e => {
    if(e.target === this.refs.root) {
      this.props.onDismiss();
    }
  };

  render () {
    const { children } = this.props;

    // this needs to be much higher than the actual value. Because IE.
    const duration = 500;

    return (
      <CssTransitionGroup transitionName="animate"
        transitionAppear={true} transitionAppearTimeout={duration}
        transitionEnterTimeout={duration} transitionLeaveTimeout={duration}>
        <div className="modal" ref="root" onClick={this.handleClick} key="a">
          {children}
        </div>
      </CssTransitionGroup>
    );
  }
}
