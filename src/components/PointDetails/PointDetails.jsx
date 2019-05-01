import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Markdown from './Markdown';
import Icon from '../Icon';
import * as actions from '../../actions';
import getLevelForScore from '../../lib/getLevelForScore';
import {
  radarSelector,
  isCurrentPointFavoriteSelector,
  pointSelector,
  categorySelector,
  nextSelectablePointSelector,
  prevSelectablePointSelector
} from '../../selectors';
import { getImageUrl } from '../../content';
import { breakpoints } from '../../lib/media';
import './pointDetails.styl';
import heart from '!svg-sprite!../../images/icons/heart.svg';
import emptyHeart from '!svg-sprite!../../images/icons/heart-empty.svg';
import closeIcon from '!svg-sprite!../../images/icons/close.svg';
import historyIcon from '!svg-sprite!../../images/icons/history.svg';
import leftIcon from '!svg-sprite!../../images/icons/arrow-left.svg';
import rightIcon from '!svg-sprite!../../images/icons/arrow-right.svg';
import FilterButton from '../FilterSidebar/FilterButton';
import some from 'lodash/collection/some';

class PointDetails extends Component {
  static propTypes = {
    isFavorite: PropTypes.bool.isRequired,
    point: PropTypes.object.isRequired,
    radar: PropTypes.object.isRequired,
    filters: PropTypes.object.isRequired,
    category: PropTypes.object.isRequired,
    nextSelectablePoint: PropTypes.object.isRequired,
    prevSelectablePoint: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    onDismiss: PropTypes.func.isRequired,
    selectedPoint: PropTypes.object.isRequired
  };

  constructor(props){
    super(props);

    this.state = { isSmallDevice: false, isRetinaDevice : false, pointHistory: false};
  }

  componentWillMount(){
    this.mediaQueryListSmall = window.matchMedia(`screen and (max-width: ${breakpoints.maxSmall})`);
    this.mediaQueryListRetina = window.matchMedia(`screen and (min-width: ${breakpoints.minRetina})`);

    this.mediaQueryListSmall.addListener(this.handleMediaQueryChanged);
    this.mediaQueryListRetina.addListener(this.handleMediaQueryChanged);
    this.handleMediaQueryChanged();
  }

  componentDidMount() {
    this.refs.h2.focus();
    const { actions, point, selectedPoint } = this.props;
    actions.selectPoint(point);

    //  Add the actions.setFirstSelectedPoint(point.id); here to trigger
    //  the action to get the selectedPoint when user directly jumps to the pointdetails
    //  from external sources
    if(!selectedPoint.pointId && selectedPoint.dismissed){
      actions.setFirstSelectedPoint(point.id);
    }
  }

  componentWillReceiveProps(){
    this.setState({
      pointHistory: false
    });
  }

  componentDidUpdate(prevProps, prevState){
    const {pointHistory} = this.state;

    if(pointHistory){
      this.refs['pointHistoryCloseButton'].focus();
    } else if(prevState.pointHistory && !pointHistory){
      this.refs['pointHistoryOpenButton'].focus();
    }
  }

  componentWillUnmount() {
    this.mediaQueryListSmall.removeListener(this.handleMediaQueryChanged);
    this.mediaQueryListRetina.removeListener(this.handleMediaQueryChanged);
  }

  handleMediaQueryChanged = () => {
    this.setState({
      isSmallDevice: this.mediaQueryListSmall.matches,
      isRetinaDevice: this.mediaQueryListRetina.matches
    });
  };

  toggleFavorite = (e) => {
    e.preventDefault();
    const { isFavorite, actions, point } = this.props;
    if(isFavorite) {
      actions.removeFavorite(point);
    } else {
      actions.addFavorite(point);
    }
  };

  handleKeyDown = e => {
    const keys = {
      left: 37,
      right: 39,
      escape: 27
    };
    const { onDismiss, prevSelectablePoint, nextSelectablePoint, actions: { selectPoint } } = this.props;
    switch(e.keyCode) {
      case keys.left:
        selectPoint(prevSelectablePoint);
        break;
      case keys.right:
        selectPoint(nextSelectablePoint);
        break;
      case keys.escape:
        onDismiss();
        break;
    }
  };

  handleLeftClick = e => {
    e.preventDefault();
    this.props.actions.selectPoint(this.props.prevSelectablePoint);
  };

  handleRightClick = e => {
    e.preventDefault();
    this.props.actions.selectPoint(this.props.nextSelectablePoint);
  };

  handleGetPointHistoryClick = e => {
    e.preventDefault();
    const { actions } = this.props;
    const pointHistoryAction = actions.getPointHistory(this.props.point, this.props.radar.id);
    const pointHistory = pointHistoryAction.pointHistory;
    this.setState({
      pointHistory
    });
  };

  handleClosePointHistory = e =>  {
    e.preventDefault();
    this.setState({
      pointHistory: false
    });
  };

  handleToggleTagClicked = filterValue => {
    // add filter and close point
    this.props.actions.addTagFilter(filterValue);
    this.props.onDismiss();
  };

  isTagSelected = tagName => {
    const { tags } = this.props.filters;
    return some(tags, t => t === tagName);
  };

