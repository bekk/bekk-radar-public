import React, { PropTypes } from 'react';
import marked from 'marked';
import Highlight from 'highlight.js';

class MdRenderer extends marked.Renderer {
  constructor(baseClassName, noFirstHeading, headingOffset) {
    super();
    this.noFirstHeading = noFirstHeading;
    this.headingOffset = headingOffset;
    this.prefix = (baseClassName && `${baseClassName}-`) || '';
  }

  //helpers
  classAttrFor(tag){
    return `class=${this.prefix}${tag}`;
  }

  //overrides
  heading(text, level) {
    if(level === 1 && this.noFirstHeading) {
      return '';
    }
    const h = `h${level+this.headingOffset}`;
    const classAttr = this.classAttrFor(`h${level}`);
    return `<${h} ${classAttr}>${text}</${h}>`;
  }

  list(body, ordered) {
    var type = ordered ? 'ol' : 'ul';
    return `<${type} ${this.classAttrFor(type)}>${body}</${type}>`;
  }

  listitem(text) {
    return `<li ${this.classAttrFor('li')}>${text}</li>\n`;
  }

  paragraph(text) {
    return `<p ${this.classAttrFor('p')}>${text}</p>\n`;
  }

  link(href, title, text) {
    if (this.options.sanitize) {
      try {
        var prot = decodeURIComponent(unescape(href))
        .replace(/[^\w:]/g, '')
        .toLowerCase();
      } catch (e) {
        return '';
      }
      if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0) {
        return '';
      }
    }
    let out = `<a target="_blank" href="${href}"`;
    if (title) {
      out += ` title="${title}"`;
    }
    out += ` ${this.classAttrFor('a')}>${text}</a>`;
    return out;
  }
}

export default class Markdown extends React.Component {
  static propTypes = {
    children: PropTypes.string.isRequired,
    className: PropTypes.string,
    noFirstHeading: PropTypes.bool,
    headingOffset: PropTypes.number
  };

  static defaultProps = {
    noFirstHeading: false,
    headingOffset: 1
  };

  render() {
    const { children, noFirstHeading, headingOffset, className, ...otherProps } = this.props;
    let renderer = new MdRenderer(className, noFirstHeading, headingOffset);

    const markedOpts = {
      highlight: code => Highlight.highlightAuto(code, ['json']).value,
      renderer
    };

    const markup = marked(children, markedOpts);
    return <div dangerouslySetInnerHTML={{__html:markup}} {...otherProps} className={className} />;
  }
}

