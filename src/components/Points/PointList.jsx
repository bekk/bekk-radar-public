/* eslint react/no-did-mount-set-state: 0 */
/* eslint react/no-did-update-set-state: 0 */
import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import isEqual from 'lodash/lang/isEqual';
import PointListItem from './PointListItem';
import PointListExpandButton from './PointListExpandButton';
import './pointList.styl';

export default class PointList extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    gotFilters: PropTypes.bool.isRequired,
    modalIsOpen: PropTypes.bool.isRequired,
    actions: PropTypes.object.isRequired,
    points: PropTypes.array.isRequired,
    onPointSelected: PropTypes.func.isRequired,
    selectedPoint: PropTypes.object.isRequired,
    collapsedHeight: PropTypes.number,
    pointId: PropTypes.string,
    allPointsFilterStatus: PropTypes.object.isRequired,
  };

  static defaultProps = {
    collapsedHeight: 250,
  };

  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
      listRendered: false,
      focused: false,
    };
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
    this.setState({ listRendered: true });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  shouldComponentUpdate(nextProps, nextState) {
    // No point of updating the component if we have selected a point
    /*if(nextProps.selectedPoint.pointId && !nextProps.selectedPoint.dismissed){
      return false;
    }*/

    if (isEqual(this.state, nextState) && isEqual(this.props, nextProps)) {
      return false;
    }
    return true;
  }

  componentDidUpdate() {
    const { listRendered } = this.state;

    if (!listRendered) {
      this.setState({ listRendered: true });
    }
  }

  componentWillReceiveProps() {
    this.handleResize();
  }

  handleResize = () => {
    this.setState({
      listRendered: false,
    });
  };

  expandCategory = () => {
    if (this.state.expanded) {
      this.setState({
        expanded: false,
      });
    } else {
      this.setState({
        expanded: true,
      });
    }
  };

  handleFocus = e => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    if (!this.state.focused) {
      this.setState({
        focused: true,
      });
    }
  };

  handleBlur = e => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    if (this.state.focused) {
      this.setState({
        focused: false,
      });
    }
  };

  render() {
    const {
      points,
      actions,
      gotFilters,
      title,
      onPointSelected,
      collapsedHeight,
      selectedPoint,
      pointId,
      allPointsFilterStatus,
      modalIsOpen,
    } = this.props;

    const { focused, expanded, listRendered } = this.state;

    //this element could perhaps be a separate class
    const pointElements = points.map((point, index) => {
      return (
        <PointListItem
          key={point.id}
          onPointSelected={onPointSelected}
          point={point}
          points={points}
          pointId={pointId}
          index={index}
          selectedPoint={selectedPoint}
          allPointsFilterStatus={allPointsFilterStatus}
          actions={actions}
        />
      );
    });

    const listContainerHeight = listRendered
      ? this.refs.listContainer.getBoundingClientRect().height
      : -1;

    const listHeight = listRendered
      ? this.refs.list.getBoundingClientRect().height
      : -1;
    const expandedHeight = listContainerHeight + 60; //TODO
    const expandList = expanded || gotFilters || focused || modalIsOpen;
    const hideExpandButton =
      collapsedHeight > listHeight + 80 || !pointElements.length;

    const height = expandList
      ? expandedHeight
      : Math.min(collapsedHeight, expandedHeight);

    const sectionStyle = { height };

    const sectionClassnames = classNames('points-pointList', {
      'is-expanded': expandList,
      listRendered,
    });

    return (
      <section className={sectionClassnames} style={sectionStyle}>
        <div
          ref="listContainer"
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          tabIndex="0"
        >
          <h2 className="points-pointList-heading clearfix" key={title}>
            <span className="screenReaderOnly">{`Nivå ${title}`}</span>
            {title}
          </h2>
          <ol className="points-pointList-list" ref="list">
            {pointElements.length > 0 ? (
              pointElements
            ) : (
              <div>Ingen punkter å vise</div>
            )}
          </ol>
        </div>
        {gotFilters ? null : (
          <PointListExpandButton
            clickHandler={this.expandCategory}
            hide={hideExpandButton}
            expand={expandList}
          />
        )}
      </section>
    );
  }
}
