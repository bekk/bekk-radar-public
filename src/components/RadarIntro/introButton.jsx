import React, {PropTypes} from 'react';

const IntroButton = ({onClick, title, categoryId}) => (
  <div className="radarIntro-button-container">
    <button
      type="button"
      className="radarIntro-button"
      id={categoryId}
      onClick={onClick}
    >
      <span className="screenReaderOnly">{'Kategorien ' + title}</span>
      <span aria-hidden="true">{title}</span>
    </button>
  </div>
);

IntroButton.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  categoryId: PropTypes.string.isRequired
};

export default IntroButton;
