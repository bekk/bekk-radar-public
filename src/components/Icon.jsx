//https://github.com/kisenka/svg-sprite-loader

import React from 'react';
import './icon.styl';
const Icon = ({glyph, className = 'icon'}) => (
  <svg key='icon' className={className}>
    <use xlinkHref={glyph} />
  </svg>
);

export default Icon;
