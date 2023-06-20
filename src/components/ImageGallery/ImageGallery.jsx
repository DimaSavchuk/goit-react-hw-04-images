import React from 'react';

import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';

import { Gallery } from './ImageGallery.styled';
import PropTypes from 'prop-types';

const ImageGallery = ({ images, onItemClick }) => {
  return (
    <Gallery>
      {images.map(image => (
        <ImageGalleryItem
          image={image}
          key={image.id}
          onItemClick={onItemClick}
        />
      ))}
    </Gallery>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
  onItemClick: PropTypes.func.isRequired,
};
