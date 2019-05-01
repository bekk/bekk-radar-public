import React, { PropTypes } from 'react';
import CssTransitionGroup from 'react-addons-css-transition-group';
import classNames from 'classnames';

import CategoryButtonNumber from './CategoryButtonNumber';
import { buildUrlToCategory } from '../lib/urlBuilders';
import Icon from './Icon';

import './smallCategoryChooser.styl';
import leftIcon from '!svg-sprite!../images/icons/arrow-left.svg';
import rightIcon from '!svg-sprite!../images/icons/arrow-right.svg';

export default class SmallCategoryChooser extends React.Component {
  static propTypes = {
    categories: PropTypes.object.isRequired,
    currentCategory: PropTypes.object.isRequired,
    selectedPoint: PropTypes.object.isRequired,
    radarId: PropTypes.string.isRequired,
    onCategorySelected: PropTypes.func.isRequired,
    allPointsFilterStatus: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = { direction: 'left' };
  }

  shouldComponentUpdate(nextProps){
    if(nextProps.selectedPoint.pointId && !nextProps.selectedPoint.dismissed){
      return false;
    }

    if(nextProps.selectedPoint.pointId && nextProps.selectedPoint.dismissed){
      return false;
    }
    return true;
  }

  handlePrevClicked = e => {
    e.preventDefault();
    const { onCategorySelected } = this.props;
    onCategorySelected(this.getPrevCategory());
    //setTimeout(() => this.handlePrevClicked(e), 3000);
  };

  handleNextClicked = e => {
    e.preventDefault();
    const { onCategorySelected } = this.props;
    onCategorySelected(this.getNextCategory());
  };

  componentWillReceiveProps(nextProps) {
    const { currentCategory } = this.props;
    const sortedCategories = this.getSortedCategories();
    const currentIndex = sortedCategories.indexOf(currentCategory);
    const nextIndex = sortedCategories.indexOf(nextProps.currentCategory);

    const direction = currentIndex === (nextIndex + 1) % sortedCategories.length ? 'left' : 'right';

    this.setState({direction});
  }

  render() {
    const { radarId, currentCategory, categories, allPointsFilterStatus } = this.props;
    const categoryTitle = currentCategory.title;
    const prevCategory = this.getPrevCategory();
    const nextCategory = this.getNextCategory();
    const { direction } = this.state;
    const containerClasses = classNames(
      'smallCategoryChooser',
      {
        'smallCategoryChooser--shortTitles': Object.keys(categories).length > 3
      }
    );

    return (
      <div className={containerClasses}>
        <nav className='smallCategoryChooser-innerContainer'>
          <a aria-controls={`section-${currentCategory.id}`} className='smallCategoryChooser-prev'
            onClick={this.handlePrevClicked} href={buildUrlToCategory(radarId, prevCategory.id)} aria-label={`Forrige kategori: ${prevCategory.title}`}>
            <Icon glyph={leftIcon} className="icon icon--small" />
          </a>
          <div className='smallCategoryChooser-currentCategory'>
            <CssTransitionGroup transitionName={`animate-${direction}`}
              transitionEnterTimeout={1000} transitionLeaveTimeout={1000}>
              <div key={categoryTitle} className="smallCategoryChooser-currentCategory-text">
                <span className="screenReaderOnly">{'Kategorien ' + categoryTitle}</span>
                <span aria-hidden="true">{categoryTitle}</span>
                <CategoryButtonNumber category={currentCategory} categoryId={currentCategory.id} allPointsFilterStatus={allPointsFilterStatus} />
              </div>

            </CssTransitionGroup>
          </div>
          <a aria-controls={`section-${currentCategory.id}`} className='smallCategoryChooser-next'
            href={buildUrlToCategory(radarId, nextCategory.id)} aria-label={`Neste kategori: ${nextCategory.title}`} onClick={this.handleNextClicked}>
            <Icon glyph={rightIcon} className="icon icon--small" />
          </a>
        </nav>
      </div>
    );
  }

  getSortedCategories() {
    const { categories } = this.props;
    return Object.keys(categories).map(key => categories[key]);
  }

  getNextCategory() {
    const { currentCategory } = this.props;
    const sortedCategories = this.getSortedCategories();
    const currentIndex = sortedCategories.indexOf(currentCategory);
    return sortedCategories[(currentIndex+1) % sortedCategories.length];
  }

  getPrevCategory() {
    const { currentCategory } = this.props;
    const sortedCategories = this.getSortedCategories();
    const currentIndex = sortedCategories.indexOf(currentCategory);
    return sortedCategories[(currentIndex+sortedCategories.length-1) % sortedCategories.length];
  }
}
