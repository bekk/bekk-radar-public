import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { pushState, replaceState } from 'redux-router';
import virtualPath from './config/virtualPath';
import buildTitle from './lib/buildTitle.js';
import buildMetaImage from './lib/buildMetaImage.js';
import buildKeywords from './lib/buildKeywords.js';
import buildDescription from './lib/buildDescription.js';
import buildType from './lib/buildType.js';
import * as actions from './actions';
import { radarSelector, pointSelector, categorySelector } from './selectors';
import { buildUrl } from './lib/urlBuilders';

import favicon16x16 from './images/favicon-16x16.png';
import favicon32x32 from './images/favicon-32x32.png';
import favicon96x96 from './images/favicon-96x96.png';

class Index extends Component {
  static propTypes = {
    lang: PropTypes.string,
    state: PropTypes.object.isRequired,
    point: PropTypes.object,
    radar: PropTypes.object,
    category: PropTypes.object,
    app_id: PropTypes.string,
    url: PropTypes.string,
    image: PropTypes.string,
    host: PropTypes.string.isRequired,
  };

  static defaultProps = {
    lang: 'no',
    type: 'website',
    image: `${virtualPath}/assets/src/content/tech2016/cover.jpg`,
  };

  render() {
    const {
      category,
      point,
      radar,
      lang,
      host,
      image,
    } = this.props;

    const title = buildTitle(radar, category, point);
    const url = buildUrl(radar, category, point);
    const description = buildDescription(radar, category, point);
    const type = buildType(radar, category, point);
    const keywords = buildKeywords(radar, category, point);
    const metaImage = buildMetaImage(image, radar, category, point);

    const html = (
      <html lang={lang} className="br-html">
        <head>
          <meta charSet="utf-8" />
          <title>{title}</title>

          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link rel="icon" type="image/png" sizes="16x16" href={favicon16x16} />
          <link rel="icon" type="image/png" sizes="32x32" href={favicon32x32} />
          <link rel="icon" type="image/png" sizes="96x96" href={favicon96x96} />

          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />

          <meta name="author" content="Bekk Consulting AS" />
          <meta name="copyright" content="Bekk Consulting AS" />
          <meta name="application-name" content="Bekk Open Radar" />

          <meta property="og:title" content={title} />
          <meta property="og:site_name" content="Bekk Open Radar" />
          <meta property="og:type" content={type} />
          <meta property="og:url" content={`${host + url}`} />
          <meta property="og:image" content={`${host + metaImage}`} />
          <meta property="og:description" content={description} />

          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.9.1/styles/railscasts.min.css"
            type="text/css"
            media="all"
          />
        </head>
        <body className="br-body">
          <div id="app" className="br-app" />
          <script src={`${virtualPath}/assets/app.js`} />
        </body>
      </html>
    );

    return html;
  }
}

function mapStateToProps(state) {
  return {
    filterMenu: state.filterMenu,
    filters: state.filters,
    selectedPoint: state.selectedPoint,
    point: pointSelector(state),
    category: categorySelector(state),
    radar: radarSelector(state),
    host: state.host,
    state,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
    pushState: (state, pathName, query) =>
      dispatch(pushState(state, pathName, query)),
    replaceState: (state, pathName, query) =>
      dispatch(replaceState(state, pathName, query)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);
