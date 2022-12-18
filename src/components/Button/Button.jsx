import React from 'react';
import PropTypes from 'prop-types';
import { ButtonUser } from './Button.styled';
const Button = ({ onClickLoadMore }) => {
  return (
    <ButtonUser type="button" onClick={() => onClickLoadMore()}>
      Load more
    </ButtonUser>
  );
};

export default Button;
Button.propTypes = {
  onClickLoadMore: PropTypes.func.isRequired,
};
