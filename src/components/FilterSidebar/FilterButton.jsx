import React, { PropTypes, Component } from 'react';
import cx from 'classnames';
import Icon from '../Icon';

import './filterButton.styl';
import check from '!svg-sprite!../../images/icons/check.svg';

export default class FilterButton extends Component {
  static propTypes = {
    onClick : PropTypes.func.isRequired,
    filterValue: PropTypes.string,
    children: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired
  };

  handleClick = () => {
    this.props.onClick(this.props.filterValue);
  };

  render() {
    const { children, isSelected } = this.props;

    const classNames = cx('filterButton', {'is-selected' : isSelected});
    return (
      <button
        type="button"
        onClick={this.handleClick}
        className={classNames}
        role="checkbox"
        aria-checked={isSelected ? 'true' : 'false'}
        data-toggle={isSelected}>
        <Icon glyph={check} className="filterButton-icon"/>
        {children}
      </button>
    );
  }
}
