import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryUser } from './ImageGallery.styled';

const ImageGallery = ({ dateInfo, onImageClick }) => {
  return (
    <ImageGalleryUser>
      {dateInfo.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          smallImg={webformatURL}
          bigImg={largeImageURL}
          onImageClick={onImageClick}
          alt={tags}
        />
      ))}
    </ImageGalleryUser>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  dateInfo: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string,
      tags: PropTypes.string,
    }).isRequired
  ).isRequired,
  onImageClick: PropTypes.func.isRequired,
};
