import React, { useEffect } from 'react';
import { Overlay, ModalWindow, ImageComp } from './Modal.styled';
import PropTypes from 'prop-types';
// const Modal = ({ largeImageURL, alt, onImageClick }) => {
const Modal = ({ largeImageURL, alt, onImageClick }) => {
  useEffect(() => {
    console.log(1);
    document.addEventListener('keydown', () => onImageClick(''));

    return () => {
      document.removeEventListener('keydown', () => onImageClick(''));
    };
  }, [onImageClick]);

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
