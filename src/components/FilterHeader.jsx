import React, { Component, PropTypes } from 'react';


import './filterHeader.styl';

import mapValues from 'lodash/object/mapValues';
import SmallFilterButton from './SmallFilterButton.jsx';


export default class FilterHeader extends Component {
  static propTypes = {
    filters: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    allPointsFilterStatus: PropTypes.object.isRequired,
    currentCategory: PropTypes.object.isRequired,
    categories: PropTypes.object.isRequired,
    onCategorySelected: PropTypes.func.isRequired
  };

  handleRemoveQueryFilter = () => {
    this.props.actions.setSearchQuery('');
  };

  handleRemoveTagFilter = (t) => {
    this.props.actions.removeTagFilter(t);
  };

  handleRemoveFavoritesFilter = () => {
    this.props.actions.removeFavoritesFilter();
  };

  render () {
    const { filters, categories, allPointsFilterStatus, currentCategory } = this.props;

    let categoriesWithResult = [];
    let noHits = true;

    Object.keys(categories).map(key => {
      mapValues(categories[key].points, p => {
        if (allPointsFilterStatus[p.id] && !categoriesWithResult.includes(categories[key])) {
          categoriesWithResult.push(categories[key]);
          if (key === currentCategory.id) noHits = false;
        }
        return categoriesWithResult;
      });
    });

    return (
      <div id='acitve-filters' role='region' aria-live='polite' aria-atomic='true' className="filterHeader-container" tabIndex='0'>
        <div className="filterHeader">
          <span className="filterHeader-description" role='description'>Du har søkt etter:</span>
          {filters.tags.map(t => <SmallFilterButton key={t} text={t} clickHandler={this.handleRemoveTagFilter}/>)}
          {filters.query.length ? <SmallFilterButton text={filters.query} clickHandler={this.handleRemoveQueryFilter}/> : null}
          {filters.favorites ? <SmallFilterButton text={'Mine favoritter'} clickHandler={this.handleRemoveFavoritesFilter}/> : null}
        </div>
        {noHits ? <div className="filterHeader-filterInfo" aria-label="Ingen treff i valgt kategori">
          Null treff i denne kategorien

        </div> : null}
      </div>
    );
  }
}
