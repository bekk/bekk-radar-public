import React, { PropTypes, Component } from 'react';
import CategoryButton from './CategoryButton';
import classNames from 'classnames';
import categoryColors from '../lib/categoryColors';
import findNumberOfPointsPerCategory from '../lib/findNumberOfPointsPerCategory';
import isEqual from 'lodash/lang/isEqual';

import './categoryChooser.styl';

class CategoryChooser extends Component {
  static propTypes = {
    onCategorySelected: PropTypes.func.isRequired,
    categories: PropTypes.object.isRequired,
    currentCategoryId: PropTypes.string.isRequired,
    radarId: PropTypes.string.isRequired,
    selectedPoint: PropTypes.object.isRequired,
    resultPoints: PropTypes.array,
    allPointsFilterStatus: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      underlines: {}
    };
  }

  shouldComponentUpdate(nextProps){
    return nextProps.selectedPoint.pointId ? false : true;
  }

  handleCategorySelected = (categoryId, category) => {
    this.props.onCategorySelected(category);
  };

  handleCategoryButtonPositionUpdated = (categoryId, position) => {
    const { underlines } = this.state;
    if(!isEqual(underlines[categoryId], position)){
      this.setState({
        underlines: { ...underlines, [categoryId]:position }
      });
    }
  };

  render () {
    const {
      categories,
      currentCategoryId,
      resultPoints,
      allPointsFilterStatus,
      radarId
    } = this.props;


    const containerClasses = classNames(
      'categoryChooser-container',
      {
        'categoryChooser-container--shortTitles': Object.keys(categories).length > 3
      }
    );

    const color = categoryColors[this.props.currentCategoryId];

    const categoryButtons = Object.keys(categories).map(categoryId => {

      const filteredPoints = findNumberOfPointsPerCategory(categories, resultPoints);

      return (
       <CategoryButton
         key={categoryId}
         radarId={radarId}
         filteredPoints={filteredPoints[categoryId]}
         categoryId={categoryId}
         allPointsFilterStatus={allPointsFilterStatus}
         category={categories[categoryId]}
         currentCategoryId={currentCategoryId}
         onPositionUpdated={this.handleCategoryButtonPositionUpdated}
         onCategorySelected={this.handleCategorySelected} />
        );
    });

    const underline = this.state.underlines[currentCategoryId];
    const leftOffset = underline ? underline.left : 0;
    const style = {
      background: color,
      width: underline ? underline.width : 0,
      transform: `translateX(${leftOffset}px)`,
      WebkitTransform: `translateX(${leftOffset}px)`
    };

    return (
      <div className={containerClasses}>
        <nav className="categoryChooser-buttonContainer">
          <ul className="categoryChooser-buttonWrapper" role="tablist">
          {categoryButtons}
          </ul>
          <div role="presentation" className="categoryChooser-selected">
            <span className="categoryChooser-selected-span" style={style}></span>
          </div>
        </nav>
      </div>
    );
  }
}

export default CategoryChooser;
