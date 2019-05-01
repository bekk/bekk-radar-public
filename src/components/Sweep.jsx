import React, { PropTypes, Component } from 'react';
import sweep from '!svg-sprite!../images/sweep.svg';
import './sweep.styl';

class Sweep extends Component {
  static propTypes = {
    categoryId: PropTypes.string,
    height: PropTypes.string
  };

  render(){
    const { categoryId, height } = this.props;

    const style = {
      height
    };

    return (<div key={'sweep' + categoryId} className="radar-sweep" style={style}>
              <div className={'radar-sweep-container'}>
                <svg className="radar-sweep-container-svg" preserveAspectRatio="xMidYMin meet" width="744" height="1052" viewBox="0 0 744 1052">
                  <use xlinkHref={sweep} x="50%" y="0"/>
                </svg>
              </div>
            </div>);
  }

}

export default Sweep;
