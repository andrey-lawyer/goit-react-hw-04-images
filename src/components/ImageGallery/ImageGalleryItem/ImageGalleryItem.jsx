import React from 'react';
import {
  ImageGalleryItemUser,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ smallImg, onImageClick, bigImg, alt }) => {
  return (
    <ImageGalleryItemUser onClick={() => onImageClick(bigImg, alt)}>
      <ImageGalleryItemImage src={smallImg} alt={alt} />
    </ImageGalleryItemUser>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  smallImg: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  bigImg: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired,
};
