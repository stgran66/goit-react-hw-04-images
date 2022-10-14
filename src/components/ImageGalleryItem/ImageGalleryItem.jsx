import PropTypes from 'prop-types';
import { StyledGalleryItem } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ image, onOpen }) => {
  return (
    <StyledGalleryItem onClick={onOpen} id={image.id}>
      <img src={image.webformatURL} alt={image.tags} />
    </StyledGalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
  onOpen: PropTypes.func.isRequired,
};
