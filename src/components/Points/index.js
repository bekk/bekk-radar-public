/* eslint react/no-did-mount-set-state: 0 */
import React, { PropTypes, Component } from 'react';
import map from 'lodash/collection/map';
import classNames from 'classnames';
import groupPointsByLevel from '../../lib/groupPointsByLevel';
import PointList from './PointList';
import './points.styl';
import Sweep from '../Sweep';
import { selectPoint } from '../../actions';

export default class Points extends Component {
  static propTypes = {
    radar: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    gotFilters: PropTypes.bool.isRequired,
    modalIsOpen: PropTypes.bool.isRequired,
    category: PropTypes.object.isRequired,
    onPointSelected: PropTypes.func.isRequired,
    pointId: PropTypes.string,
    children: PropTypes.object,
    allPointsFilterStatus: PropTypes.object.isRequired,
    selectedPoint: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      pointsRendered: false,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);

    this.setState({
      pointsRendered: true,
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.setState({
      pointsRendered: true,
    });
  };

  render() {
    const {
      radar,
      category,
      allPointsFilterStatus,
      modalIsOpen,
      onPointSelected,
      pointId,
      children,
      selectedPoint,
      gotFilters,
      actions,
    } = this.props;

    const { pointsRendered } = this.state;

    const groupedPoints = groupPointsByLevel(category.points, radar.levels);

    const pointsHeight = pointsRendered
      ? this.refs.pointsContainer.getBoundingClientRect().height
      : '500';

    const radarLevels = radar.levels.length ? radar.levels.length : 3;
    const collapsedHeight = pointsHeight / radarLevels;

    const lists = map(groupedPoints, (points, levelTitle) => {
      const thisModalIsOpen =
        modalIsOpen && points.some(x => x.id === selectedPoint.pointId);
      return (
        <PointList
          key={`${levelTitle}-list`}
          title={levelTitle}
          actions={actions}
          gotFilters={gotFilters}
          modalIsOpen={thisModalIsOpen}
          points={points}
          allPointsFilterStatus={allPointsFilterStatus}
          pointId={pointId}
          onPointSelected={onPointSelected}
          selectedPoint={selectedPoint}
          levels={radarLevels}
          collapsedHeight={collapsedHeight}
        />
      );
    });

    const pointsContainerClassNames = classNames({
      points: true,
    });

    return (
      <div
        id={`section-${category.id}`}
        role="tabpanel"
        ref="pointsContainer"
        className={pointsContainerClassNames}
      >
        {children}
        <div className="points-innerWrap" ref="pointsWrap">
          <Sweep
            height={pointsHeight + 'px'}
            ref="sweep"
            categoryId={category.id}
          />
          {lists}
        </div>
      </div>
    );
  }
}
