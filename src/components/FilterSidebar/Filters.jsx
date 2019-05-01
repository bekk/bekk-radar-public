import React, { Component, PropTypes } from 'react';
import some from 'lodash/collection/some';
import cx from 'classnames';
import Icon from '../Icon';
import SearchField from './SearchField';
import FilterButton from './FilterButton';

import closeIcon from '!svg-sprite!../../images/icons/close.svg';
import './filters.styl';

export default class Filters extends Component {
  static propTypes = {
    radar: PropTypes.object.isRequired,
    filters: PropTypes.object.isRequired,
    actions: PropTypes.objectOf(PropTypes.func).isRequired,
    enabled: PropTypes.bool
  };

  static defaultProps = {
    enabled: true
  };

  componentDidUpdate(){

    const { closeButton } = this.refs;

    if(closeButton){
      // To not set focus on the close button every time the component updates
      if(!this.isCloseButtonFocused){
        this.isCloseButtonFocused = true;
        // Setting the timeout to shorter than 500ms
        // Will position the ReactSidebar wrongly...
        setTimeout(function(){
          closeButton.focus();
        },500);
      }
    } else {
      this.isCloseButtonFocused = false;
    }
  }

  //TODO: move to helper lib
  isTagSelected = tagName => {
    const { tags } = this.props.filters;
    return some(tags, t => t === tagName);
  };

  handleToggleTagClicked = filterValue => {
    if(this.isTagSelected(filterValue)){
      this.props.actions.removeTagFilter(filterValue);
    } else {
      this.props.actions.addTagFilter(filterValue);
    }
  };

  handleToggleFavoritesClicked = () => {
    if(this.props.filters.favorites) {
      this.props.actions.removeFavoritesFilter();
    } else {
      this.props.actions.addFavoritesFilter();
    }
  };

  render() {
    const { radar, filters, actions, enabled } = this.props;

    if(!enabled) {
      return <div className="filters"></div>;
    }

    const displayFilters = !!radar.tags.length;
    const tagButtons = radar.tags.filter((v,i,a) => a.indexOf(v) === i)
      .map(tag => (
      <li key={tag} className='filters-tags-tag'>
        <FilterButton
          isSelected={this.isTagSelected(tag)}
          filterValue={tag}
          onClick={this.handleToggleTagClicked}>
          {tag}
        </FilterButton>
      </li>
    ));

    const search = (value) => {
      actions.setSearchQuery(value);
    };

    const gotFilters = filters.query.length || filters.tags.length || filters.favorites;

    return (
      <div className="filters">
        <button aria-haspopup="true" ref={'closeButton'} type='button' className="filters-close" onClick={actions.closeFilterMenu} aria-label={enabled ? 'Skjul alternativer' : 'Vis alternativer'}>
          <Icon glyph={closeIcon} className="icon icon--small" />
        </button>
        <div className="filters-searchDiv">
          <SearchField value={filters.query} onSearch={search} />
        </div>
        <div className="filters-selections" aria-controls='active-filters'>
          <ul className="filters-datasetList">
            <li className="filters-datasetList-item">
              <button type="button" onClick={actions.resetFilter}
                className={cx('filters-datasetList-item-button', {'is-active': !gotFilters })}>
                Vis alt
              </button>
            </li>
            <li>
              <button type="button" onClick={this.handleToggleFavoritesClicked}
                className={cx('filters-datasetList-item-button', {'is-active': filters.favorites})}>
                Mine favoritter
              </button>
            </li>
          </ul>
          {displayFilters ? (<h3 className="filters-filterHeading">Filtreringer</h3>) : null }
          <ul className="filters-tags">
            {tagButtons}
          </ul>
        </div>
      </div>
    );
  }
}
