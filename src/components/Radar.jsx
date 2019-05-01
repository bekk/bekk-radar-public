import React, { PropTypes, Component } from 'react';
import * as actions from '../actions';
import RadarIntro from './RadarIntro';
import SearchField from './FilterSidebar/SearchField';
import FilterHeader from './FilterHeader';
import Logo from './Logo';
import CategoryChooser from './CategoryChooser';
import SmallCategoryChooser from './SmallCategoryChooser';
import Points from './Points';
import FilterSidebar from './FilterSidebar';
import PointDetails from './PointDetails/PointDetails';
import { breakpoints } from '../lib/media';
import MenuButton from './FilterSidebar/MenuButton';

import Icon from './Icon';
import search from '!svg-sprite!../images/icons/search.svg';

import './radar.styl';
import './startPoint.styl';

import Modal from './Modal';

class Radar extends Component {
  static propTypes = {
    radar: PropTypes.object.isRequired,
    filters: PropTypes.object.isRequired,
    filterMenu: PropTypes.object.isRequired,
    actions: PropTypes.objectOf(PropTypes.func).isRequired,
    categoryId: PropTypes.string,
    pointId: PropTypes.string,
    allPointsFilterStatus: PropTypes.object.isRequired,
    selectedPoint: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      buttonTitle: 'Filtrering',
    };
  }

  componentDidUpdate() {
    this.updateInert();
  }

  componentDidMount() {
    this.updateInert();
  }

  componentWillMount() {
    this.mediaQueryListExtraLarge = window.matchMedia(
      `screen and (max-width: ${breakpoints.minExtraLarge})`
    );
    this.mediaQueryListExtraLarge.addListener(this.handleMediaQueryChanged);

    this.handleMediaQueryChanged();
  }

  handleMediaQueryChanged = () => {
    let buttonTitle;

    if (this.mediaQueryListExtraLarge.matches) {
      buttonTitle = 'Søk og filtrering';
    } else {
      buttonTitle = 'Filtrering';
    }

    this.setState({
      buttonTitle,
    });
  };

  // Bug: react doesn't support the `inert` attribute This hack may be
  // removed in the future if react start to support inert, or if this issue
  // is resolved: https://github.com/facebook/react/issues/140
  updateInert() {
    const { main } = this.refs;
    if (main) {
      if (this.refs.main.getAttribute('data-shouldhaveinert') === 'true') {
        this.refs.main.setAttribute('inert', '');
      } else {
        this.refs.main.removeAttribute('inert');
      }
    }
  }

  render() {
    const {
      radar,
      filterMenu,
      filters,
      categoryId,
      pointId,
      actions,
      allPointsFilterStatus,
      selectedPoint,
    } = this.props;

    const gotFilters =
      filters.query.length || filters.tags.length || filters.favorites
        ? true
        : false;

    if (!categoryId) {
      return <RadarIntro actions={actions} radar={radar} />;
    }

    let modal;
    if (pointId) {
      modal = (
        <Modal onDismiss={actions.handlePointDismissed}>
          <PointDetails
            onDismiss={actions.handlePointDismissed}
            filters={filters}
          />
        </Modal>
      );
    }
    return (
      <FilterSidebar
        open={filterMenu.open}
        filters={filters}
        actions={actions}
        radar={radar}
      >
        <div className="radar">
          <section
            className="radar-main"
            aria-hidden={!!modal}
            ref="main"
            data-shouldhaveinert={!!modal}
          >
            <header className="radar-main-logoAndMenuButton">
              <Logo radarTitle={radar.title} />
              <SmallCategoryChooser
                radarId={radar.id}
                selectedPoint={selectedPoint}
                categories={radar.categories}
                onCategorySelected={actions.selectCategory}
                allPointsFilterStatus={allPointsFilterStatus}
                currentCategory={radar.categories[categoryId]}
              />
              <CategoryChooser
                radarId={radar.id}
                selectedPoint={selectedPoint}
                categories={radar.categories}
                onCategorySelected={actions.selectCategory}
                allPointsFilterStatus={allPointsFilterStatus}
                currentCategoryId={categoryId}
              />
              <div className="radar-main-searchFieldContainer">
                <Icon glyph={search} className="icon icon--small" />
                <SearchField
                  value={filters.query}
                  onSearch={actions.setSearchQuery}
                  categories={radar.categories}
                />
              </div>
              <MenuButton
                buttonTitle={this.state.buttonTitle}
                filters={filters}
                actions={actions}
                radarTags={radar.tags}
                filterMenuOpen={filterMenu.open}
              />
            </header>
            {gotFilters ? (
              <FilterHeader
                filters={filters}
                actions={actions}
                categories={radar.categories}
                allPointsFilterStatus={allPointsFilterStatus}
                currentCategory={radar.categories[categoryId]}
                onCategorySelected={actions.selectCategory}
              />
            ) : null}
            <Points
              key={categoryId}
              category={radar.categories[categoryId]}
              radar={radar}
              modalIsOpen={!!modal}
              actions={actions}
              gotFilters={gotFilters}
              allPointsFilterStatus={allPointsFilterStatus}
              pointId={pointId}
              selectedPoint={selectedPoint}
              onPointSelected={actions.selectPoint}
            >
              {radar.categories[categoryId].tagline ? (
                <div className="points-categoryTagline">
                  {radar.categories[categoryId].tagline}
                </div>
              ) : null}
            </Points>
          </section>
          {modal}
        </div>
      </FilterSidebar>
    );
  }
}

export default Radar;
