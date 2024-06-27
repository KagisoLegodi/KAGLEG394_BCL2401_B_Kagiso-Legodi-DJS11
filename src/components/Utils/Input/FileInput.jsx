// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';

function InputComponent({ state, setState, placeholder, type }) {
  return (
    <input
      type={type}
      value={state}
      onChange={(e) => setState(e.target.value)}
      placeholder={placeholder}
      style={{ padding: '0.5rem', fontSize: '1rem' }}
    />
  );
}

InputComponent.propTypes = {
  state: PropTypes.string.isRequired,
  setState: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
};

export default InputComponent;
