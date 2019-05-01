import React, { PropTypes, Component } from 'react';

import Icon from './../Icon';
import filter from '!svg-sprite!../../images/icons/filter.svg';
import heart from '!svg-sprite!../../images/icons/heart.svg';
import heartEmpty from '!svg-sprite!../../images/icons/heart-empty.svg';
import search from '!svg-sprite!../../images/icons/search.svg';


class MenuButton extends React.Component {
  static propTypes = {
    buttonTitle: PropTypes.string.isRequired,
    filters: PropTypes.object.isRequired,
    actions: PropTypes.objectOf(PropTypes.func).isRequired,
    radarTags: PropTypes.any.isRequired,
    filterMenuOpen: PropTypes.bool.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (!nextProps.filterMenuOpen && this.props.filterMenuOpen) {
      this.refs.menuButton.focus();
    }
  }

  onClickFunc() {
    if (this.props.radarTags.length === 0) {
      return this.props.filters.favorites
        ? this.props.actions.removeFavoritesFilter
        : this.props.actions.addFavoritesFilter;
    } else {
      return this.props.actions.openFilterMenu;
    }
  }

  render() {
    let glyphImg = filter;
    if (this.props.radarTags.length === 0) {
      glyphImg = !this.props.filters.favorites ? heartEmpty : heart;
    }

    return (
      <div>
        <button
          ref="searchButton"
          aria-label={this.props.buttonTitle}
          className='searchButton'
          type='button'
          onClick={this.props.actions.openFilterMenu}>
          <Icon glyph={search} className="icon icon--small" />
        </button>

        <button
          ref={"menuButton"}
          aria-label={this.props.buttonTitle}
          className="menuButton"
          type="button"
          onClick={this.onClickFunc()}>
          <Icon glyph={glyphImg} className="icon icon--small" />
        </button>
      </div>
    );
  }
}

export default MenuButton;
