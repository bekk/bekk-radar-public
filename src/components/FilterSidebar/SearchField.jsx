import React, { PropTypes, Component } from 'react';

export default class SearchField extends Component {
  static propTypes = {
    onSearch: PropTypes.func.isRequired,
    value: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      value:  props.value
    };
  }

  componentWillReceiveProps (nextProps){
    this.setState({
      value: nextProps.value
    });
  }

  handleChange = event => {
    this.setState({
      value: event.target.value
    });
  };

  handleKeyDown = event => {
    if(event.key === 'Enter'){
      this.props.onSearch(event.target.value);
    }
  };

  render() {
    const { value } = this.state;
    return (
        <label htmlFor={'searchField'} id={'searchField-label'}>
          <input
            aria-labelledby={'searchField-label'}
            id={'searchField'}
            onChange={this.handleChange}
            value={value}
            onKeyDown={this.handleKeyDown}
            className="filters-searchInput"
            type="search"
            placeholder="Søk i radar"
            aria-controls='active-filters' />
        </label>
    );
  }
}
