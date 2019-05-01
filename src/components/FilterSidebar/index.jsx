import React, { PropTypes }  from 'react';
import ReactSidebar from 'react-sidebar';
import Filters from './Filters';

export default class FilterSidebar extends React.Component {
  static propTypes = {
    radar: PropTypes.object.isRequired,
    filters: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    actions: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired
  };

  constructor(props) {
    super(props);
    this.state = { open: props.open };
  }

  toggleSideBarOpen = () => {

    const {open, actions} = this.props;

    if(open){
      actions.closeFilterMenu();
    } else {
      actions.openFilterMenu();
    }
  };

  render () {
    const { open, radar, filters, actions, children } = this.props;

    const sidebarProps = {
      sidebar: <Filters filters={filters} actions={actions} radar={radar} enabled={open} />,
      open: open,
      onSetOpen: this.toggleSideBarOpen,
      pullRight: true,
      docked: false,
      styles: {
        sidebar: {
          zIndex: 9
        },
        overlay: {
          zIndex: 8
        }
      }
    };

    return (
      <ReactSidebar {...sidebarProps}>
        {children}
      </ReactSidebar>
    );
  }
}
