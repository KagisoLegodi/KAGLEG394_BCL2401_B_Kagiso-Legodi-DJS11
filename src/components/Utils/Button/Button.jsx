// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

function Button({ text, onClick, disabled }) {
  return (
    <div onClick={onClick} className="custom-btn" disabled={disabled}>
      {text}
    </div>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired, // Requires `text` prop to be a string
  onClick: PropTypes.func, // `onClick` prop should be a function
  disabled: PropTypes.bool, // `disabled` prop should be a boolean
};

export default Button;
