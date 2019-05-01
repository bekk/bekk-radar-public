import React, { Component, PropTypes } from 'react';
import isEqual from 'lodash/lang/isEqual';
import CategoryButtonNumber from './CategoryButtonNumber';
import { buildUrlToCategory } from '../lib/urlBuilders';

class CategoryButton extends Component {

  static propTypes = {
    categoryId: PropTypes.string.isRequired,
    radarId: PropTypes.string.isRequired,
    category: PropTypes.object.isRequired,
    onCategorySelected: PropTypes.func.isRequired,
    onPositionUpdated: PropTypes.func,
    currentCategoryId: PropTypes.string.isRequired,
    filteredPoints: PropTypes.number,
    allPointsFilterStatus: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.handlePositionUpdated();
    setTimeout(this.handlePositionUpdated, 0);
    this.interval = setInterval(this.handlePositionUpdated, 1000);

    const {
      currentCategoryId,
      categoryId
    } = this.props;

    if(categoryId === currentCategoryId){
      this.refs[categoryId].focus();
    }
  }

  shouldComponentUpdate(nextProps){
    return !isEqual(this.props, nextProps);
  }

  componentWillReceiveProps(nextProps){
    const {
      currentCategoryId,
      categoryId
    } = this.props;

    if(
      ( categoryId === currentCategoryId ) &&
      !isEqual(this.props, nextProps)
    ){
      this.refs[categoryId].focus();
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handlePositionUpdated = () => {
    const { categoryId, onPositionUpdated } = this.props;
    const buttonRect = {
      left: this.refs[categoryId].offsetLeft,
      width: this.refs[categoryId].offsetWidth
    };
    onPositionUpdated(categoryId, buttonRect);
  };

  handleSelected = (e) => {
    e.preventDefault();

    const {
      onCategorySelected,
      categoryId,
      category
    } = this.props;

    onCategorySelected(categoryId, category);
    this.handlePositionUpdated();
  };

  render() {
    const { category, categoryId, radarId, allPointsFilterStatus, currentCategoryId} = this.props;

    return (
      <li role="presentation" className="categoryChooser-numberContainer">
        <a role="tab" aria-selected={currentCategoryId === categoryId ? 'true' : 'false'} aria-controls={`section-${categoryId}`} href={buildUrlToCategory(radarId, categoryId)}
          key={category.title}
          className="categoryChooser-category"
          onClick={this.handleSelected}
          onTouchEnd={this.handleSelected}
          ref={categoryId}>
          <span className="screenReaderOnly">{'Kategorien ' + category.title}</span>
          <span aria-hidden="true">{category.title}</span>
          <CategoryButtonNumber category={category} categoryId={categoryId} allPointsFilterStatus={allPointsFilterStatus} />
        </a>
      </li>
    );
  }
}

export default CategoryButton;
