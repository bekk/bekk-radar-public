import React, { Component, PropTypes } from 'react';
import { Motion, spring} from 'react-motion';
import mapValues from 'lodash/object/mapValues';
import classNames from 'classnames';

import './categoryButtonNumber.styl';

const springConfig = [160, 15];

class CategoryButtonNumber extends Component {

  static propTypes = {
    categoryId: PropTypes.string.isRequired,
    category: PropTypes.object.isRequired,
    allPointsFilterStatus: PropTypes.object.isRequired
  };

  render() {
    const { category, categoryId, allPointsFilterStatus } = this.props;
    const categoryPoints = Object.keys(category.points).length;

    let count = 0;
    mapValues(category.points, p => allPointsFilterStatus[p.id] ? ++count : null);

    const number = (
      <Motion defaultStyle={{x: -20}} style={{x: spring(0, springConfig)}}>
          {interpolatedStyle => {
            return (
              <div key={categoryId} style={{transform: `translateX(${interpolatedStyle.x}px)`}}>
                {count}
              </div>
            );
          }}
      </Motion>
    );

    const numberClassNames = classNames('categoryButtonNumber',{
      'categoryButtonNumber--isVisible' : categoryPoints !== count
    });

    return (
      <div className={numberClassNames}>
        {categoryPoints === count ? null : number}
      </div>
    );
  }
}

export default CategoryButtonNumber;
