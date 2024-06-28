// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import { Link } from 'react-router-dom'; // Import Link from React Router

function Button({ text, onClick, disabled, to }) {
  if (to) {
    // Render a Link component if `to` prop is provided
    return (
      <Link to={to} className="custom-btn" disabled={disabled}>
        {text}
      </Link>
    );
  } else {
    // Render a regular button if `to` prop is not provided
    return (
      <button
        type="button"
        className="custom-btn"
        onClick={onClick}
        disabled={disabled}
      >
        {text}
      </button>
    );
  }
}

Button.propTypes = {
  text: PropTypes.string.isRequired, // Requires `text` prop to be a string
  onClick: PropTypes.func, // `onClick` prop should be a function
  disabled: PropTypes.bool, // `disabled` prop should be a boolean
  to: PropTypes.string, // Optional `to` prop for Link component
};

export default Button;
