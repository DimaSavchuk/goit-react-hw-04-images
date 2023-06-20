import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

import PropTypes from 'prop-types';

const ImageGalleryItem = ({ image, onItemClick }) => {
  const { largeImageURL, tags } = image || {};

  const handleClick = () => {
    onItemClick(image);
  };

  return (
    <GalleryItem onClick={handleClick}>
      <GalleryItemImage src={`${largeImageURL}`} alt={tags} />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  onItemClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