  render() {
    const {
      point,
      radar,
      category,
      isFavorite,
      onDismiss
    } = this.props;

    const { title, markdown, tags } = point;
    const { isSmallDevice, isRetinaDevice, pointHistory } = this.state;

    let pointHistoryView = (
      <button ref="pointHistoryOpenButton" aria-haspopup="true" type="button" onClick={this.handleGetPointHistoryClick} className="pointDetails-getHistoryButton" aria-label="Vis punkthistorie" title="Vis punkthistorie"><Icon glyph={historyIcon} className="icon icon--small" /></button>
    );

    if(pointHistory){

      pointHistoryView = (
        <div className="pointDetails-pointHistory">
          <button ref="pointHistoryCloseButton" type="button" onClick={this.handleClosePointHistory} className="pointDetails-pointHistory-closeButton" aria-label="Lukk punkthistorie" title="Lukk punkthistorie"><Icon glyph={closeIcon} className="icon icon--small" /></button>
          <ul className="pointDetails-pointHistory-listHolder">
            {pointHistory.map(story => <li key={story.radar} className="pointDetails-pointHistory-listItem">{`${story.radar.match(/\d+/g)[0]} - ${story.level}`}</li>)}
          </ul>
        </div>
      );
    }

    const tagsList = (
      <ul className='pointDetails-tags'>
        {tags.map(tag =>
          <li key={tag} className='pointDetails-tags-tag'>
            <FilterButton
              isSelected={this.isTagSelected(tag)}
              filterValue={tag}
              onClick={this.handleToggleTagClicked}>
              {tag}
            </FilterButton>
          </li>)}
      </ul>
    );

    let imageUrl = getImageUrl(radar.id, point.id);
    if(imageUrl && imageUrl.length){
      const extension = imageUrl.substr(imageUrl.lastIndexOf('.'));

      if(isRetinaDevice){
        imageUrl = imageUrl.replace(extension,`-retina${extension}`);
      } else if(isSmallDevice){
        imageUrl = imageUrl.replace(extension,`-small${extension}`);
      }
    }

    const imageStyle = {
      'backgroundImage': 'url('+imageUrl+')'
    };
    const image = imageUrl && (
      <div className="pointDetails-image-wrapper">
        <div className="pointDetails-image-wrapper-img" style={imageStyle}></div>
        <div className="pointDetails-image-wrapper-gradient" />
      </div>
    );

    const favoriteLabel = isFavorite ? 'Fjern favoritt' : 'Legg til favoritt';
    const iconGlyph = isFavorite ? heart : emptyHeart;

    return (
      <div className="pointDetails" onKeyDown={this.handleKeyDown}>
        <div className="pointDetails-content">
          <div className='pointDetails-image'>{image}</div>
          <div aria-live="polite" className='pointDetails-titleBar'>
            <h2 ref="h2" tabIndex="0" className='pointDetails-titleBar-title'><ShrinkFitText>{title}</ShrinkFitText></h2>
            <button type='button' className='pointDetails-titleBar-favorite' onClick={this.toggleFavorite} aria-label={favoriteLabel}  aria-pressed={isFavorite} title={favoriteLabel}>
              <Icon glyph={iconGlyph} className="icon icon--small" />
            </button>
          </div>
          {tagsList}
          {pointHistoryView}
          <Markdown className="pointDetails-body" noFirstHeading={true}>{markdown}</Markdown>
          <ContextBar category={category} point={point} radar={radar} />
          <button type='button' className='pointDetails-closeButton' onClick={onDismiss} aria-label="Lukk" title='Lukk'>
              <Icon glyph={closeIcon} className="icon icon--small" />
          </button>
        </div>
        <div className="pointDetails-navigation">
          <div className="pointDetails-navigation-left">
            <button className="pointDetails-navigation-button"
              type="button"
              aria-label={`Forrige: ${this.props.prevSelectablePoint.title}`}
              onClick={this.handleLeftClick}>
              <Icon glyph={leftIcon} className="icon icon--small" />&nbsp;
            </button>
          </div>
          <div className="pointDetails-navigation-spacer" />
          <div className="pointDetails-navigation-right">
            <button className="pointDetails-navigation-button"
              type="button"
              aria-label={`Neste: ${this.props.nextSelectablePoint.title}`}
              onClick={this.handleRightClick}>
              &nbsp;<Icon glyph={rightIcon} className="icon icon--small" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const ContextBar = ({radar, category, point}) => (
  <div className="pointDetails-contextBar">
    <span className="pointDetails-contextBar-category">{category.title}</span>
    <span>{getLevelForScore(radar.levels, point.score)}</span>
  </div>
);

//workaround for browser that don't support hyphenation
class ShrinkFitText extends React.Component {
  static propTypes = {
    children: PropTypes.string
  };

  componentDidMount() {
    //could be recomputed on resize...
    //but this implementation is simpler
    const span = this.refs.span;
    const parent = span.parentElement;
    const maxWidth = parent.getBoundingClientRect().width;
    const currentWidth = span.getBoundingClientRect().width;
    if(currentWidth > maxWidth) {
      const currentFontSize = parseFloat(window.getComputedStyle(parent, null).getPropertyValue('font-size'));
      const proportion = maxWidth/currentWidth;
      const margin = 0.5;
      span.style.fontSize = `${currentFontSize*proportion-margin}px`;
    }

    //overflow-x:hidden on the parent causes chrome to clip
    //characters vertically for whatever reason.
    //overflow-x: hidden is needed to calculate the font size
    //but when the font size is set we don't need it anymore
    //so we set it back when we're done changing the font size
    parent.style['overflow-x'] = 'visible';
  }

  render() {
    return <span className="pointDetails-titleBar-title-text" ref="span">{this.props.children}</span>;
  }
}

const mapStateToProps = (state) => ({
  isFavorite: isCurrentPointFavoriteSelector(state),
  point: pointSelector(state),
  category: categorySelector(state),
  selectedPoint: state.selectedPoint,
  radar: radarSelector(state),
  nextSelectablePoint: nextSelectablePointSelector(state),
  prevSelectablePoint: prevSelectablePointSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PointDetails);
