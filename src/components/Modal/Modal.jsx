import React from 'react';
import { Overlay, ModalWindow, ImageComp } from './Modal.styled';
import PropTypes from 'prop-types';

const Modal = ({ largeImageURL, alt, onImageClick }) => {
  const handleBackdrop = event => {
    if (event.target === event.currentTarget) {
      onImageClick('');
    }
  };
  return (
    <Overlay onClick={handleBackdrop}>
      <ModalWindow>
        <ImageComp src={largeImageURL} alt={alt} />
      </ModalWindow>
    </Overlay>
  );
};

export default Modal;

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired,
};
