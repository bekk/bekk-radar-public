import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import isEqual from 'lodash/lang/isEqual';
import isNewTabClick from '../../lib/isNewTabClick.js';
import { buildUrlToPoint } from '../../lib/urlBuilders';

export default class PointListItem extends Component {
  static propTypes = {
    pointId: PropTypes.string,
    index: PropTypes.number.isRequired,
    point: PropTypes.object.isRequired,
    onPointSelected: PropTypes.func.isRequired,
    actions: PropTypes.object.isRequired,
    selectedPoint: PropTypes.object.isRequired,
    points: PropTypes.array.isRequired,
    allPointsFilterStatus: PropTypes.object.isRequired
  };

  componentDidUpdate(){
    const { selectedPoint, actions } = this.props;

    if(selectedPoint.pointId && this.refs[selectedPoint.pointId] && selectedPoint.dismissed){
      const that = this;

      // We set a timeout here to make sure the inert feature on the parent
      // is removed, due to interference with focus
      setTimeout(function(){
        that.refs[selectedPoint.pointId].focus();

        actions.setFirstSelectedPoint(false);

      },0);
    }
  }

  shouldComponentUpdate(nextProps){
    return !isEqual(this.props, nextProps);
  }

  render(){

    const {
      actions,
      onPointSelected,
      point,
      points,
      index,
      allPointsFilterStatus,
      pointId
    } = this.props;

    const handleTouchMove = () => {
      this.touchMove = true;
    };
    const handleTouchStart = () => {
      this.touchMove = false;
    };
    const handleTouchEnd = e => {
      if(!this.touchMove){
        handleClick(e);
      }
    };
    const handleClick = e => {
      if(isNewTabClick(e)) {
        return;
      }
      e.preventDefault();
      // To preserve focused point with keyboard navigation when closing lightbox
      actions.setFirstSelectedPoint(point.id);

      onPointSelected(point);
    };

    let flexBasis;
    if (index === points.length - 1 && points.length > 2) flexBasis = 100;

    const style = { flexBasis: flexBasis ? `${flexBasis}%` : null };

    const filtered = allPointsFilterStatus[point.id];

    const containerClasses = classNames(
      'points-pointList-list-itemContainer', { 'is-filteredOut': !filtered }
    );

    const itemClasses = classNames(
      'points-pointList-list-item', { 'is-selected': pointId === point.id }
    );

    const extraAttrs = { tabIndex : !filtered ? -1 : 0 };

    return (
      <li aria-haspopup="true" className={containerClasses} style={style} key={point.id}>
          <a ref={point.id} {...extraAttrs} onTouchMove={handleTouchMove} aria-hidden={!filtered} className={itemClasses} href={buildUrlToPoint(point)} onTouchEnd={handleTouchEnd} onTouchStart={handleTouchStart} onClick={handleClick}>
            {point.title}
          </a>
      </li>
    );
  }
}
