import { StyledGalleryItem } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ image }) => {
  return (
    <StyledGalleryItem>
      <img src={image.webformatURL} alt="5555" />
    </StyledGalleryItem>
  );
};
