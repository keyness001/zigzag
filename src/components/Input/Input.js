import React, { useState } from "react";
import PropTypes from 'prop-types';

const Input = ({
  text,
  type,
  defaultValue,
  handleOnChange
}) => {
  const [value, setValue] = useState(defaultValue);

  const onChangeHandle = (e) => {
    const num = parseInt(e.target.value, 10);
    setValue(num);
    if (handleOnChange) handleOnChange(num);
  }

  console.log(text)

  return (
    <>
      <p>{text}</p>
      <input type={type} value={value} onChange={onChangeHandle} min="0"/>
    </>
  )
};

Input.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
  defaultValue: PropTypes.any,
  handleOnChange: PropTypes.func,
}

Input.defaultProps = {
  text: '',
  type: 'number',
  defaultValue: 10,
  handleOnChange: () => {},
}

export default Input;